import { ContactDataService } from './../../../Services/contact-data.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ContactData } from 'src/app/Models/ContactData';
import { FormManager } from 'src/app/Utilities/FormManager';
import { FormBuilder, Validators } from '@angular/forms';

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
    super(dataService, builder);
  }

  ngOnInit(): void {
    this.initializeForm({
      id: [''],
      email: [''],
      phoneNumber: [''],
      curriculumVitaeId: [this.curriculumVitaeId],
    });
  }

  ngOnChanges() {
    if (!this.contactData) return;
    this.initFormData(this.contactData);
  }
}
