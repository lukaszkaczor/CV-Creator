import { Injectable } from '@angular/core';
import { ICvDataManager } from './Interfaces/ICvDataManager';
import { TemplateService } from './TemplateService';
import { CvMarkers } from './CvMarkers';

@Injectable()
export class CvDataManager implements ICvDataManager {
  private elements: HTMLElement[] = [];
  private data: any[];
  private toInsert: any[] = [];

  public insertDataToMarkers(elements: HTMLElement[], dataToInsert: any[]): ICvDataManager {
    this.elements.push(...elements);

    this.data = dataToInsert;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (this.elementIsList(element)) {
        const ts = new TemplateService();
        const elementChildrenLength = ts.createClone(element).children.length;

        let data: any[] = this.getData('@list');

        let clone = ts.createClone(element);
        let cloneTemplate = ts.createClone(clone);

        for (let j = 0; j < data.length; j++) {
          let keys = Object.keys(data[j]);

          keys.forEach((key) => {
            const element = this.getElement(clone, key);
            element.textContent = data[j][key];
          });

          const ts = new TemplateService();
          const children = ts.getAllElements(clone);

          CvMarkers.optionalMarkers.forEach((marker) => {
            children.forEach((child) => {
              if (!this.elementContainsAttribute(child, marker)) return;
              if (child.textContent?.trim() != '') return;

              const elementToRemove = this.getParentToRemove(child);
              elementToRemove?.remove();
            });
          });

          element.appendChild(clone);
          clone.outerHTML = clone.innerHTML;

          clone = ts.createClone(cloneTemplate);
        }

        //remove template items on start
        for (let i = 0; i < elementChildrenLength; i++) {
          element.children[0].remove();
        }
      } else {
        for (let j = 0; j < this.data.length; j++) {
          let item = this.data[j];

          if (this.elementContainsAttribute(element, item.marker)) element.textContent = item.data;
        }
      }
    }

    this.toInsert.forEach((item: any) => {
      this.elements = this.insert(this.elements, item.i, item.clone);
    });

    return this;
  }

  getParentToRemove(child: HTMLElement): HTMLElement | null {
    let parent: HTMLElement = child.parentElement as HTMLElement;

    if (this.elementContainsAttribute(parent, '@pageContent')) return null;

    if (this.elementContainsAttribute(parent, '@removeIfEmpty')) return parent;

    return this.getParentToRemove(parent);
  }

  getElement(parent: HTMLElement, marker: string) {
    let ts = new TemplateService();
    let children = ts.getAllElements(parent);

    for (let i = 0; i < children.length; i++) {
      let child = children[i];

      if (this.elementContainsAttribute(child, marker)) {
        return child;
      }
    }

    throw new Error('There is no element with this marker ' + marker);
  }

  elementIsList(element: HTMLElement) {
    return this.elementContainsAttribute(element, '@list');
  }

  insert(arr: HTMLElement[], index: number, newItem: HTMLElement): HTMLElement[] {
    let ss = [...arr.slice(0, index), newItem, ...arr.slice(index)];
    return ss;
  }

  getData(marker: string) {
    let data = [];
    for (let j = 0; j < this.data.length; j++) {
      let item = this.data[j];

      item.marker == marker;
      if (item.marker == marker) {
        data.push(item.data);
        return item.data;
      }
    }

    throw new Error('There is no data with marker' + marker);
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

  private elementContainsAttribute(element: HTMLElement, name: string) {
    return element.attributes.getNamedItem(name) != null;
  }
}
