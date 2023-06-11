import { CvMarkers } from './CvMarkers';
import { CvOutputElementType } from './CvOutputElementType';
import { IElementDataManager } from './Interfaces/IElementDataManager';
import { ITemplateService } from './Interfaces/ITemplateService';

export class ListDataManager implements IElementDataManager {
  readonly type: CvOutputElementType = CvOutputElementType.List;
  constructor(private ts: ITemplateService) {}

  insertDataToElement(element: HTMLElement, data: any[]): HTMLElement {
    const templateContent = this.ts.createClone(element.firstElementChild as HTMLElement);
    const attribute = this.getInputAttribute(element);
    const dataToInsert = this.getData(attribute, data);

    //remove template element
    element.firstElementChild?.remove();

    dataToInsert.forEach((pieceOfData: any) => {
      const contentClone = this.ts.createClone(templateContent);
      const keys = Object.keys(pieceOfData);

      keys.forEach((key) => {
        const elementToFill = this.getElement(contentClone, key);
        elementToFill.textContent = pieceOfData[key];
      });

      this.removeEmptyOptionalElements(contentClone);

      element.appendChild(contentClone);
    });

    return element;
  }

  private removeEmptyOptionalElements(element: HTMLElement): void {
    const children = this.ts.getAllElements(element);

    CvMarkers.optionalMarkers.forEach((marker) => {
      children.forEach((child: HTMLElement) => {
        if (!this.elementContainsAttribute(child, marker)) return;
        if (child.textContent?.trim() != '') return;

        const elementToRemove = this.getParentToRemove(child);
        elementToRemove?.remove();
      });
    });
  }

  private getData(marker: string, data: any[]) {
    for (let i = 0; i < data.length; i++) {
      const pieceOfData = data[i];

      if (pieceOfData.marker == marker) return pieceOfData.data;
    }

    throw new Error(`Data with marker ${marker} not found`);
  }

  private getInputAttribute(item: HTMLElement) {
    const attributes = Array.from(item.attributes);

    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];

      if (attribute.name.startsWith('@list')) return attribute.name;
    }

    throw new Error(`There is no input attribute in element ${item}`);
  }

  private getParentToRemove(child: HTMLElement): HTMLElement | null {
    let parent: HTMLElement = child.parentElement as HTMLElement;

    if (this.elementContainsAttribute(parent, '@pageContent')) return null;

    if (this.elementContainsAttribute(parent, '@removeIfEmpty')) return parent;

    return this.getParentToRemove(parent);
  }

  getElement(parent: HTMLElement, marker: string) {
    const children = this.ts.getAllElements(parent);

    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      if (this.elementContainsAttribute(child, marker)) return child;
    }

    throw new Error('There is no element with this marker ' + marker);
  }

  private elementContainsAttribute(element: HTMLElement, name: string) {
    return element.attributes.getNamedItem(name) != null;
  }
}
