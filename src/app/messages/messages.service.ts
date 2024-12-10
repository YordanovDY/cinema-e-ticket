import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../types/message';
import { HttpClient } from '@angular/common/http';
import { B4AResponse } from '../types/response';

@Injectable()
export class MessagesService {
  private messages$$ = new BehaviorSubject<Message[] | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public messages$ = this.messages$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) { }

  getMessages() {
    const options = {
      params: { order: '-createdAt' }
    }

    this.isLoading$$.next(true);

    this.http.get<B4AResponse>('/api/classes/Message', options).subscribe(resp => {
      const messages = resp.results as Message[];
      this.messages$$.next(messages);
      this.isLoading$$.next(false);
    })
  }
}
