import { PersonalData } from './../Models/PersonalData';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from '../Interfaces/Endpoint';

@Injectable({
  providedIn: 'root',
})
export class PersonalDataService
  extends DataService<PersonalData>
  implements Endpoint<PersonalData>
{
  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.apiUrl}/personalData`);
  }
}
