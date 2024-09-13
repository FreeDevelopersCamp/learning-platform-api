import { Model } from 'mongoose';
import { Global, Inject, Injectable } from '@nestjs/common';
import { IMongoRepository } from './adapter';
import {
  DuplicateKeyException,
  DataNotFoundException,
  NoFieldUpdatedException,
  UndatedFailedException,
  DeleteNotFoundException,
  ValidationFailedException,
} from 'src/utils/exception';
import { UserRequested } from 'src/infra/system/system.constant';
import { BaseEntity, DocumentAudit } from 'src/utils/entities/base.entity';

@Global()
@Injectable()
export class MongoRepository<T extends BaseEntity>
  implements IMongoRepository<T>
{
  constructor(@Inject('TENANT_CONNECTION') private readonly model: Model<T>) {}

  async create(entity: T): Promise<T> {
    const data = this.getDocumentAudit('create', entity);

    const result = await data.save().catch((error) => {
      if (error.code === 11000) {
        throw new DuplicateKeyException();
      } else {
        throw new ValidationFailedException(error._message);
      }
    });

    return result['_doc'];
  }

  async findAll(): Promise<T[]> {
    const data: any = await this.model.find().exec();
    if (!data) {
      throw new DataNotFoundException();
    }

    return data.map((doc: { [key: string]: any }) => doc['_doc']);
  }

  async findOne(id: string): Promise<T> {
    const data: any = await this.model.findById(id).exec();
    if (!data) {
      throw new DataNotFoundException(id);
    }

    return data['_doc'];
  }

  async update(entity: T): Promise<T> {
    const data = this.getDocumentAudit('update', entity);

    await this.model
      .updateOne({ _id: data._id }, entity)
      .exec()
      .then((result) => {
        if (!result.acknowledged || result.modifiedCount == 0) {
          throw new NoFieldUpdatedException();
        }
      })
      .catch((error) => {
        throw new UndatedFailedException(error.message);
      });

    return entity['_doc'];
  }

  async delete(id: string): Promise<boolean> {
    return await this.model
      .deleteOne({ _id: id })
      .exec()
      .then((result) => {
        if (!result.acknowledged || result.deletedCount == 0) {
          throw new DeleteNotFoundException();
        }

        return true;
      });
  }

  private getDocumentAudit(operator: string, entity: any) {
    if (operator === 'create') {
      entity['_doc'].created = new DocumentAudit();
      entity['_doc'].created.at = new Date();
      entity['_doc'].created.by = UserRequested.username;

      return new this.model(entity);
    }

    if (operator === 'update') {
      entity['_doc'].updated = new DocumentAudit();
      entity['_doc'].updated.at = new Date();
      entity['_doc'].updated.by = UserRequested.username;

      return new this.model(entity);
    }
  }
}
