import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Options } from '../types/apiOptions';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY,
  }
  
  constructor(private http: HttpClient) { }

  sendMessage(subject:string, text:string, email: string){
    const sessionToken = localStorage.getItem('[SessionToken]');
      
    const options: Options = { 
      headers: { 
        ...this.headers, 
        "X-Parse-Session-Token": sessionToken,
        'Content-Type': 'application/json',
      } 
    };

    return this.http.post('/api/classes/Message', {subject, text, email}, options);
  }
}
