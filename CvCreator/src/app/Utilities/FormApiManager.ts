import { HttpClient } from '@angular/common/http';
import { FormDataManager } from './../Interfaces/FormDataManager';
export class FormApiManager<T> implements FormDataManager<T> {
  constructor(private http: HttpClient) {}

  get(id: number): Promise<T> {
    throw new Error('Method not implemented.');
  }
  save(data: T): Promise<T> {
    return new Promise((resolve, rejects) => {
      this.http
        .post('https://localhost:7184/auth', data, {
          responseType: 'text',
        })
        .subscribe((data) => {
          resolve(JSON.parse(data));
        });
    });

    // return new Promise((resolve, rejects) => {
    //   resolve('asdasdasd' as T);
    // });
    throw new Error('Method not implemented.');
  }
  update(id: number, data: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  delete(data: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
