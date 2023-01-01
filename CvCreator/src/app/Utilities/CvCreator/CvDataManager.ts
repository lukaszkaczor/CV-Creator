import { Injectable } from '@angular/core';

import { ICvDataManager } from './Interfaces/ICvDataManager';
import { TemplateEditor } from './TemplateEditor';
import { TemplateService } from './TemplateService';

@Injectable()
export class CvDataManager implements ICvDataManager {
  private elements: HTMLElement[] = [];
  // private elements: HTMLCollectionOf<HTMLElement>;
  private data: any[];

  private toInsert: any[] = [];

  public insertDataToMarkers(
    // elements: HTMLCollectionOf<HTMLElement>,
    elements: HTMLElement[],
    dataToInsert: any[]
  ): ICvDataManager {
    // this.elements = elements;
    this.elements.push(...elements);
    console.log(this.elements);

    this.data = dataToInsert;

    // console.log(this.getData('@list'));

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      const te = new TemplateEditor();
      const ts = new TemplateService();

      if (this.elementIsList(element)) {
        let data: any[] = this.getData('@list');

        data.forEach((item) => {
          const clone = te.createClone(element);
          element.parentElement?.appendChild(clone);
          // this.toInsert.push(clone);
          this.elements.push(clone as HTMLElement);
          // console.log(element.parentElement);

          let allElements = ts.getAllElements(clone as HTMLElement);
          const keys = Object.keys(item);
          keys.forEach((key) => {
            allElements.forEach((element) => {
              if (this.elementContainsAttribute(element, key)) {
                element.textContent = item[key];
              }
            });
          });

          // allElements = this.m2(allElements);
          console.log(allElements);
        });

        // console.log(data);

        continue;
      }

      for (let j = 0; j < this.data.length; j++) {
        let item = this.data[j];

        if (this.elementContainsAttribute(element, item.marker)) element.textContent = item.data;
      }

      console.log(this.elements);
    }

    // console.log(this.toInsert);
    this.toInsert.forEach((item: any) => {
      this.elements = this.insert(this.elements, item.i, item.clone);
    });

    // console.log(this.elements);

    return this;
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
    console.log(this.elements);

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
