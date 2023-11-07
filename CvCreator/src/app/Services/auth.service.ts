import { LoginResponse } from './../Models/LoginResponse';
import { LoginCreditentials } from './../Models/LoginCreditentials';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Router } from '@angular/router';
import { Endpoint } from '../Interfaces/Endpoint';

@Injectable({
  providedIn: 'root',
})
// extends DataService<any>
export class AuthService
extends DataService<LoginCreditentials>
implements Endpoint<LoginCreditentials>
{
  constructor(private http: HttpClient, private router: Router) {
    super(http, `${environment.apiUrl}/auth`);
  }

  authorize(creditentials: LoginCreditentials) {
    return this.http.post(`${environment.apiUrl}/auth`, creditentials);
  }

  public getToken(){
    return localStorage.getItem("jwt");
  }

  public isLoggedIn():  boolean{
    return this.getToken() !== null; 
  }

  public logout(){
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
  }
}
