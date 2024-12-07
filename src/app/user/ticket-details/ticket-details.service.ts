import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from '../../types/ticket';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TicketDetailsService {

  private ticket$$ = new BehaviorSubject<Ticket | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public ticket$ = this.ticket$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) { }

  getSingleTicket(ticketId: string) {
    this.isLoading$$.next(true);

    this.http.get<Ticket>(`/api/classes/Ticket/${ticketId}`).subscribe((ticket) => {
      this.ticket$$.next(ticket);
      this.isLoading$$.next(false);
    })
  }
}
