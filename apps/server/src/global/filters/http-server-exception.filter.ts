import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpServerExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpServerExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const message = exception?.message ?? 'Internal Server Error';

    const statusCode =
      exception?.status ??
      exception?.statusCode ??
      exception?.response?.statusCode ??
      HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = {
      error: true,
      name: exception.name,
      message: message,
      response: exception?.response,
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    this.logger.error({ exceptionResponse });
    response.status(statusCode).json(exceptionResponse);
  }
}