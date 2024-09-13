import { Global, Injectable, Scope } from '@nestjs/common';
import { Connection, createConnection } from 'mongoose';

interface MongoConnection {
  host: string;
  port: number;
  database: string;
  url: string;
}

@Global()
@Injectable({ scope: Scope.DEFAULT })
export class MongooseConnectionService {
  private connections: Map<string, Connection> = new Map();

  async getConnection(
    tenantId: string,
    mongoConnection: MongoConnection,
  ): Promise<Connection> {
    const connection = await createConnection(mongoConnection.url, {
      dbName: mongoConnection.database,
    }).asPromise();

    this.connections.set(tenantId, connection);
    return connection;
  }
}
