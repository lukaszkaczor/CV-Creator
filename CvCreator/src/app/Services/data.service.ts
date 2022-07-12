import { StatusCode } from './../Models/StatusCode';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export class DataService<T> {
  constructor(protected _http: HttpClient, protected _endpoint: string) {}

  getAll(): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      this._http.get<T[]>(this._endpoint).subscribe({
        next: (response) => resolve(response),
        error: (error) => resolve(error),
      });
    });
  }

  get(id: string | number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this._http.get<T>(`${this._endpoint}/${id}`).subscribe({
        next: (response) => resolve(response),
        error: (error) => resolve(error),
      });
    });
  }

  post(item?: T): Promise<T> {
    return new Promise<T>((resolve, rejects) =>
      this._http.post<T>(this._endpoint, item).subscribe({
        next: (response) => resolve(response),
        error: (error) => resolve(error),
      })
    );
  }

  put(id: string | number, item: any): Promise<T> {
    return new Promise<T>((resolve, rejects) =>
      this._http.put<T>(`${this._endpoint}/${id}`, item).subscribe({
        next: (response) => resolve(response),
        error: (error) => resolve(error),
      })
    );
  }

  delete(id: string | number): Promise<any> {
    return new Promise<any>((resolve, rejects) =>
      this._http.delete<T>(`${this._endpoint}/${id}`).subscribe({
        next: () => resolve(StatusCode.NoContent),
        error: (error: HttpErrorResponse) => resolve(error.status),
      })
    );
  }
}
