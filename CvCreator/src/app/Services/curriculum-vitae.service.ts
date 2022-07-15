import { CrudService } from './../Interfaces/CrudService';
import { CurriculumVitae } from './../Models/CurriculumVitae';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Endpoint } from '../Interfaces/Endpoint';

@Injectable({
  providedIn: 'root',
})
export class CurriculumVitaeService
  extends DataService<CurriculumVitae>
  implements Endpoint<CurriculumVitae>
{
  constructor(protected override _http: HttpClient) {
    // super(_http);
    super(_http, `${environment.apiUrl}/cv`);
  }
}
