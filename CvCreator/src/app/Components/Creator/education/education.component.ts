import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import { Education } from 'src/app/Models/Education';
import { EducationService } from 'src/app/Services/education.service';
import { FormManager } from 'src/app/Utilities/FormManager';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent
extends FormManager<Education>
implements OnInit, OnChanges {

  @Input() curriculumVitaeId: string;
  @Input() education: Education[];

  constructor(service: EducationService, builder: FormBuilder) {
    super(service, builder);
  }


  ngOnInit(): void {
    this.initializeForm({
      id: [''],
      schoolName: [''],
      degree: [''],
      specialization: [''],
      startDate: [''],
      endDate: [''],
      stillStudying: [''],
      description: [''],
      curriculumVitaeId: [this.curriculumVitaeId],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.education) return;
    // this.initFormData(this.education);
  }
}
