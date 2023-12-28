import { PersonalDataService } from './../../../Services/personal-data.service';
import { PersonalData } from './../../../Models/PersonalData';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormManager } from './../../../Utilities/FormManager';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('waitingForAction', style({
        opacity: 1,
      })),
      state('waitingForResponse', style({
        opacity: 0,
      })),
      transition('waitingForAction => waitingForResponse', [
        animate('.3s')
      ]),
      transition('waitingForResponse => waitingForAction', [
        animate('1s')
      ]),
    ]),
  ]
})
export class PersonalDataComponent
  extends FormManager<PersonalData>
  implements OnChanges, OnInit
{
  @Input() curriculumVitaeId: string;
  @Input() personalData: PersonalData;

  constructor(dataService: PersonalDataService, builder: FormBuilder) {
    super(dataService, builder);
  }

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(): void {
    // console.log(this.form);
    // this.cvId.setValue(this.curriculumVitaeId);
    this.initializeForm({
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
      birthday: ['', [Validators.required]],
      curriculumVitaeId: [this.curriculumVitaeId],
    });
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

  get birthday(): FormControl {
    return this.form.get('birthday') as FormControl;
  }
  set birthday(val) {
    this.birthday?.setValue(val);
  }
}
