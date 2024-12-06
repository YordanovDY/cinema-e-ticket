import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { B4AResponse } from './types/response';
import { Movie } from './types/movie';
import { Options } from './types/apiOptions';
import { Projection } from './types/projection';
import { INFO_KEY } from './constants';
import { InfoObject } from './types/infoObject';
import { BehaviorSubject } from 'rxjs';
import { Screen } from './types/screen';

@Injectable()
export class ApiService {
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY,
    'Content-Type': 'application/json'
  }

  // TODO: Move into screens.service.ts

  private screen$$ = new BehaviorSubject<Screen | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public screen$ = this.screen$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) { }

  getSingleScreen(screenId: string){
    const options: Options = { headers: {...this.headers} };

    this.isLoading$$.next(true);

    this.http.get<Screen>(`/api/classes/Screen/${screenId}`, options).subscribe(screen => {
      this.screen$$.next(screen);
      this.isLoading$$.next(false);
    })
  }

  // TODO: Move into screens.service.ts 

  getInfoObject() {
    const URL = `/api/classes/Information/${INFO_KEY}`;
    const options: Options = { headers: {...this.headers} };

    return this.http.get<InfoObject>(URL, options);
  }
}