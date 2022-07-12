import { PersonalData } from './../../../Models/PersonalData';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormApiManager } from './../../../Utilities/FormApiManager';
import { FormManager } from './../../../Utilities/FormManager';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
})
export class PersonalDataComponent
  extends FormManager<PersonalData>
  implements OnInit
{
  // cvId = 1;

  constructor(http: HttpClient, builder: FormBuilder) {
    super(new FormApiManager(http, 'https://localhost:7184/CvPersonalData'));
    this._form = builder.group({
      firstName: ['', [Validators.minLength(2)]],
      lastName: ['', [Validators.minLength(2)]],
      cvIdentifier: [1],
    });
  }

  ngOnInit(): void {}

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
}
