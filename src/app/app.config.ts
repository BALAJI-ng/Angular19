import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { counterReducer } from './state-managment/ngrx/store';
import { userReducer } from './state-managment/ngrx/user.reducer';
import { userReducer as userStoreReducer } from './redux/redux-store/user.reducer';
import { httpGlobalInterceptorInterceptor } from './Error-Handling/Global/http-global-interceptor.interceptor';
import { simpleUserReducer } from './simple-redux/simple-ngrx/store';
import { myreducer_facade_adapter } from './redux-facade-adapter/store';
import { myJsonReducer } from './json-server-ngrx-adaptor-facade/store';
import { UserEffects } from './json-server-ngrx-adaptor-facade/user.effects';

import { routes } from './app.routes';
import { formReducer } from './ngrx-form/store';
import { myCapgeminiReducer } from './reduc-capgemini/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpGlobalInterceptorInterceptor])),
    provideStore({
      counter: counterReducer,
      user: userReducer,
      userForm: formReducer,
      userStore: userStoreReducer,
      simpleReducer: simpleUserReducer,
      anyName: myreducer_facade_adapter,
      jsonUsers: myJsonReducer,
      myCapgeminiReducer: myCapgeminiReducer,
    }),
    provideEffects([UserEffects]),
  ],
};
