import { PersonalDataService } from './../../../Services/personal-data.service';
import { PersonalData } from './../../../Models/PersonalData';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormManager } from './../../../Utilities/FormManager';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
})
export class PersonalDataComponent
  extends FormManager<PersonalData>
  implements OnChanges, OnInit
{
  @Input() curriculumVitaeId: string;
  @Input() personalData: PersonalData;

  constructor(dataService: PersonalDataService, builder: FormBuilder) {
    super(dataService);
    this.form = builder.group({
      id: [''],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32),
        ],
      ],
      curriculumVitaeId: [''],
    });
  }

  ngOnInit(): void {
    console.log(this.form);
    this.cvId.setValue(this.curriculumVitaeId);
  }

  ngOnChanges() {
    if (!this.personalData) return;
    this.initFormData(this.personalData);
  }

  get firstName(): FormControl {
    return this.form.get('firstName') as FormControl;
  }
  set firstName(val) {
    this.firstName?.setValue(val);
  }

  get lastName(): FormControl {
    return this.form.get('lastName') as FormControl;
  }
  set lastName(val) {
    this.lastName?.setValue(val);
  }

  get cvId(): FormControl {
    return this.form.get('curriculumVitaeId') as FormControl;
  }
  set cvId(val) {
    this.cvId?.setValue(val);
  }
}
