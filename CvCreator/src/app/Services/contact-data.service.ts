import { ContactData } from './../Models/ContactData';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Endpoint } from '../Interfaces/Endpoint';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactDataService
  extends DataService<ContactData>
  implements Endpoint<ContactData>
{
  constructor(_http: HttpClient) {
    super(_http, `${environment.apiUrl}/contactData`);
  }
}
