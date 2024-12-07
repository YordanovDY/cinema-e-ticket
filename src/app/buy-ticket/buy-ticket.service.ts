import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Projection, ProjectionPointer } from '../types/projection';
import { HttpClient } from '@angular/common/http';
import { Options } from '../types/apiOptions';
import { DateAndTime } from '../types/dateAndTime';
import { UserPointer } from '../types/user';

@Injectable()
export class BuyTicketService {

  private projection$$ = new BehaviorSubject<Projection | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public projection$ = this.projection$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) { }

  getSingleProjection(projectionId: string){

    this.isLoading$$.next(true);

    this.http.get<Projection>(`/api/classes/Projection/${projectionId}`).subscribe((projection) => {
      this.projection$$.next(projection);
      this.isLoading$$.next(false);
    })
  }

  buyTicket(
    projectionId: string, 
    userId: string, 
    movie: string, 
    screen: string, 
    rowStr: string, 
    seatStr: string, 
    dateAndTimeStr:string, 
    ticketType:string, 
    ticketPriceStr: string) {

      const dateAndTime: DateAndTime = {
        __type: 'Date',
        iso: dateAndTimeStr
      }

      const row: number = Number(rowStr);
      const seat: number = Number(seatStr);

      const projectionPointer: ProjectionPointer = {
        __type: 'Pointer',
        className: 'Projection',
        objectId: projectionId
      }

      const userPointer: UserPointer = {
        __type: 'Pointer',
        className: '_User',
        objectId: userId
      }

      const ticketPrice: number = Number(ticketPriceStr);

      const body = {
        movie,
        screen,
        dateAndTime,
        row,
        seat,
        ticketType,
        ticketPrice,
        user: userPointer,
        projection: projectionPointer
      }

      return this.http.post('/api/classes/Ticket', body);
  }
}
