import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './decorator/roles.decorator';
import { TokenService } from '../../service/token.service';
import { AllowRoles } from '../_constants/roles.constants';
import { UnauthorizeException } from 'src/utils/exception';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this._tokenService.extractTokenFromHeader(request);

    if (!(await this._tokenService.verifyToken(token))) {
      throw new UnauthorizeException();
    }

    const decoded = await this._tokenService.decodeToken(token);
    const userRoles: string[] = decoded.roles.map((a) => a.toString());

    const allowedRoles: string[] = this._reflector.get(
      Roles,
      context.getHandler(),
    );
    const isCurrentTenancy = await this._tokenService.isCurrentTenancy(request);

    const areAllowedRoles = this._areRolesAllowed(userRoles, allowedRoles);

    if (!allowedRoles || !areAllowedRoles || !isCurrentTenancy) {
      throw new UnauthorizeException(
        'You do not have role to access this endpoint',
      );
    }

    return true;
  }

  private _areRolesAllowed(
    userRoles: string[],
    allowedRoles: string[],
  ): boolean {
    return (
      userRoles.some((permission) => allowedRoles.includes(permission)) ||
      userRoles.includes(AllowRoles.owner)
    );
  }
}
