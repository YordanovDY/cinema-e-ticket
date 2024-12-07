import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  
  constructor(private http: HttpClient) { }

  sendMessage(subject:string, text:string, email: string){
    return this.http.post('/api/classes/Message', {subject, text, email});
  }
}
