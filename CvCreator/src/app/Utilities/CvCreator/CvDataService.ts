import { Injectable } from '@angular/core';
import { ICvDataManager as ICvDataService } from './Interfaces/ICvDataService';
import { TemplateService } from './TemplateService';
import { CvMarkers } from './CvMarkers';
import { ListDataManager } from './ListDataManager';
import { SingleElementDataManager } from './SingleElementDataManager';
import { IElementDataManager } from './Interfaces/IElementDataManager';
import { CvOutputElementType } from './CvOutputElementType';
import { DefaultDataManager } from './DefaultDataManager';

@Injectable()
export class CvDataService implements ICvDataService {
  private elements: HTMLElement[] = [];

  public insertDataToMarkers(elements: HTMLElement[], dataToInsert: any[]): HTMLElement[] {
    this.elements.push(...elements);

    elements.forEach((element) => {
      // console.log(element);
      // console.log(this.getElementType(element));
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
        dataManager = new ListDataManager();
        break;

      default:
        dataManager = new DefaultDataManager();
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

  // public insertDataToMarkers(elements: HTMLElement[], dataToInsert: any[]): HTMLElement[] {
  //   this.elements.push(...elements);

  //   this.data = dataToInsert;
  //   for (let i = 0; i < elements.length; i++) {
  //     const element = elements[i];

  //     const elementType: CvOutputElementType = this.getElementType(element);

  //     console.log(elementType, element);

  //     switch (elementType) {
  //       case CvOutputElementType.SingleElement:
  //         this.dm = new SingleElementDataManager();
  //         break;

  //       case CvOutputElementType.List:
  //         this.dm = new ListDataManager();
  //         break;
  //     }

  //     this.dm.insertData(element, dataToInsert);
  //   }

  //   return this.merge();
  // }

  // itemIsList(item: HTMLElement) {
  //   const attributes = Array.from(item.attributes);

  //   let isList = false;
  //   let att = '';

  //   attributes.forEach((attribute) => {
  //     // console.log(attribute.name.startsWith('@list'));

  //     if (attribute.name.startsWith('@list')) {
  //       // console.log(attribute);
  //       isList = true;
  //       att = attribute.name;
  //     }
  //   });

  //   return isList;
  // }

  // getParentToRemove(child: HTMLElement): HTMLElement | null {
  //   let parent: HTMLElement = child.parentElement as HTMLElement;

  //   if (this.elementContainsAttribute(parent, '@pageContent')) return null;

  //   if (this.elementContainsAttribute(parent, '@removeIfEmpty')) return parent;

  //   return this.getParentToRemove(parent);
  // }

  // getElement(parent: HTMLElement, marker: string) {
  //   let ts = new TemplateService();
  //   let children = ts.getAllElements(parent);

  //   for (let i = 0; i < children.length; i++) {
  //     let child = children[i];

  //     if (this.elementContainsAttribute(child, marker)) {
  //       return child;
  //     }
  //   }

  //   throw new Error('There is no element with this marker ' + marker);
  // }

  // elementIsList(element: HTMLElement) {
  //   return this.elementContainsAttribute(element, '@list');
  // }

  // insert(arr: HTMLElement[], index: number, newItem: HTMLElement): HTMLElement[] {
  //   let ss = [...arr.slice(0, index), newItem, ...arr.slice(index)];
  //   return ss;
  // }

  // getData(marker: string) {
  //   let data = [];
  //   for (let j = 0; j < this.data.length; j++) {
  //     let item = this.data[j];

  //     item.marker == marker;
  //     if (item.marker == marker) {
  //       data.push(item.data);
  //       return item.data;
  //     }
  //   }

  //   throw new Error('There is no data with marker' + marker);
  // }

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

  // private elementContainsAttribute(element: HTMLElement, name: string) {
  //   return element.attributes.getNamedItem(name) != null;
  // }
}
