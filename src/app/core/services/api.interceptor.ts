import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/** Normalises HTTP failures into a user-presentable Error so components never parse transport details. */
export const apiInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((error: unknown) => {
      const status = error instanceof HttpErrorResponse ? error.status : 0;
      const message =
        status === 0
          ? 'Network error — please check your connection and try again.'
          : status >= 500
            ? 'The service is temporarily unavailable. Please try again later.'
            : 'The request could not be completed. Please review your details and try again.';
      return throwError(() => new Error(message));
    }),
  );
