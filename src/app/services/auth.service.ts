import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from "rxjs";

type UserRole = "ADMIN" | "TEACHER" | "STUDENT"

export interface User {
  token: string,
  login: string,
  roles: UserRole[]
}

@Injectable()
export class AuthService {

  private _$connectedUserSubject = new BehaviorSubject<User | undefined>(undefined);
  private _currentUser: User | undefined;

  constructor(
    private readonly _httpClient: HttpClient,
  ) {
    const userJsonData = localStorage.getItem("user");
    if( userJsonData ) {
      this.currentUser = JSON.parse(userJsonData);
    }
  }

  get connectedUser() {
    return this._currentUser;
  }

  private set currentUser(user: User | undefined){
    this._currentUser = user;
    this._$connectedUserSubject.next(this._currentUser);
  }
  get $connected() {
    return this._$connectedUserSubject
      .asObservable()
      .pipe(
        map( user => user != undefined )
      );
  }
  get $admin(): Observable<boolean> {
    return this._$connectedUserSubject
      .asObservable()
      .pipe(
        map(user => {
          let list: UserRole[] | undefined = user?.roles;
          if (list && list.includes("ADMIN")) {
            return true;
          } else {
            return false;
          }
        })
      );
  }
  get $teacher(): Observable<boolean> {
    return this._$connectedUserSubject
      .asObservable()
      .pipe(
        map(user => {
          let list: UserRole[] | undefined = user?.roles;
          if (list && list.includes("TEACHER")) {
            return true;
          } else {
            return false;
          }
        })
      );
  }
  get $connectedUser() {
    return this._$connectedUserSubject.asObservable();
  }

  login(data: any) {
    return this._httpClient.post<User>('http://localhost:8080/auth/login', data).pipe(
      tap(user => {
        this.currentUser = user;
        localStorage.setItem("user", JSON.stringify(user))
      })
    );
  }
  logOut(){
    this.currentUser = undefined;
    localStorage.removeItem("user");
  }

  register(data: any) {
    return this._httpClient.post('http://localhost:8080/auth/register', data);
  }
}
