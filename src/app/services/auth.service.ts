import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {IUser} from "../model/user.model";

@Injectable()
export class AuthService {

  user$: Observable<IUser>;

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {

  }

}
