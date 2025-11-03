// create class to appError extends from Error (to customize on it >> status code)
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errorDetails?: Record<string, any>[] // Record<string, any>  ==  object
  ) {
    super(message);
  }
}

// create class to conflictException extends from AppError >> to handle conflict error (409)
export class ConflictException extends AppError {
  constructor(message: string, errorDetails?: Record<string, any>[]) {
    super(message, 409, errorDetails);
  }
}

// create class to notFoundException extends from AppError >> to handle not found error (404)
export class NotFoundException extends AppError {
  constructor(message: string, errorDetails?: Record<string, any>[]) {
    super(message, 404, errorDetails);
  }
}

// create class to UnauthorizedException extends from AppError >> to handle not authorized error (401)
export class UnauthorizedException extends AppError {
  constructor(message: string, errorDetails?: Record<string, any>[]) {
    super(message, 401, errorDetails);
  }
}

// create class to BadRequestException extends from AppError >> to handle bad request error (400)
export class BadRequestException extends AppError {
  constructor(message: string, errorDetails?: Record<string, any>[]) {
    super(message, 400, errorDetails);
  }
}

// create class to ForbiddenException extends from AppError >> to handle forbidden error (403)
export class ForbiddenException extends AppError {
  constructor(message: string, errorDetails?: Record<string, any>[]) {
    super(message, 403, errorDetails);
  }
}
