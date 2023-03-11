import { Injectable } from '@angular/core';
import { ICvDataManager } from './Interfaces/ICvDataManager';
import { TemplateEditor } from './TemplateEditor';
import { TemplateService } from './TemplateService';

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

        // console.log(clone);

        let cloneTemplate = ts.createClone(clone);

        for (let j = 0; j < data.length; j++) {
          let keys = Object.keys(data[j]);

          keys.forEach((key) => {
            let dd = this.getElement(clone, key);
            dd.textContent = data[j][key];
          });

          console.log(clone);

          let ss = clone.getElementsByTagName('h2');
          //jesli sa puste, usun rodzica ze znacznikiem
          if (ss[0].textContent?.trim() == '') {
            let sd = this.getElement(clone, '@removeIfEmpty');
            sd.remove();
          }

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

  getElement(parent: HTMLElement, marker: string) {
    let ts = new TemplateService();
    let children = ts.getAllElements(parent);

    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      // console.log(child);

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
        // console.log(item.data);
        return item.data;
      }
    }
    // return data;
    throw new Error('There is no data with marker' + marker);
  }
  // public insertDataToMarkers(
  //   elements: HTMLCollectionOf<HTMLElement>,
  //   dataToInsert: any[]
  // ): ICvDataManager {
  //   this.elements = elements;
  //   this.data = dataToInsert;

  //   for (let i = 0; i < this.elements.length; i++) {
  //     const element = elements[i];

  //     for (let j = 0; j < this.data.length; j++) {
  //       let item = this.data[j];

  //       if (this.elementContainsAttribute(element, item.marker)) element.textContent = item.data;
  //     }
  //   }

  //   return this;
  // }

  public merge() {
    let mergedElements: HTMLElement[] = [];
    // console.log(this.elements);

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
