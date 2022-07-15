import { CrudService } from './CrudService';

export interface Endpoint<T> extends CrudService<T> {}
