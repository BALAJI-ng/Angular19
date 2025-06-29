import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./component-architecture/component-architecture.component').then(m => m.ComponentArchitectureComponent) },
]