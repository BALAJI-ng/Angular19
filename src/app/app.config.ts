import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './state-managment/ngrx/store';
import { userReducer } from './state-managment/ngrx/user.reducer';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      counter: counterReducer,
      user: userReducer
    })
  ]
};
