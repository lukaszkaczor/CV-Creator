import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { WorkExperience } from 'src/app/Models/WorkExperience';
import { CvAddressService } from 'src/app/Services/cv-address.service';
import { CvExperienceService } from 'src/app/Services/cv-experience.service';
import { FormManager } from 'src/app/Utilities/FormManager';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['../../../../Styles/forms.scss'],
})
export class WorkExperienceComponent
extends FormManager<WorkExperience>
implements OnInit, OnChanges {

  @Input() curriculumVitaeId: string;
  @Input() experience: WorkExperience[];

  constructor(service: CvExperienceService ,builder: FormBuilder) {
    super(service, builder)
  }


  ngOnInit(): void {
    this.initializeForm({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      companyName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      startDate: ['', [Validators.required]],
      endDate: [''],
      stillEmployed: [''],
      description: ['',  [Validators.maxLength(128)]],
      curriculumVitaeId: [this.curriculumVitaeId],
    });
  }


  ngOnChanges() {
    if (!this.experience) return;
    // this.initFormData(this.experience);
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  set name(val) {
    this.name?.setValue(val);
  }

  get companyName(): FormControl {
    return this.form.get('companyName') as FormControl;
  }
  set companyName(val) {
    this.companyName?.setValue(val);
  }

  get city(): FormControl {
    return this.form.get('city') as FormControl;
  }
  set city(val) {
    this.city?.setValue(val);
  }

  get startDate(): FormControl {
    return this.form.get('startDate') as FormControl;
  }
  set startDate(val) {
    this.startDate?.setValue(val);
  }

  get endDate(): FormControl {
    return this.form.get('endDate') as FormControl;
  }
  set endDate(val) {
    this.endDate?.setValue(val);
  }

  get stillEmployed(): FormControl {
    return this.form.get('stillEmployed') as FormControl;
  }
  set stillEmployed(val) {
    this.stillEmployed?.setValue(val);
  }

  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }
  set description(val) {
    this.description?.setValue(val);
  }
}
