import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Options } from '../../types/apiOptions';
import { B4AResponse } from '../../types/response';
import { Screen } from '../../types/screen';

@Injectable()
export class ScreensService {
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY,
  }

  private screens$$ = new BehaviorSubject<Screen[] | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public screens$ = this.screens$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) { }
  
  getScreens(){
    const options: Options = { headers: {...this.headers} };

    this.isLoading$$.next(true);

    this.http.get<B4AResponse>('/api/classes/Screen', options).subscribe(resp => {
      const screens: Screen[] = resp.results as Screen[];
      this.screens$$.next(screens);

      this.isLoading$$.next(false);
    })
  }
}
