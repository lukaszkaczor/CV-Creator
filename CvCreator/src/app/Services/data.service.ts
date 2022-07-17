import { CrudService } from './../Interfaces/CrudService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class DataService<T> implements CrudService<T> {
  constructor(protected _http: HttpClient, protected _endpoint: string) {}

  getAll(): Observable<T[]> {
    return this._http.get<T[]>(this._endpoint);
  }

  get(id: string | number): Observable<T> {
    return this._http.get<T>(`${this._endpoint}/${id}`);
  }

  post(item?: T): Observable<T> {
    return this._http.post<T>(this._endpoint, item);
  }

  put(id: string | number, item: any): Observable<T> {
    return this._http.put<T>(`${this._endpoint}/${id}`, item);
  }

  delete(id: string | number): Observable<any> {
    return this._http.delete<T>(`${this._endpoint}/${id}`);
  }
}
