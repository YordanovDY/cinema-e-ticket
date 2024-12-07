import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { inject } from '@angular/core';
import { HttpResponseErrorService } from './invalid-pages/http-response-error/http-response-error.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.startsWith('/api')) {
    req = req.clone({
      url: req.url.replace('/api', environment.API_URL),
      withCredentials: true
    })
    req.headers.append('X-Parse-Application-Id',environment.APP_ID);
    req.headers.append('X-Parse-REST-API-Key', environment.REST_API_KEY);

    const sessionToken: string = localStorage.getItem('[SessionToken]') || '';

    if(sessionToken){
      req.headers.append('X-Parse-Session-Token', sessionToken);
    }

    const method = req.method;
    
    if(method === 'POST' || method === 'PUT'){
      req.headers.append('Content-Type', 'application/json');
    }

    if(req.url.endsWith('login') || req.url.endsWith('register')){
      req.headers.append('X-Parse-Revocable-Session', '1');
    }
  }

  const httpError = inject(HttpResponseErrorService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err)=> {
      if(err.status === 401){
        router.navigate(['/login']);
      } else{
        httpError.setError(err);
        router.navigate(['/http-error']);
      }

      return [err];
    })
  )
};
