import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { throwError } from 'rxjs';

@Catch()
export class RpcExceptionFilter implements ExceptionFilter {
  logger = new Logger(RpcExceptionFilter.name);
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

    const error = {
      statusCode: statusCode,
      message: message,
      details: details,
    };

    this.logger.debug(error);
    return throwError(() => error);
  }
}
