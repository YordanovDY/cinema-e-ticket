import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserRole } from '../types/user';
import { BehaviorSubject, tap } from 'rxjs';
import { Options } from '../types/apiOptions';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<User | null>(null);
  private user$ = this.user$$.asObservable();
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY
  }

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const options: Options = {
      headers: {
        ...this.headers,
        'X-Parse-Revocable-Session': '1'
      }
    }

    const body = {
      username,
      password
    }

    return this.http.post<User>('/api/login', body, options).pipe(tap(
      user => {
        console.log(user);
        
        this.user$$.next(user)
      }
    ))
  }

  register(username: string, email: string, password: string) {
    const options: Options = {
      headers: {
        ...this.headers,
        'X-Parse-Revocable-Session': '1',
        'Content-Type': 'application/json'
      }
    }

    const userRoleId = UserRole.User;

    const body = {
      username,
      password,
      email,
      role: {
        __type: "Pointer", 
        className: "_Role",
        objectId: userRoleId
      }
    }

    return this.http.post<User>('/api/users', body, options).pipe(tap(
      user => this.user$$.next(user)
    ))
  }

  getProfile() {
    return this.http.get<User>('/api/users/me').pipe(tap(
      user => this.user$$.next(user)
    ))
  }
}
