import { Injectable } from '@angular/core';
import { Education } from '../Models/Education';
import { DataService } from './data.service';
import { Endpoint } from '../Interfaces/Endpoint';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class EducationService 
  extends DataService<Education>
  implements Endpoint<Education>
{
  constructor(_http: HttpClient) {
    super(_http, `${environment.apiUrl}/education`);
  }
}
