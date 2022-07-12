import { CurriculumVitae } from './../Models/CurriculumVitae';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class CurriculumVitaeService extends DataService<CurriculumVitae> {
  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.apiUrl}/cv`);
  }
}
