import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { Types } from 'mongoose';
import { ObjectIdNotValidException } from 'src/utils/exception';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { type } = metadata;
    if (type === 'param' && !Types.ObjectId.isValid(value)) {
      throw new ObjectIdNotValidException();
    }

    if (type === 'body' && !Types.ObjectId.isValid(value._id)) {
      throw new ObjectIdNotValidException();
    }

    return value;
  }
}
