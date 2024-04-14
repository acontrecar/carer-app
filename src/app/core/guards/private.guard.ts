import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../enum';

export const privateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentStatus = authService.authStatus();

  console.log(currentStatus());
  if (currentStatus() === AuthStatus.authenticated) return true;

  console.log({ route, state });

  router.navigate(['/']);

  return false;
};
