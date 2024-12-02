import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from '../../types/ticket';
import { environment } from '../../../environments/environment.development';
import { Options } from '../../types/apiOptions';
import { HttpClient } from '@angular/common/http';
import { B4AResponse } from '../../types/response';

@Injectable()
export class TicketsService {
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY,
  }

  private tickets$$ = new BehaviorSubject<Ticket[] | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public tickets$ = this.tickets$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) { }

  getTicketsFromUser(userId: string){
    const sessionToken = localStorage.getItem('[SessionToken]');
      
    const options: Options = { 
      headers: { 
        ...this.headers, 
        "X-Parse-Session-Token": sessionToken,
        'Content-Type': 'application/json',
      } 
    };

    const query = {
      user: {
        __type: 'Pointer',
        className: '_User',
        objectId: userId
      },
    };

    options['params'] = {
       where: JSON.stringify(query),
       order: '-createdAt'
      };

    this.isLoading$$.next(true);

    this.http.get<B4AResponse>('/api/classes/Ticket', options).subscribe((resp) =>{
      const tickets: Ticket[] = resp.results as Ticket[];
      this.tickets$$.next(tickets);

      this.isLoading$$.next(false);
    })
  }

  getTicketsFromProjection(projectionId: string){
    const sessionToken = localStorage.getItem('[SessionToken]');
      
    const options: Options = { 
      headers: { 
        ...this.headers, 
        "X-Parse-Session-Token": sessionToken,
        'Content-Type': 'application/json',
      } 
    };

    const query = {
      projection: {
        __type: "Pointer",
        className: "Projection",
        objectId: projectionId
      }
    };

    options['params'] = { where: JSON.stringify(query) };

    this.isLoading$$.next(true);

    this.http.get<B4AResponse>('/api/classes/Ticket', options).subscribe((resp) =>{
      const tickets: Ticket[] = resp.results as Ticket[];
      this.tickets$$.next(tickets);

      this.isLoading$$.next(false);
    })
  }
}
