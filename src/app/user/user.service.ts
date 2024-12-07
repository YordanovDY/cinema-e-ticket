import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { User, UserRole } from '../types/user';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | null>(null);
  public user$ = this.user$$.asObservable();

  user: User | null = null;
  userSub: Subscription | null = null;

  constructor(private http: HttpClient) {
    this.userSub = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  get isLogged(): boolean {
    return !!this.user;
  }

  get isManager(): boolean {
    if(this.user){
      return this.user.role.objectId === UserRole.Manager;
    }
    
    return false;
  }

  get isAdmin(): boolean {
    if(this.user) {
      return this.user.role.objectId === UserRole.Admin;
    }

    return false;
  }

  login(username: string, password: string) {

    const body = {
      username,
      password
    }

    return this.http.post<User>('/api/login', body).pipe(tap(
      user => {
        this.user$$.next(user)
        localStorage.setItem('[SessionToken]', user.sessionToken);
      }
    ))
  }

  register(username: string, email: string, password: string) {

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

    return this.http.post<User>('/api/users', body).pipe(tap(
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

    return this.http.post('/api/logout', null).pipe((tap(
      () => {
        this.user$$.next(null);
        localStorage.removeItem('[SessionToken]');
      }
    )))
  }

  getProfile() {
    return this.http.get<User>('/api/users/me').pipe(tap(
      (user) => {
        this.user$$.next(user);
      }
    ))
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}