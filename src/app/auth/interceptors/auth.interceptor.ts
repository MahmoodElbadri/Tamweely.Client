import {HttpInterceptorFn} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('Auth')) {
    return next(req);
  }
  const auth = inject(AuthService);
  const token = auth.token();
  if (!token) {
    next(req);
  }
  const clonedReq = req.clone({
    setHeaders: {Authorization: `Bearer ${token}`}
  });

  return next(clonedReq);
};
