import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const initialTime = Date.now();
    const req = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => {
        Logger.log(`URL: ${req.url} METHOD:${req.method}`);
        Logger.log(`Execution took ${Date.now() - initialTime}ms`);
      }),
    );
  }
}
