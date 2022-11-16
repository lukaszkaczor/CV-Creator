import { CurriculumVitaeId } from './../Interfaces/CurriculumVitaeId';
import { HttpErrorResponse } from '@angular/common/http';
import { StatusCode } from './../Models/StatusCode';
import { Identity } from './../Interfaces/Identity';
import { DataStatus } from './DataStatus';
import { Endpoint } from '../Interfaces/Endpoint';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

export class FormManager<T> {
  private _form: FormGroup;
  private _dataManager: Endpoint<T>;
  private _dataStatus: DataStatus = DataStatus.DoesntExists;
  private _itemIdentifier: string;
  private _responseStatus: StatusCode;
  public formSubmitted = false;

  constructor(dataManager: Endpoint<T>, private _formBuilder: FormBuilder) {
    this._dataManager = dataManager;
  }

  initializeForm(data: CurriculumVitaeId) {
    this._form = this._formBuilder.group(data);
  }

  initFormData(data: T) {
    if (data == null) {
      this._dataStatus = DataStatus.DoesntExists;
      return;
    }

    this._form.setValue(data);
    this._itemIdentifier = this.getItemIdentifier(data);
    this._dataStatus = DataStatus.Exists;
  }

  public async submit() {
    this.formSubmitted = true;

    if (!this.formIsValid()) return;

    await this.runDataAction();
    this.setDataStatus();

    if (this._responseStatus == StatusCode.Ok) this.formSubmitted = false;
  }

  private async runDataAction() {
    switch (this._dataStatus) {
      case DataStatus.Exists:
        this._responseStatus = await this.updateData();
        break;

      case DataStatus.DoesntExists:
        this._responseStatus = await this.createAndSetValuesToForm();
        break;

      case DataStatus.ServerError:
        console.log('server error');
        break;

      default:
        console.log('default');
        break;
    }
  }

  private setDataStatus(): void {
    switch (this._responseStatus) {
      case StatusCode.Ok:
        this._dataStatus = DataStatus.Exists;
        break;

      default:
        console.log('An error ocurred: ' + this._responseStatus);
        break;
    }
  }

  private createAndSetValuesToForm(): Promise<any> {
    return new Promise<any>((resolve, rejects) => {
      this._dataManager.post(this.form.value).subscribe({
        next: (data) => {
          this._itemIdentifier = this.getItemIdentifier(data);
          this._form.setValue(data as any);
          resolve(StatusCode.Ok);
        },
        error: (error: HttpErrorResponse) => resolve(error.status),
      });
    });
  }

  private updateData(): Promise<StatusCode> {
    return new Promise<StatusCode>((resolve, reject) => {
      this._dataManager.put(this._itemIdentifier, this.form.value).subscribe({
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

  //set to private
  public set form(data: FormGroup) {
    if (this._form == null) this._form = data;
  }

  public formIsValid(): boolean {
    return this._form.valid;
  }

  get cvId(): FormControl {
    return this.form.get('curriculumVitaeId') as FormControl;
  }
  set cvId(val) {
    this.cvId?.setValue(val);
  }
}
