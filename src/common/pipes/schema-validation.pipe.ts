import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { RequiredFieldException } from 'src/utils/exception';

@Injectable()
export class SchemaValidation implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object, { ValidateNested: true });

    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) =>
          Object.values(
            error.constraints
              ? error.constraints
              : { type: `${error.property} Not Validated` },
          ),
        )
        .join(', ');

      throw new RequiredFieldException(errorMessages);
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object, Date];
    return !types.includes(metatype);
  }
}
