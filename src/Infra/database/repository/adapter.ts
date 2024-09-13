import { BaseEntity } from 'src/utils/entities/base.entity';

export abstract class IMongoRepository<T extends BaseEntity> {
  abstract create(entity: T): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract findOne(id: string): Promise<T>;
  abstract update(entity: T): Promise<T>;
  abstract delete(id: string): Promise<boolean>;
}
