import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { System } from 'src/infra/system/system.constant';

@Injectable()
export class TenantsMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.baseUrl === '/api/v1' || req.baseUrl.includes('/socket.io')) {
      next();
      return;
    }

    const tenantId = req.headers['x-tenant-id']?.toString();

    if (!tenantId) {
      throw new BadRequestException('X-TENANT-ID not provided');
    }

    let tenancy = System.tenancies.find((a) => a.alias === tenantId);

    if (!tenancy) {
      throw new NotFoundException('Tenant does not exist');
    }

    if (!tenancy.active) {
      throw new NotFoundException('Your tenant is not active');
    }

    if (
      tenancy.systemOwner &&
      !req.baseUrl.includes('/tenancy') &&
      !req.baseUrl.includes('/Auth') &&
      !req.baseUrl.includes('/setting')
    ) {
      throw new BadRequestException(
        'System owner cannot be used this operation',
      );
    }

    if (!tenancy.systemOwner && req.baseUrl.includes('/tenancy')) {
      throw new BadRequestException(
        `you don't have permission to access this resource`,
      );
    }

    req['tenantId'] = tenancy.alias;
    next();
  }
}
