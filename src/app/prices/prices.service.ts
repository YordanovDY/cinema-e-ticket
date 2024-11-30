import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Price } from '../types/price';
import { BehaviorSubject } from 'rxjs';
import { Options } from '../types/apiOptions';
import { B4AResponse } from '../types/response';

@Injectable()
export class PricesService {
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY,
  }

  private prices$$ = new BehaviorSubject<Price[] | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public prices$ = this.prices$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) { }

  getPrices() {
    const options: Options = { headers: { ...this.headers } };

    this.isLoading$$.next(true);

    this.http.get<B4AResponse>('/api/classes/Price', options).subscribe( (resp) => {
      const prices: Price[] = resp.results as Price[];

      this.prices$$.next(prices);
      this.isLoading$$.next(false);
    })
  }
}
