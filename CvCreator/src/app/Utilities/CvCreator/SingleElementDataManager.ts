import { CvOutputElementType } from './CvOutputElementType';
import { IElementDataManager } from './Interfaces/IElementDataManager';

export class SingleElementDataManager implements IElementDataManager {
  readonly type: CvOutputElementType = CvOutputElementType.SingleElement;

  insertDataToElement(element: HTMLElement, data: any[]): HTMLElement {
    for (let j = 0; j < data.length; j++) {
      const item = data[j];

      if (this.elementContainsAttribute(element, item.marker)) element.textContent = item.data;
    }
    return element;
  }

  private elementContainsAttribute(element: HTMLElement, name: string) {
    return element.attributes.getNamedItem(name) != null;
  }
}
