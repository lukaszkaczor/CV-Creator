import { HttpClient } from '@angular/common/http';
import { Address } from './../Models/Address';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Endpoint } from '../Interfaces/Endpoint';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class CvAddressService
  extends DataService<Address>
  implements Endpoint<Address>
{
  constructor(_http: HttpClient) {
    super(_http, `${environment.apiUrl}/cvAddress`);
  }
}
