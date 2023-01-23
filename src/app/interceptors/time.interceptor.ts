import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const timeStart = performance.now();

    return next.handle(request).pipe(
      tap(()=>{
        const time = (performance.now() - timeStart) + 'ms'
        console.log(request.url, time)
      })
    );
  }
}
