import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from '../../types/ticket';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Options } from '../../types/apiOptions';

@Injectable()
export class TicketDetailsService {
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY,
  }

  private ticket$$ = new BehaviorSubject<Ticket | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public ticket$ = this.ticket$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) { }

  getSingleTicket(ticketId: string) {
    const sessionToken = localStorage.getItem('[SessionToken]');

    const options: Options = {
      headers: {
        ...this.headers,
        "X-Parse-Session-Token": sessionToken,
      }
    };

    this.isLoading$$.next(true);

    this.http.get<Ticket>(`/api/classes/Ticket/${ticketId}`, options).subscribe((ticket) => {
      this.ticket$$.next(ticket);
      this.isLoading$$.next(false);
    })
  }
}
