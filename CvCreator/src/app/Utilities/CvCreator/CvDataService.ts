import { Injectable } from '@angular/core';
import { ICvDataManager as ICvDataService } from './Interfaces/ICvDataService';
import { TemplateService } from './TemplateService';
import { CvMarkers } from './CvMarkers';
import { ListDataManager } from './ListDataManager';
import { SingleElementDataManager } from './SingleElementDataManager';
import { IElementDataManager } from './Interfaces/IElementDataManager';
import { CvOutputElementType } from './CvOutputElementType';

@Injectable()
export class CvDataService implements ICvDataService {
  private elements: HTMLElement[] = [];

  public insertDataToElements(elements: HTMLElement[], dataToInsert: any[]): HTMLElement[] {
    this.elements.push(...elements);

    elements.forEach((element) => {
      let dataManager = this.getAction(element);
      dataManager.insertDataToElement(element, dataToInsert);
    });

    return this.merge();
  }

  private getAction(element: HTMLElement) {
    let dataManager: IElementDataManager;
    switch (this.getElementType(element)) {
      case CvOutputElementType.SingleElement:
        dataManager = new SingleElementDataManager();
        break;
      case CvOutputElementType.List:
        dataManager = new ListDataManager(new TemplateService());
        break;

      default:
        // dataManager = new DefaultDataManager();
        dataManager = new SingleElementDataManager();

        break;
    }

    return dataManager;
  }

  private getElementType(item: HTMLElement): CvOutputElementType {
    const attributes = item.attributes;

    let type = CvOutputElementType.None;

    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];

      // console.log(this.attributeIsInList(attribute.name));

      if (attribute.name.startsWith('@list')) {
        type = CvOutputElementType.List;
        break;
      } else if (this.attributeIsInList(attribute.name)) {
        type = CvOutputElementType.SingleElement;
        break;
      }
    }

    return type;
  }

  private attributeIsInList(attribute: string): boolean {
    return CvMarkers.inputMarkers.some((marker) =>
      marker.toLowerCase().includes(attribute.toLowerCase())
    );
  }

  public merge() {
    let mergedElements: HTMLElement[] = [];

    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];

      if (this.parentHasAttribute(element, '@pageContent')) mergedElements.push(element);
    }
    return mergedElements;
  }

  private parentHasAttribute(element: HTMLElement, attribute: string): boolean {
    return element.parentElement?.hasAttribute(attribute) as boolean;
  }
}
