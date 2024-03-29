import { PersonalDataService } from './../../../Services/personal-data.service';
import { PersonalData } from './../../../Models/PersonalData';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormManager } from './../../../Utilities/FormManager';
import { Component, Input, OnChanges, OnInit } from '@angular/core';


@Component({
  selector: 'personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['../../../../Styles/forms.scss'],
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
