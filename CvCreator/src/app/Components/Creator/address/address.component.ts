import { FormBuilder, FormControl } from '@angular/forms';
import { CvAddressService } from './../../../Services/cv-address.service';
import { Address } from './../../../Models/Address';
import { FormManager } from './../../../Utilities/FormManager';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'cv-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent
  extends FormManager<Address>
  implements OnChanges, OnInit
{
  @Input() curriculumVitaeId: string;
  @Input() address: Address;

  constructor(dataService: CvAddressService, builder: FormBuilder) {
    super(dataService, builder);
  }
  ngOnInit(): void {
    // console.log(this.form);
    // this.cvId.setValue(this.curriculumVitaeId);
    this.initializeForm({
      id: [''],
      town: [''],
      zipCode: [''],
      address: [''],
      houseNumber: [''],
      curriculumVitaeId: [this.curriculumVitaeId],
    });
  }

  ngOnChanges() {
    if (!this.address) return;
    this.initFormData(this.address);
  }
}
