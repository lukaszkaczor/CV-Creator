import { FormGroup } from '@angular/forms';
import { FormDataManager } from '../Interfaces/FormDataManager';

export class FormManager<T> {
  protected _form: FormGroup;
  public formSubmitted = false;
  public response: any;

  private _dataManager: FormDataManager<T>;

  constructor(dataManager: FormDataManager<T>) {
    this._dataManager = dataManager;
  }

  public async submit<T>(): Promise<void> {
    // console.log(this.form);

    if (this.formIsValid()) {
      this.response = await this._dataManager.save(this._form.value);
      console.log(this.response);
    }
  }

  public get form(): FormGroup {
    return this._form;
  }

  public formIsValid(): boolean {
    return this._form.valid;
  }
}
