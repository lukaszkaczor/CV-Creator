import { ContactDataService } from './../../../Services/contact-data.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ContactData } from 'src/app/Models/ContactData';
import { FormManager } from 'src/app/Utilities/FormManager';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['../../../../Styles/forms.scss'],

})
export class ContactDataComponent
  extends FormManager<ContactData>
  implements OnChanges, OnInit
{
  @Input() curriculumVitaeId: string;
  @Input() contactData: ContactData;
  constructor(dataService: ContactDataService, builder: FormBuilder) {
    super(dataService, builder);
  }

  ngOnInit(): void {
    this.initializeForm({
      id: [''],
      email: ['', [Validators.email, Validators.required, Validators.maxLength(32)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(12)]],
      curriculumVitaeId: [this.curriculumVitaeId],
    });
  }

  ss(){
    console.log(this.form)
  }

  ngOnChanges() {
    if (!this.contactData) return;
    this.initFormData(this.contactData);
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  set email(val) {
    this.email?.setValue(val);
  }

  get phoneNumber(): FormControl {
    return this.form.get('phoneNumber') as FormControl;
  }
  set phoneNumber(val) {
    this.phoneNumber?.setValue(val);
  }
}
