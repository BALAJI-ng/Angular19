import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { counterReducer } from './state-managment/ngrx/store';
import { userReducer } from './state-managment/ngrx/user.reducer';
import { userReducer as userStoreReducer } from './redux/redux-store/user.reducer';
import { httpGlobalInterceptorInterceptor } from './Error-Handling/Global/http-global-interceptor.interceptor';
import { simpleUserReducer } from './simple-redux/simple-ngrx/store'

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpGlobalInterceptorInterceptor])),
    provideStore({
      counter: counterReducer,
      user: userReducer,
      userStore: userStoreReducer,
      simpleReducer: simpleUserReducer
    })
  ]
};
