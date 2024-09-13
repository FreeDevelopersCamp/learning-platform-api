import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenService } from '../../service/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await context.switchToHttp().getRequest();
    const token = this._tokenService.extractTokenFromHeader(request);

    return (
      (await this._tokenService.verifyToken(token)) &&
      (await this._tokenService.isCurrentTenancy(request))
    );
  }
}
