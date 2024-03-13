import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
  styleUrls: ['../../../../Styles/forms.scss'],
})
export class AddressComponent
  extends FormManager<Address>
  implements OnChanges, OnInit
{
  @Input() curriculumVitaeId: string;
  @Input() CVaddress: Address;

  constructor(dataService: CvAddressService, builder: FormBuilder) {
    super(dataService, builder);
  }
  ngOnInit(): void {
    this.initializeForm({
      id: [''],
      town: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32),
      ],],
      zipCode: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
      ],],
      address: ['',        [
        Validators.maxLength(32),
      ],],
      houseNumber: ['',         [
        Validators.maxLength(10),
      ],],
      curriculumVitaeId: [this.curriculumVitaeId],
    });
  }

  ngOnChanges() {
    if (!this.CVaddress) return;
    this.initFormData(this.CVaddress);
  }

  get town(): FormControl {
    return this.form.get('town') as FormControl;
  }
  set town(val) {
    this.town?.setValue(val);
  }

  get zipCode(): FormControl {
    return this.form.get('zipCode') as FormControl;
  }
  set zipCode(val) {
    this.zipCode?.setValue(val);
  }

  get address(): FormControl {
    return this.form.get('address') as FormControl;
  }
  set address(val) {
    this.address?.setValue(val);
  }

  get houseNumber(): FormControl {
    return this.form.get('houseNumber') as FormControl;
  }
  set houseNumber(val) {
    this.houseNumber?.setValue(val);
  }
}
