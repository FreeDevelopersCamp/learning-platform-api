import { Connection } from 'mongoose';

export type MongoRepositoryModelSessionType<T> = T & {
  connection?: Connection;
};

export type MongoRepositorySession = {
  abortTransaction: () => Promise<{ [key: string]: unknown }>;
  commitTransaction: () => Promise<{ [key: string]: unknown }>;
};
