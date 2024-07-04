import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger(HttpExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const details = exception?.response;

    const message =
      exception?.message ??
      exception?.response?.message ??
      'Internal Server Error';

    const statusCode =
      exception?.status ??
      exception?.statusCode ??
      exception?.response?.statusCode ??
      HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      details: details,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
    });
  }
}
