import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { inject } from '@angular/core';
import { HttpResponseErrorService } from './invalid-pages/http-response-error/http-response-error.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  let reqHeaders = req.headers
    .set('X-Parse-Application-Id', environment.APP_ID)
    .set('X-Parse-REST-API-Key', environment.REST_API_KEY);

  const sessionToken: string = localStorage.getItem('[SessionToken]') || '';

  if (sessionToken) {
    reqHeaders = reqHeaders.set('X-Parse-Session-Token', sessionToken);
  }

  const method = req.method;

  if (method === 'POST' || method === 'PUT') {
    reqHeaders = reqHeaders.set('Content-Type', 'application/json');
  }

  if (req.url.endsWith('login') || req.url.endsWith('register')) {
    reqHeaders = reqHeaders.set('X-Parse-Revocable-Session', '1');
  }

  if (req.url.startsWith('/api')) {
    req = req.clone({
      url: req.url.replace('/api', environment.API_URL),
      withCredentials: true,
      headers: reqHeaders
    })

  }

  const httpError = inject(HttpResponseErrorService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {

      httpError.setError(err);

      router.navigate(['/http-error']);

      return [err];
    })
  )
};
