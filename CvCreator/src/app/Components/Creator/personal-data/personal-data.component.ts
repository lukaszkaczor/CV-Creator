import { PersonalDataService } from './../../../Services/personal-data.service';
import { PersonalData } from './../../../Models/PersonalData';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormManager } from './../../../Utilities/FormManager';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
})
// extends FormManager<PersonalData>
export class PersonalDataComponent
  extends FormManager<PersonalData>
  implements OnInit
{
  @Input() curriculumVitaeId: string;

  constructor(data: PersonalDataService, builder: FormBuilder) {
    super(data);
    this._form = builder.group({
      id: [''],
      firstName: ['', [Validators.minLength(2)]],
      lastName: ['', [Validators.minLength(2)]],
      curriculumVitaeId: [''],
    });
  }

  ngOnInit(): void {
    this.cvId.setValue(this.curriculumVitaeId);
    this.initFormData(this.curriculumVitaeId);
  }

  get firstName(): FormControl {
    return this._form.get('firstName') as FormControl;
  }
  set firstName(val) {
    this.firstName?.setValue(val);
  }

  get lastName(): FormControl {
    return this._form.get('lastName') as FormControl;
  }
  set lastName(val) {
    this.lastName?.setValue(val);
  }

  get cvId(): FormControl {
    return this._form.get('curriculumVitaeId') as FormControl;
  }
  set cvId(val) {
    this.cvId?.setValue(val);
  }
}
