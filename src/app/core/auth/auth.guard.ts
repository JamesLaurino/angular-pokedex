import {CanActivateFn} from '@angular/router';

export const AuthGuard :CanActivateFn = () => {
  console.log("le guard est bien appelé")
  return true;
}
