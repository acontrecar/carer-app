import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth/layout/auth-layout/auth-layout.component';
import { HomeLayoutComponent } from './home/layout/home-layout/home-layout.component';
import { privateGuard } from './core/guards/private.guard';

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
  {
    path: 'home',
    component: HomeLayoutComponent,
    canActivate: [privateGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.routes').then((r) => r.HOME_ROUTES),
      },
    ],
  },
];
