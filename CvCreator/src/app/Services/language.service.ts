import { Injectable } from '@angular/core';
import { Language } from '../Models/Language';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from '../Interfaces/Endpoint';
import { environment } from '../environment';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService 
  extends DataService<Language>
  implements Endpoint<Language>
{
  constructor(_http: HttpClient) {
    super(_http, `${environment.apiUrl}/language`);
  }
}
