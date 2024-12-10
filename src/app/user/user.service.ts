import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { LoggingResponse, ReadingUserResponse, RegistrationResponse, User, UserRole } from '../types/user';
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
    if (this.user) {
      return this.user.role.objectId === UserRole.Manager;
    }

    return false;
  }

  get isAdmin(): boolean {
    if (this.user) {
      return this.user.role.objectId === UserRole.Admin;
    }

    return false;
  }

  login(username: string, password: string) {

    const body = {
      username,
      password
    }

    return this.http.post<LoggingResponse>('/api/login', body).pipe(tap(
      resp => {
        localStorage.setItem('[SessionToken]', resp.sessionToken);
        localStorage.setItem('[UserId]', resp.objectId);
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

    return this.http.post<RegistrationResponse>('/api/users', body).pipe(tap(
      resp => {

        // this.user$$.next({
        //   objectId: user.objectId,
        //   username: username,
        //   email: email,
        //   role: {
        //     __type: "Pointer",
        //     className: "_Role",
        //     objectId: userRoleId
        //   },
        //   money: 0,
        //   createdAt: user.createdAt,
        //   updatedAt: user.createdAt,
        //   __type: "Object",
        //   className: "_User",
        //   sessionToken: user.sessionToken
        // });

        localStorage.setItem('[SessionToken]', resp.sessionToken);
        localStorage.setItem('[UserId]', resp.objectId);
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
        localStorage.removeItem('[UserId]');
      }
    )))
  }

  getUserInfo(){
    return {
      userId: localStorage.getItem('[UserId]') as string,
      sessionToken: localStorage.getItem('[SessionToken]') as string
    }
  }

  setUserById(userId: string, sessionToken: string) {
    return this.http.get<ReadingUserResponse>(`/api/users/${userId}`).pipe(tap((user) =>{
      this.user$$.next({
        objectId: user.objectId,
        username: user.username,
        email: user.email,
        role: user.role,
        money: user.money,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        __type: "Object",
        className: "_User",
        sessionToken: sessionToken
      })
    }))
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}