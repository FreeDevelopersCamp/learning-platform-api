import { HttpException, HttpStatus } from '@nestjs/common';

export type ErrorModel = {
  error: {
    code: string | number;
    traceId: string;
    context: string;
    message: string;
    timestamp: string;
    path: string;
  };
};

type ParametersType = { [key: string]: unknown };

export class BaseException extends HttpException {
  traceId: string;
  readonly context: string;
  readonly statusCode: number;
  readonly code?: string;
  readonly parameters: ParametersType;

  constructor(
    message: string,
    status: HttpStatus,
    parameters?: ParametersType,
  ) {
    super(message, status);

    if (parameters) {
      this.parameters = parameters;
    }

    this.statusCode = super.getStatus();
    Error.captureStackTrace(this);
  }
}

export class ApiInternalServerException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Internal Server Exception', 500, parameters);
  }
}

export class ApiNotFoundException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Not Found', 404, parameters);
  }
}

export class ApiConflictException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Conflict Exception', 409, parameters);
  }
}

export class ApiUnauthorizeException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Unauthorized Exception', 401, parameters);
  }
}

export class UnauthorizeException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Unauthorized', 401, parameters);
  }
}

export class ApiBadRequestException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Bad Request', 400, parameters);
  }
}

export class RequiredFieldException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'There Are Required Field!', 400, parameters);
  }
}

export class ApiForbiddenException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Forbidden Exception', 403, parameters);
  }
}

export class ApiTimeoutException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Timeout Exception', 408, parameters);
  }
}

export class ObjectIdNotValidException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Your Id Not Valid', 400, parameters);
  }
}

export class DataNotFoundException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Data Not Found', 400, parameters);
  }
}

export class DataNotCreatedException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Data Not Created', 400, parameters);
  }
}

export class DuplicateKeyException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'There Are Duplicate Key', 400, parameters);
  }
}

export class NoFieldUpdatedException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'There Are No Field Updated', 400, parameters);
  }
}

export class UndatedFailedException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Undated Failed', 400, parameters);
  }
}

export class DeleteNotFoundException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'You Id Not Found', 400, parameters);
  }
}

export class ValidationFailedException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Validation Failed', 400, parameters);
  }
}

export class CORSException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Not allowed by CORS', 401, parameters);
  }
}

export class UserNotFoundException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'user not found', 400, parameters);
  }
}
export class MenuNotFoundException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'menu not found', 400, parameters);
  }
}

export class PasswordFailedException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'The password is not complex', 400, parameters);
  }
}

export class ExistUserException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'This user already exists', 400, parameters);
  }
}

export class InvalidLoginException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Invalid username or password', 401, parameters);
  }
}

export class ProductNotFoundException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Product not found', 404, parameters);
  }
}

export class LookupItemNotFoundException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Lookup item not found', 404, parameters);
  }
}

export class RetailerException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Something went error', 404, parameters);
  }
}

export class InventoryException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Something went error', 404, parameters);
  }
}

export class SupplierException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Something went error', 404, parameters);
  }
}

export class WarehouseException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Something went error', 404, parameters);
  }
}

export class OrderException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Something went error', 404, parameters);
  }
}

export class LoginAttemptsException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(
      message ?? 'You have exceeded the maximum number of attempts',
      400,
      parameters,
    );
  }
}

export class CartNotFoundException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Cart not found.', 404, parameters);
  }
}

export class OwnerException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Something went error', 404, parameters);
  }
}

export class ManagerException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Something went error', 404, parameters);
  }
}

export class AccountManagerException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Something went error', 404, parameters);
  }
}

export class ContentManagerException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Something went error', 404, parameters);
  }
}

export class InstructorException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Something went error', 404, parameters);
  }
}

export class LearnerException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Something went error', 404, parameters);
  }
}

export class CourseException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Something went error', 404, parameters);
  }
}

export class PracticeException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Something went error', 404, parameters);
  }
}

export class ProjectException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Something went error', 404, parameters);
  }
}

export class RoadmapException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'Something went error', 404, parameters);
  }
}
