import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const privateGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authState = inject(AuthService);
  return authState.authState.pipe(
    map((state) => {
      if (!state) {
        router.navigateByUrl('/log-in');
        return false;
      }
      return true;
    }),
  );
};

export const publicGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authState = inject(AuthService);
  return authState.authState.pipe(
    map((state) => {
      if (state) {
        router.navigateByUrl('/home');
        return false;
      }
      return true;
    }),
  );
};
