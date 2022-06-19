import { FormGroup } from '@angular/forms';
import { FormDataManager } from '../Interfaces/FormDataManager';

export class FormManager<T> {
  protected _form: FormGroup;
  public formSubmitted = false;

  private _dataManager: FormDataManager<T>;
  // private _test: T;

  constructor(dataManager: FormDataManager<T>) {
    // this._form = form;
    this._dataManager = dataManager;
    // this._test = test;
  }

  public async submit<T>(): Promise<void> {
    // console.log(this._form.controls);
    // this.formSubmitted = true;
    // if (!this.formIsValid()) console.log(this._form.controls['email'].errors);
    if (this.formIsValid())
      console.log(await this._dataManager.save(this._form.value));
    // else console.log('error');
    // console.log(this._form.controls);
    // console.log(this._form.get('email')?.value);
    // console.log(this._form.value as T);
    // const s: T = this.form.value as T;
    // console.log(typeof s);
    // // console.log(keys);
    // this.test = this.form.value;
  }

  public get form(): FormGroup {
    return this._form;
  }
  //   public set form(v: FormGroup) {
  //     this._form = v;
  //   }

  public formIsValid(): boolean {
    return this._form.valid;
  }
}
