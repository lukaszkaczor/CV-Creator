import { StatusCode } from './StatusCode';
export class DataWithStatusCode<T> {
  data?: T;
  status: StatusCode;
}
