import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./dashboard/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'ngrx',
        loadComponent: () =>
          import('./state-managment/ngrx/ngrx.component').then(
            (m) => m.NgrxComponent
          ),
      },
      {
        path: 'senior-angular',
        loadChildren: () =>
          import('./senior-angular-certification/senior-angular.routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'lazy-loading',
        loadChildren: () =>
          import('./lazy-loading/lazy-loading.routes').then((m) => m.routes),
      },
      {
        path: 'dependency-injection',
        loadChildren: () =>
          import('./dependency-injection/dependency-injection.routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'content-projection',
        loadComponent: () =>
          import('./content-projection/content-projection.component').then(
            (m) => m.ContentProjectionComponent
          ),
      },
      {
        path: 'grid-flex',
        loadComponent: () =>
          import('./grid-and-flex-layout/grid-and-flex-layout.component').then(
            (m) => m.GridAndFlexLayoutComponent
          ),
      },
      {
        path: 'app-flex-layout-try',
        loadComponent: () =>
          import('./flex-layout-try/flex-layout-try.component').then(
            (m) => m.FlexLayoutTryComponent
          ),
      },
      {
        path: 'ng-container-template',
        loadComponent: () =>
          import(
            './ng-container-ng-template/ng-container-ng-template.component'
          ).then((m) => m.NgContainerNgTemplateComponent),
      },
      {
        path: 'parent-child-demo',
        loadComponent: () =>
          import('./parent-child-demo/parent-child-demo.component').then(
            (m) => m.ParentChildDemoComponent
          ),
      },
      {
        path: 'signals',
        loadComponent: () =>
          import('./signals/signals.component').then((m) => m.SignalsComponent),
      },
      {
        path: 'circular-dependency',
        loadComponent: () =>
          import(
            './circular-dependency-demo/circular-dependency-demo.component'
          ).then((m) => m.CircularDependencyDemoComponent),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./examples/examples.component').then(
            (m) => m.ExamplesComponent
          ),
      },
      {
        path: 'spread-operator',
        loadComponent: () =>
          import('./spread-operator/spread-operator.component').then(
            (m) => m.SpreadOperatorComponent
          ),
      },
      {
        path: 'interface',
        loadComponent: () =>
          import('./interface/interface.component').then(
            (m) => m.InterfaceComponent
          ),
      },
      {
        path: 'creating-types',
        loadComponent: () =>
          import(
            './reating-types-from-types/reating-types-from-types.component'
          ).then((m) => m.ReatingTypesFromTypesComponent),
      },
      {
        path: 'generics',
        loadComponent: () =>
          import('./generics/generics.component').then(
            (m) => m.GenericsComponent
          ),
      },
      {
        path: 'playwright',
        loadComponent: () =>
          import('./playwright/playwright.component').then(
            (m) => m.PlaywrightComponent
          ),
      },
      {
        path: 'error-test',
        loadComponent: () =>
          import(
            './Error-Handling/Global/error-test/error-test.component'
          ).then((m) => m.ErrorTestComponent),
      },
      {
        path: 'redux-store',
        loadComponent: () =>
          import('./redux/redux-store/redux-store.component').then(
            (m) => m.ReduxStoreComponent
          ),
      },
      {
        path: 'simple-user-ngrx',
        loadComponent: () =>
          import('./simple-redux/simple-ngrx/simple-ngrx.component').then(
            (m) => m.SimpleNgrxComponent
          ),
      },
      {
        path: 'ngrx-facade-adaptor',
        loadComponent: () =>
          import('./redux-facade-adapter/redux-facade-adapter.component').then(
            (m) => m.ReduxFacadeAdapterComponent
          ),
      },
      {
        path: 'jest-validation',
        loadComponent: () =>
          import('./jest-form/jest-form.component').then(
            (m) => m.JestFormComponent
          ),
      },
    ],
  },
];
