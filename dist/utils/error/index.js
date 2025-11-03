"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = exports.BadRequestException = exports.UnauthorizedException = exports.NotFoundException = exports.ConflictException = exports.AppError = void 0;
// create class to appError extends from Error (to customize on it >> status code)
class AppError extends Error {
    statusCode;
    errorDetails;
    constructor(message, statusCode, errorDetails // Record<string, any>  ==  object
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errorDetails = errorDetails;
    }
}
exports.AppError = AppError;
// create class to conflictException extends from AppError >> to handle conflict error (409)
class ConflictException extends AppError {
    constructor(message, errorDetails) {
        super(message, 409, errorDetails);
    }
}
exports.ConflictException = ConflictException;
// create class to notFoundException extends from AppError >> to handle not found error (404)
class NotFoundException extends AppError {
    constructor(message, errorDetails) {
        super(message, 404, errorDetails);
    }
}
exports.NotFoundException = NotFoundException;
// create class to UnauthorizedException extends from AppError >> to handle not authorized error (401)
class UnauthorizedException extends AppError {
    constructor(message, errorDetails) {
        super(message, 401, errorDetails);
    }
}
exports.UnauthorizedException = UnauthorizedException;
// create class to BadRequestException extends from AppError >> to handle bad request error (400)
class BadRequestException extends AppError {
    constructor(message, errorDetails) {
        super(message, 400, errorDetails);
    }
}
exports.BadRequestException = BadRequestException;
// create class to ForbiddenException extends from AppError >> to handle forbidden error (403)
class ForbiddenException extends AppError {
    constructor(message, errorDetails) {
        super(message, 403, errorDetails);
    }
}
exports.ForbiddenException = ForbiddenException;
