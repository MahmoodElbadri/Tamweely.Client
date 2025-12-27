import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const token = auth.token();
  const router = inject(Router);

  if(token){
    return true;
  }
  else {
    router.navigate(['/auth/login']);
    return false;
  }
};
