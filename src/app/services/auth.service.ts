import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {IUser} from "../model/user.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export const ANONYMOUS_USER: IUser = {
  id: undefined,
  email: ''
};

@Injectable()
export class AuthService {
  private subject = new BehaviorSubject<IUser>(ANONYMOUS_USER);
  user$: Observable<IUser> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.map(user => !!user.id);
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.map(isLoggedIn => !isLoggedIn);

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {

  }

}
