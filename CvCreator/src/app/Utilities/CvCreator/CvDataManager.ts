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

    // console.log(this.getData('@list'));
    // console.log(elements);

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      // console.log(element);

      // const te = new TemplateEditor();
      const ts = new TemplateService();

      if (this.elementIsList(element)) {
        let data: any[] = this.getData('@list');
        let newElements: HTMLElement[] = [];

        // let clone = ts.createClone(element);
        // let s1 = this.getElement(clone, '@first');
        // let w1 = this.getElement(clone, '@second');
        // s1.textContent = 's1';
        // w1.textContent = 'w1';
        // console.log(clone);

        // element.appendChild(clone);

        // let clone2 = ts.createClone(clone);
        // let s2 = this.getElement(clone2, '@first');
        // let w2 = this.getElement(clone2, '@second');
        // s2.textContent = 's2';
        // w2.textContent = 'w2';

        // element.appendChild(clone2);

        // console.log(clone2);

        let clone = ts.createClone(element);
        // clone.remove();
        // console.log(clone);

        let cloneTemplate = ts.createClone(clone);

        for (let j = 0; j < data.length; j++) {
          let keys = Object.keys(data[j]);

          keys.forEach((key) => {
            let dd = this.getElement(clone, key);
            dd.textContent = data[j][key];
          });

          // let s1 = this.getElement(clone, '@first');

          // let w1 = this.getElement(clone, '@second');
          // s1.textContent = 's1 ' + j;
          // w1.textContent = 'w1 ' + j;
          // console.log(clone);
          let ss = clone.getElementsByTagName('h2');
          // console.log(ss);
          //jesli sa puste, usun rodzica ze znacznikiem
          if (ss[0].textContent?.trim() == '') {
            // console.log('@third nie ma wartosci');
            let sd = this.getElement(clone, '@removeIfEmpty');
            // console.log(sd);
            sd.remove();
          }

          // ss[0].remove();

          element.appendChild(clone);

          // console.log();
          // if ((clone.children[2].textContent = '')) clone.children[1].remove();

          clone.outerHTML = clone.innerHTML;

          clone = ts.createClone(cloneTemplate);
          // cloneTemplate.remove();
        }

        //remove template children
        // element.children[0].remove();

        //usuwanie templatu
        console.log(element.children);
        element.children[0].remove();
        element.children[0].remove();
        element.children[0].remove();
        // console.log(element);

        //+++
        // let clone = ts.createClone(element);

        // for (let j = 0; j < data.length; j++) {
        //   let s1 = this.getElement(clone, '@first');
        //   let w1 = this.getElement(clone, '@second');
        //   s1.textContent = 's1 ' + j;
        //   w1.textContent = 'w1 ' + j;
        //   element.appendChild(clone);

        //   clone = ts.createClone(clone);
        // }
        // console.log(element);

        //+++end

        // const elementClone = ts.createClone(element);
        // for (let w = 0; w < data.length; w++) {
        //   let child = this.getElement(elementClone, '@first');
        //   child.textContent = 'first';
        //   let child2 = this.getElement(elementClone, '@second');
        //   child2.textContent = 'second';
        //   element.appendChild(elementClone);
        //   // console.log(element.parentElement);
        //   // element.parentElement?.appendChild(elementClone);
        // }
      } else {
        for (let j = 0; j < this.data.length; j++) {
          let item = this.data[j];

          if (this.elementContainsAttribute(element, item.marker)) element.textContent = item.data;
        }
      }
      // element.remove();
      // console.log(this.elements);
    }

    // console.log(this.toInsert);
    this.toInsert.forEach((item: any) => {
      this.elements = this.insert(this.elements, item.i, item.clone);
    });

    // console.log(this.elements);

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
