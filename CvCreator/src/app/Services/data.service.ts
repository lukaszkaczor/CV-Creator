import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService<T> {
  constructor(private _http: HttpClient) {}
  endpoint = 'https://localhost:7184/cv';

  getAll(): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      this._http.get<T[]>(this.endpoint).subscribe((data) => {
        resolve(data);
      });
    });
  }

  get(id: string | number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this._http.get<T>(this.endpoint + '/' + id).subscribe((data) => {
        resolve(data);
      });
    });
  }

  post(item?: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this._http.post<T>(this.endpoint, item).subscribe((data) => {
        resolve(data);
      });
    });
  }

  put(id: string | number, item: T | any): Promise<T> {
    return new Promise<T>((resolve, rejects) => {
      this._http.put<T>(this.endpoint + '/' + id, item).subscribe((data) => {
        resolve(data);
      });
    });
  }

  delete(id: string | number): Promise<any> {
    return new Promise<any>((resolve, rejects) => {
      this._http.delete<T>(this.endpoint + '/' + id).subscribe({
        next: (data) => {
          // console.log(data);
          // console.log('success');
          resolve(data);
        },
        error: (error) => {
          console.log(error.status);
        },
      });
    });
  }
}
