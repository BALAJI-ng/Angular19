import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./di/di.component').then(m => m.DiComponent)
  },
  {
    path: 'injection-tokens',
    loadComponent: () => import('../injection-token/injection-token.component').then(m => m.InjectionTokenComponent)
  }
];
