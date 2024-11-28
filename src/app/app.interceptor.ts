import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.startsWith('/api')) {
    req = req.clone({
      url: req.url.replace('/api', environment.API_URL),
      // withCredentials: true
    })
  }

  return next(req);
};
