import { HttpClient } from '@angular/common/http';

import { FormDataManager } from './../Interfaces/FormDataManager';
export class FormApiManager<T> implements FormDataManager<T> {
  constructor(private http: HttpClient, private enpoint: string) {}

  get(id: number): Promise<T> {
    throw new Error('Method not implemented.');
  }
  save(data: T): Promise<T> {
    return new Promise((resolve, rejects) => {
      this.http
        .post(this.enpoint, data, { responseType: 'json' })
        .subscribe((response) => {
          resolve(response as T);
        });
    });
  }
  update(id: number, data: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  delete(data: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
