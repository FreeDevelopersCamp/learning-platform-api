import { Global, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../models/payload';
import { DateUtils } from 'src/utils/date';
import { UserRequested } from 'src/infra/system/system.constant';
import { AllowRoles } from '../guards/_constants/roles.constants';
import { SessionService } from '../session/sessions.service';
import { UnauthorizeException } from 'src/utils/exception';

@Global()
@Injectable()
export class TokenService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _sessionService: SessionService,
  ) {}

  async sign(payload: Payload) {
    return await this._jwtService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const decoded = await this.decodeToken(token);

      const isCorrectToken = await this._sessionService.checkToken(token);
      if (!isCorrectToken) {
        return false;
      }

      const tokenExpiryDate = DateUtils.convertSecondsToJSDate(decoded.exp);
      const currentDate = DateUtils.getJSDate();
      if (tokenExpiryDate < currentDate) {
        await this._sessionService.killSession();
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  extractTokenFromHeader(request: any): string {
    const token =
      request.headers?.authorization?.split('Bearer ').pop() ||
      request.handshake.headers.authorization?.split('Bearer ').pop();

    if (!token) {
      throw new UnauthorizeException('Token not found');
    }

    return token;
  }

  async decodeToken(token: string) {
    try {
      const decoded = await this._jwtService.verify(token);
      UserRequested.userId = decoded.userId;
      UserRequested.username = decoded.username;
      UserRequested.tenancyId = decoded.tenancyId;
      return decoded;
    } catch (error) {
      throw new UnauthorizeException(error.message);
    }
  }

  async isCurrentTenancy(request: any) {
    const token: string = this.extractTokenFromHeader(request);
    const tenantId: string = request.headers
      ? request.headers['x-tenant-id']?.toString()
      : request.handshake.headers['x-tenant-id']?.toString();

    const decoded = await this.decodeToken(token);
    const administrator = decoded.roles.includes(AllowRoles.owner);

    if (
      (!decoded.tenancyId || tenantId != decoded.tenancyId) &&
      !administrator
    ) {
      return false;
    }

    return true;
  }
}
