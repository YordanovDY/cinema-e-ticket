import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { User, UserRole } from '../types/user';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { Options } from '../types/apiOptions';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User| null>(null);
  private user$ = this.user$$.asObservable();
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY
  }

  user: User | null = null;
  sessionToken: string = localStorage.getItem('[SessionToken]') || '';
  userSub: Subscription | null = null;

  constructor(private http: HttpClient) {
    this.userSub = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  get isLogged(): boolean {    
    return !!this.user;
  }

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
        this.user$$.next(user)
        localStorage.setItem('[SessionToken]', user.sessionToken);
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
      user => {
        this.user$$.next(user);
        localStorage.setItem('[SessionToken]', user.sessionToken);
      }
    ))
  }

  logout() {
    if (!this.user) {
      return;
    }

    const options: Options = {
      headers: {
        ...this.headers,
        'X-Parse-Session-Token': this.user.sessionToken
      }
    }

    return this.http.post('/api/logout', null, options).pipe((tap(
      () => {
        this.user$$.next(null);
        localStorage.removeItem('[SessionToken]');
      }
    )))
  }

  getProfile() {
    const options: Options = {
      headers: {
        ...this.headers,
        'X-Parse-Session-Token': this.sessionToken
      }
    }

    return this.http.get<User>('/api/users/me', options).pipe(tap(
      (user) => {
        this.user$$.next(user);
      }
    ))
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}