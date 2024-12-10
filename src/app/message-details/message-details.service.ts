import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../types/message';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MessageDetailsService {
  private message$$ = new BehaviorSubject<Message | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public message$ = this.message$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) { }

  getSingleMessage(messageId: string){
    this.isLoading$$.next(true);

    this.http.get<Message>(`/api/classes/Message/${messageId}`).subscribe(message => {
      this.message$$.next(message);
      this.isLoading$$.next(false);
    })
  }

  changeToRead(messageId: string){
    this.http.put(`/api/classes/Message/${messageId}`, {isRead: true}).subscribe(() =>{ });
  }

  deleteMessage(messageId: string){
    return this.http.delete(`/api/classes/Message/${messageId}`);
  }
}
