import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../../service/token.service';
import { Policies } from './decorator/policies.decorator';
import { Policy } from 'src/modules/core/entity/user/user.schema';
import { UnauthorizeException } from 'src/utils/exception';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await context.switchToHttp().getRequest();
    const token = this._tokenService.extractTokenFromHeader(request);

    if (!(await this._tokenService.verifyToken(token))) {
      throw new UnauthorizeException();
    }

    const decoded = await this._tokenService.decodeToken(token);
    const userPolicy: Policy[] = decoded.policies;

    const allowedPolicies: Policy[] = this._reflector.get(
      Policies,
      context.getHandler(),
    );

    if (
      !allowedPolicies ||
      !allowedPolicies.some((a) => userPolicy.some((a) => a.name === a.name))
    ) {
      throw new UnauthorizeException(
        'User does not have permission to access this resource',
      );
    }

    if (
      !allowedPolicies ||
      !allowedPolicies.some((allowedPolicy) =>
        userPolicy.some(
          (userPolicyItem) =>
            userPolicyItem.name === allowedPolicy.name &&
            this._arePermissionsAllowed(
              userPolicyItem.permissions,
              allowedPolicy.permissions,
            ),
        ),
      ) ||
      !this._tokenService.isCurrentTenancy(request)
    ) {
      throw new UnauthorizeException(
        'User does not have permission to access this resource',
      );
    }

    return true;
  }

  private _arePermissionsAllowed(
    userPermissions: string[],
    allowedPermissions: string[],
  ): boolean {
    return userPermissions.every((permission) =>
      allowedPermissions.includes(permission),
    );
  }
}
