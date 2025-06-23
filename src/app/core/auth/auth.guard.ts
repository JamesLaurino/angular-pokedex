import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';

export const AuthGuard :CanActivateFn = () => {
  const authService =inject(AuthService);
  const router = inject(Router);

  if(!authService.isLoggIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
}
