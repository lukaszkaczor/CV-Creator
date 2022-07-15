import { CrudService } from './../Interfaces/CrudService';
import { StatusCode } from './../Models/StatusCode';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
export class DataService<T> implements CrudService<T> {
  constructor(protected _http: HttpClient, protected _endpoint: string) {}

  // getAll(): Promise<T[]> {
  //   return new Promise<T[]>((resolve, reject) => {
  //     this._http.get<T[]>(this._endpoint).subscribe({
  //       next: (response) => resolve(response),
  //       error: (error) => resolve(error),
  //     });
  //   });
  // }

  getAll(): Observable<T[]> {
    return this._http.get<T[]>(this._endpoint);
  }

  get(id: string | number): Observable<T> {
    return this._http.get<T>(`${this._endpoint}/${id}`);
  }

  // get(id: string | number) {
  //   // return this._http
  //   //   .get<T>(`${this._endpoint}/${id}`)
  //   //   .pipe(map((result) => new this.tConstructor(result)));

  //   return new Promise<T>((resolve, reject) => {
  //     this._http.get<T>(`${this._endpoint}/${id}`).subscribe({
  //       next: (response) => resolve(response),
  //       error: (error) => resolve(error),
  //     });
  //   });
  // }

  // post(item?: T): Promise<T> {
  //   return new Promise<T>((resolve, rejects) =>
  //     this._http.post<T>(this._endpoint, item).subscribe({
  //       next: (response) => resolve(response),
  //       error: (error) => resolve(error),
  //     })
  //   );
  // }
  post(item?: T): Observable<T> {
    return this._http.post<T>(this._endpoint, item);
  }

  put(id: string | number, item: any): Observable<T> {
    return this._http.put<T>(`${this._endpoint}/${id}`, item);
  }

  // put(id: string | number, item: any): Promise<T> {
  //   return new Promise<T>((resolve, rejects) =>
  //     this._http.put<T>(`${this._endpoint}/${id}`, item).subscribe({
  //       next: (response) => resolve(response),
  //       error: (error) => resolve(error),
  //     })
  //   );
  // }

  delete(id: string | number): Observable<any> {
    return this._http.delete<T>(`${this._endpoint}/${id}`);
  }
  // delete(id: string | number): Promise<any> {
  //   return new Promise<any>((resolve, rejects) =>
  //     this._http.delete<T>(`${this._endpoint}/${id}`).subscribe({
  //       next: () => resolve(StatusCode.NoContent),
  //       error: (error: HttpErrorResponse) => resolve(error.status),
  //     })
  //   );
  // }
}
