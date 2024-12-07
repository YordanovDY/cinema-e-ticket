import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Price } from '../types/price';
import { BehaviorSubject } from 'rxjs';
import { B4AResponse } from '../types/response';

@Injectable()
export class PricesService {
  private prices$$ = new BehaviorSubject<Price[] | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public prices$ = this.prices$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) { }

  getPrices() {

    this.isLoading$$.next(true);

    this.http.get<B4AResponse>('/api/classes/Price').subscribe( (resp) => {
      const prices: Price[] = resp.results as Price[];

      this.prices$$.next(prices);
      this.isLoading$$.next(false);
    })
  }
}
