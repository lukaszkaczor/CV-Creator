import { Observable } from 'rxjs';
export interface CrudService<T> {
  getAll(): Observable<T[]>;
  get(id: string | number): Observable<T>;
  post(item?: T): Observable<T>;
  put(id: string | number, item: any): Observable<T>;
  delete(id: string | number): Observable<any>;
}
