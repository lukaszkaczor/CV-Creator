import { Injectable } from '@angular/core';

import { ICvDataManager } from './Interfaces/ICvDataManager';
import { TemplateEditor } from './TemplateEditor';
import { TemplateService } from './TemplateService';

@Injectable()
export class CvDataManager implements ICvDataManager {
  private elements: HTMLElement[];
  // private elements: HTMLCollectionOf<HTMLElement>;
  private data: any[];

  private toInsert: any[] = [];

  public insertDataToMarkers(
    // elements: HTMLCollectionOf<HTMLElement>,
    elements: HTMLElement[],
    dataToInsert: any[]
  ): ICvDataManager {
    this.elements = elements;
    this.data = dataToInsert;

    // console.log(this.getData('@list'));

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      // console.log(elements);

      if (this.elementContainsAttribute(element, '@list')) {
        // console.log(element as HTMLElement);
        // console.log(element.appendChild);

        let ts = new TemplateService();
        let te = new TemplateEditor();

        let s = te.createClone(element);
        let w = te.createClone(element);
        // console.log(s.parentElement);
        console.log(element.parentElement?.appendChild(s));
        console.log(element.parentElement?.appendChild(w));
        console.log(w.parentElement);

        // console.log(element);
        let listElements = ts.getAllElements(element);
        // console.log(listElements);
        // console.log(this.data);

        let dt: [] = this.getData('@list');
        // console.log(dt);

        listElements.forEach((el) => {
          // console.log(el);
          dt.forEach((item: any) => {
            // console.log(item);
            let clone = te.createClone(el);
            // console.log(el.parentElement);
            // console.log(clone.parentElement);
            // console.log(clone.parentElement );

            // console.log(item);
            // console.log(el);
            el.textContent = item.first;
            this.toInsert.push({ clone, i, item });

            // el.textContent = item.first;
          });
        });

        //searchForData
        // for (let j = 0; j < this.data.length; j++) {
        //   let item = this.data[j];

        //   // if (this.elementContainsAttribute(element, item.marker)) element.textContent = item.data;
        //   if (this.elementContainsAttribute(element, item.marker)) {
        //     listElements.forEach((te) => {
        //       console.log(te);

        //       te.textContent = item.marker;
        //     });

        //     // arr.forEach((element) => {
        //     //   console.log(element);
        //     //   if (this.elementContainsAttribute(element, item.marker))
        //     //     element.textContent = item.data;
        //     // });
        //   }
        // }

        // for (let j = 0; j < listElements.length; j++) {
        //   console.log(listElements[j]);
        //   listElements[j].textContent = 'WWWWWWWW';
        // }
        continue;
      }

      for (let j = 0; j < this.data.length; j++) {
        let item = this.data[j];

        if (this.elementContainsAttribute(element, item.marker)) element.textContent = item.data;
      }
    }

    // console.log(this.toInsert);
    this.toInsert.forEach((item: any) => {
      this.elements = this.insert(this.elements, item.i, item.clone);
    });

    // console.log(this.elements);

    return this;
  }
  // const insert = (arr, index, newItem) => [
  //   // part of the array before the specified index
  //   ...arr.slice(0, index),
  //   // inserted item
  //   newItem,
  //   // part of the array after the specified index
  //   ...arr.slice(index)
  // ]

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
