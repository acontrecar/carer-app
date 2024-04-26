import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../enum';
import { AutoDestroyService } from '../services/auto-destroy.service';
import { map, takeUntil, tap } from 'rxjs';

export const privateGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);

  console.log('DESDE EL GUARD');
  console.log({ authStatus: authService.authStatus() });
  // console.log({ currentUser: authService.currentUser() });

  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  const url = state.url;
  localStorage.setItem('url', url);

  router.navigate(['/']);

  return false;

  // authService.loggedIn$.subscribe((loggedIn) => {
  //   console.log(loggedIn);
  //   if (loggedIn) {
  //     return true;
  //   } else {
  //     router.navigate(['/']);
  //     return false;
  //   }
  // });

  // return authService.loggedIn$.pipe(
  //   map((loggedIn: boolean) => {
  //     console.log(loggedIn);
  //     if (loggedIn) {
  //       return true;
  //     } else {
  //       router.navigate(['/']);
  //       return false;
  //     }
  //   })
  // );

  // console.log({ authStatus: authService.getStatus() });
  // console.log({ currentUser: authService.currentUser() });

  // if (authService.currentUser()) {
  //   return true;
  // }

  // // return valor;

  // const url = state.url;
  // localStorage.setItem('url', url);

  // // // console.log({ route, state });

  // router.navigate(['/']);

  // return false;
};
