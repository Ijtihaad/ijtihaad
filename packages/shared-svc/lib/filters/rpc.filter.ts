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
    console.error(exception);

    const error = exception?.response ?? {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Unknown Error',
      massage: 'Internal Server Error',
    };
    this.logger.debug(error);
    return throwError(() => error);
  }
}
