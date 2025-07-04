import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const AuthGuard :CanActivateFn = () => {
  const router = inject(Router);

  if(localStorage.getItem('token') === null) {
    router.navigate(['/login']);
    return false;
  }
  return true;
}
