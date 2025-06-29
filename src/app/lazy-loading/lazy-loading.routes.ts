import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./lazy-load/lazy-load.component').then(m => m.LazyLoadComponent)
    },
    // Add more routes to demonstrate useExisting
    {
        path: 'dependency-injection',
        loadComponent: () => import('../dependency-injection/di/di.component').then(m => m.DiComponent)
    }
];
