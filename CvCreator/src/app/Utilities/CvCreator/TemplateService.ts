import { Injectable } from '@angular/core';
import { ITemplateService } from './Interfaces/ITemplateService';

@Injectable()
export class TemplateService implements ITemplateService {
  getAllElements(template: HTMLElement): HTMLElement[] {
    return Array.from(template.getElementsByTagName('*')) as HTMLElement[];
  }

  getFirstPage(element: HTMLElement): HTMLElement {
    return this.findElementWithAttribute(element, '@firstPage');
  }

  getSecondPage(element: HTMLElement): HTMLElement {
    return this.findElementWithAttribute(element, '@secondPage');
  }

  getPageContent(page: HTMLElement): HTMLElement {
    return this.findElementWithAttribute(page, '@pageContent');
  }

  createClone(item: HTMLElement): HTMLElement {
    return item.cloneNode(true) as HTMLElement;
  }

  contentHeightHigherThanPageHeight(page: HTMLElement) {
    const content = this.getPageContent(page);
    return content.offsetHeight > page.offsetHeight;
  }

  contentHeightLowerThanPageHeight(page: HTMLElement) {
    const content = this.getPageContent(page);
    return content.offsetHeight < page.offsetHeight;
  }

  private findElementWithAttribute(element: HTMLElement, attribute: string): HTMLElement {
    const list = this.getAllElements(element);

    for (let i = 0; i < list.length; i++) if (list[i].hasAttribute(attribute)) return list[i];

    throw new Error(`Cannot find attribute: ${attribute} in given element.`);
  }
}
