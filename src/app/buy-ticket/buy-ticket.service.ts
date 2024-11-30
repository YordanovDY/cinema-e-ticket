import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Projection } from '../types/projection';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Options } from '../types/apiOptions';

@Injectable()
export class BuyTicketService {
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY,
  }

  private projection$$ = new BehaviorSubject<Projection | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public projection$ = this.projection$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) { }

  getSingleProjection(projectionId: string){
    const options: Options = { headers: { ...this.headers } };

    this.isLoading$$.next(true);

    this.http.get<Projection>(`/api/classes/Projection/${projectionId}`, options).subscribe((projection) => {
      this.projection$$.next(projection);
      this.isLoading$$.next(false);
    })
  }
}
