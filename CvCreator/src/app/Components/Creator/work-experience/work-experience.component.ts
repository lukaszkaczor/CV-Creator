import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WorkExperience } from 'src/app/Models/WorkExperience';
import { CvAddressService } from 'src/app/Services/cv-address.service';
import { CvExperienceService } from 'src/app/Services/cv-experience.service';
import { FormManager } from 'src/app/Utilities/FormManager';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent
extends FormManager<WorkExperience>
implements OnInit, OnChanges {

  @Input() curriculumVitaeId: string;
  @Input() experience: WorkExperience;

  constructor(service: CvExperienceService ,builder: FormBuilder) {
    super(service, builder)
   }

  //  id: string;
  //  name: string;
  //  companyName: string;
  //  city: string;
  //  startDate: Date;
  //  endDate: Date;
  //  stillEmployed: boolean;
  //  description: string;
  //  curriculumVitaeId: string;

  ngOnInit(): void {
    this.initializeForm({
      id: [''],
      name: [''],
      companyName: [''],
      city: [''],
      startDate: [''],
      endDate: [''],
      stillEmployed: [''],
      description: [''],
      curriculumVitaeId: [this.curriculumVitaeId],
    });
  }


  ngOnChanges() {
    if (!this.experience) return;
    this.initFormData(this.experience);
  }
}
