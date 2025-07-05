import { HttpInterceptorFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const globalErrorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    switch (error.status) {
      case 400:
        console.log("Bad Request", error.message);
        break;
      case 500:
        console.log("Server Error", error.message);
        break;
         default:
          console.log("Unknown Error", error)
    }

    return throwError(() => Error)
  }))
};
