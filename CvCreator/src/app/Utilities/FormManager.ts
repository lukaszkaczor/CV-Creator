import { HttpErrorResponse } from '@angular/common/http';
import { StatusCode } from './../Models/StatusCode';
import { Identity } from './../Interfaces/Identity';
import { DataStatus } from './DataStatus';
import { Endpoint } from '../Interfaces/Endpoint';
import { FormGroup } from '@angular/forms';

export class FormManager<T> {
  private _dataStatus: DataStatus = DataStatus.None;
  protected _form: FormGroup;
  public formSubmitted = false;
  itemIdentifier: string;

  private _dataManager: Endpoint<T>;

  constructor(dataManager: Endpoint<T>) {
    this._dataManager = dataManager;
  }

  initFormData(id: string) {
    this._dataManager.get(id).subscribe({
      next: (data) => {
        if (data == null) {
          this._dataStatus = DataStatus.DoesntExists;
          return;
        }
        this.itemIdentifier = this.getItemIdentifier(data);

        this.form.setValue(data);
        this._dataStatus = DataStatus.Exists;
      },
      error: () => (this._dataStatus = DataStatus.ServerError),
    });
  }

  public async submit<T>() {
    this.formSubmitted = true;
    console.log(this.form.value);

    if (!this.formIsValid) return;

    switch (this._dataStatus) {
      case DataStatus.Exists:
        console.log(this.form.value);
        const updateResult = await this.update();
        if (updateResult != StatusCode.Ok) {
          this.formSubmitted = false;
          console.log('Something is wrong.');
        }
        break;

      case DataStatus.DoesntExists:
        const createResult = await this.create();
        if (createResult == StatusCode.Ok) {
          this._dataStatus = DataStatus.Exists;
          this.formSubmitted = false;
        }
        break;

      case DataStatus.ServerError:
        console.log('server error');
        break;

      default:
        console.log('default');
        break;
    }
  }

  private create(): Promise<StatusCode> {
    return new Promise<StatusCode>((resolve, rejects) => {
      this._dataManager.post(this.form.value).subscribe({
        next: (data) => {
          console.log(data);
          resolve(StatusCode.Ok);
          this.itemIdentifier = this.getItemIdentifier(data);
        },
        error: (error: HttpErrorResponse) => resolve(error.status),
      });
    });
  }

  private update(): Promise<StatusCode> {
    return new Promise<StatusCode>((resolve, reject) => {
      this._dataManager.put(this.itemIdentifier, this.form.value).subscribe({
        next: () => resolve(StatusCode.Ok),
        error: (error: HttpErrorResponse) => resolve(error.status),
      });
    });
  }

  private getItemIdentifier(data: T) {
    return (data as unknown as Identity).id;
  }

  public get form(): FormGroup {
    return this._form;
  }

  public formIsValid(): boolean {
    return this._form.valid;
  }
}
