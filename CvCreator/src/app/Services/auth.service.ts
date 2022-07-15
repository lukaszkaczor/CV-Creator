import { LoginResponse } from './../Models/LoginResponse';
import { LoginCreditentials } from './../Models/LoginCreditentials';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
// extends DataService<any>
export class AuthService {
  constructor(private http: HttpClient) {
    // super(http, `${environment.apiUrl}/auth`);
  }

  authorize(creditentials: LoginCreditentials) {
    return this.http.post(`${environment.apiUrl}/auth`, creditentials);
  }
}
