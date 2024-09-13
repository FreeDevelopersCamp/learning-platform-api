import { REQUEST } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { System } from 'src/infra/system/system.constant';
import { tenancyConstant } from 'src/infra/database/seeders/tenancy/tenancy.constant';

export const TenancyConnectionService = {
  provide: 'TENANT_CONNECTION',
  useFactory: async (request: { tenantId: string }, connection: Connection) => {
    const db =
      System.tenancies.find((a) => a.alias == request.tenantId)
        ?.mongoConnections || tenancyConstant.mongoConnections;

    return connection.useDb(db.database);
  },
  inject: [REQUEST, getConnectionToken()],
};
