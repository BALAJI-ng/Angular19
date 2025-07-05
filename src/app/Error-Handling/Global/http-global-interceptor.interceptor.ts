import { HttpInterceptorFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AlertService } from './alert.service';

export const httpGlobalInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error);

      switch (error.status) {
        case 401:
          console.error('Unauthorized request:', error);
          alertService.showAlert(
            'Authentication Error',
            'Your session has expired. Please log in again.'
          );
          break;
        case 403:
          console.error('Forbidden request:', error);
          alertService.showAlert(
            'Access Denied',
            'You do not have permission to access this resource.'
          );
          break;
        case 404:
          console.error('Resource not found:', error);
          alertService.showAlert(
            'Resource Not Found',
            'The requested resource was not found.'
          );
          break;
        case 500:
          console.error('Internal server error:', error);
          alertService.showAlert(
            'Server Error',
            'An internal server error occurred. Please try again later.'
          );
          break;
        case 0:
          // Network error
          alertService.showAlert(
            'Network Error',
            'Network connection error. Please check your internet connection.'
          );
          break;
        default:
          console.error('An unexpected error occurred:', error);
          alertService.showAlert(
            'Error',
            `An unexpected error occurred: ${error.message || 'Unknown error'}`
          );
          break;
      }

      return throwError(() => error);
    })
  );
};
