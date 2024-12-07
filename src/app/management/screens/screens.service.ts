import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { B4AResponse } from '../../types/response';
import { Screen } from '../../types/screen';

@Injectable()
export class ScreensService {

  private screens$$ = new BehaviorSubject<Screen[] | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public screens$ = this.screens$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) { }
  
  getScreens(){
    this.isLoading$$.next(true);

    this.http.get<B4AResponse>('/api/classes/Screen').subscribe(resp => {
      const screens: Screen[] = resp.results as Screen[];
      this.screens$$.next(screens);

      this.isLoading$$.next(false);
    })
  }

  deleteScreen(screenId: string){
    return this.http.delete<Screen>(`/api/classes/Screen/${screenId}`);
  }
}
