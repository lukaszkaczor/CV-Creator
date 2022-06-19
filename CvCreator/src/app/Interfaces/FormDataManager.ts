export interface FormDataManager<T> {
  get(id: number): Promise<T>;
  save(data: T): Promise<T>;
  update(id: number, data: T): Promise<T>;
  delete(data: T): Promise<T>;
}
