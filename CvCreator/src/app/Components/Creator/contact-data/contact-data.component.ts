import { ContactDataService } from './../../../Services/contact-data.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ContactData } from 'src/app/Models/ContactData';
import { FormManager } from 'src/app/Utilities/FormManager';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.scss'],
})
export class ContactDataComponent
  extends FormManager<ContactData>
  implements OnChanges, OnInit
{
  @Input() curriculumVitaeId: string;
  @Input() contactData: ContactData;
  constructor(dataService: ContactDataService, builder: FormBuilder) {
    super(dataService);

    this.form = builder.group({
      id: [''],
      email: [''],
      phoneNumber: [''],
      curriculumVitaeId: [''],
    });
  }

  ngOnInit(): void {
    console.log(this.form);
    this.cvId.setValue(this.curriculumVitaeId);
  }

  ngOnChanges() {
    if (!this.contactData) return;
    this.initFormData(this.contactData);
  }

  get cvId(): FormControl {
    return this.form.get('curriculumVitaeId') as FormControl;
  }
  set cvId(val) {
    this.cvId?.setValue(val);
  }
}
