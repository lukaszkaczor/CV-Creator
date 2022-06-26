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
    console.log(this.form);

    if (this.formIsValid()) {
      const result = await this._dataManager.save(this._form.value);
      console.log(result);
    }
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
