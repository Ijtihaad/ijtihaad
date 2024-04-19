import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { getRequestFromContext } from '../helpers/getRequestFromContext';
import logEvents from '../helpers/logEvents';
@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = getRequestFromContext(context);
    const startAt = new Date();
    const response = next.handle();
    const endAt = new Date();
    const time = endAt.getMilliseconds() - startAt.getMilliseconds();
    this.logger.log(
      `method:${request.method}\torigin:${request.headers.origin}\tuser-agent:${request.headers['user-agent']}\tlocation:${request.headers.location}\turl:${request.url}\ttime:${time}ms`,
    );
    logEvents(
      `method:${request.method}\torigin:${request.headers.origin}\tuser-agent:${request.headers['user-agent']}\tlocation:${request.headers.location}\turl:${request.url}\ttime:${time}ms`,
      'reqLog.txt',
    );

    return response;
  }
}
