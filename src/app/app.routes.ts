import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth/layout/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./auth/auth.routes').then((r) => r.AUTH_ROUTES),
      },
    ],
  },
];
