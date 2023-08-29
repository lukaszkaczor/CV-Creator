import { Injectable } from '@angular/core';
import { WorkExperience } from '../Models/WorkExperience';
import { Endpoint } from '../Interfaces/Endpoint';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class CvExperienceService 
extends DataService<WorkExperience>
implements Endpoint<WorkExperience> {

  constructor(_http: HttpClient) {
    super(_http, `${environment.apiUrl}/experience`);
  }
}
