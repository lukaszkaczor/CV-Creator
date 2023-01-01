import { Inject, Injectable } from '@angular/core';
import { ITemplateService } from './Interfaces/ITemplateService';

export class TemplateService implements ITemplateService {
  getAllElements(template: HTMLElement): HTMLElement[] {
    let elementCollection = template.getElementsByTagName('*');
    let arr: HTMLElement[] = [];
    for (let i = 0; i < elementCollection.length; i++)
      arr.push(elementCollection[i] as HTMLElement);

    return arr;
    // return template.getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
  }

  getFirstPage(element: HTMLElement): HTMLElement {
    let allElements = this.getAllElements(element);

    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];

      if (element.hasAttribute('@firstPage')) {
        // console.log('ddd');
        return element;
      }
    }

    return element;
  }
  getSecondPage(element: HTMLElement): HTMLElement {
    let allElements = this.getAllElements(element);

    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];

      if (element.hasAttribute('@secondPage')) {
        return element;
      }
    }

    return element;
  }
  getLastPage(element: HTMLElement): HTMLElement {
    let allElements = this.getAllElements(element);

    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];

      if (element.hasAttribute('@lastPage')) {
        return element;
      }
    }

    return element;
  }

  getPageContent(page: HTMLElement): HTMLElement {
    let elements = page.getElementsByTagName('*');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.hasAttribute('@pageContent')) return element as HTMLElement;
    }
    //FIX
    return page;
  }

  createClone(item: HTMLElement): HTMLElement {
    return item.cloneNode(true) as HTMLElement;
  }
}
