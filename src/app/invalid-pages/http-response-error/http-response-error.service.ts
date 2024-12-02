import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpResponseErrorService {
  private apiError$$ = new BehaviorSubject<HttpErrorResponse | null>(null);
  public apiError$ = this.apiError$$.asObservable();

  constructor() { }

  setError(error: HttpErrorResponse): void{
    this.apiError$$.next(error);
  }
}
