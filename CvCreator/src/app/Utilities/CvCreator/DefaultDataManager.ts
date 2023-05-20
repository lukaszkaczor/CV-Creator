import { IElementDataManager } from './Interfaces/IElementDataManager';

export class DefaultDataManager implements IElementDataManager {
  insertDataToElement(element: HTMLElement, data: any[]): HTMLElement {
    return element;
  }
}
