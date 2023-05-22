import { CvMarkers } from './CvMarkers';
import { IElementDataManager } from './Interfaces/IElementDataManager';
import { ITemplateService } from './Interfaces/ITemplateService';
import { TemplateService } from './TemplateService';

export class ListDataManager implements IElementDataManager {
  public insertDataToElement(element: HTMLElement, data: any[]): HTMLElement {
    const ts = new TemplateService();

    // create backup elements
    let clone = ts.createClone(element);
    const cloneTemplate = ts.createClone(clone);

    let attribute = this.getInputAttribute(element);
    const elementChildrenLength = element.children.length;
    // console.log(clone.outerHTML);

    let dataToInsert: any[] = this.getData(attribute, data);

    // loop through every element and piece of data
    for (let j = 0; j < dataToInsert.length; j++) {
      const keys = Object.keys(dataToInsert[j]);

      keys.forEach((key) => {
        const element = this.getElement(clone, key);
        element.textContent = dataToInsert[j][key];
      });

      // const ts = new TemplateService();
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

    return element;
  }

  getInputAttribute(item: HTMLElement) {
    const attributes = Array.from(item.attributes);

    let isList = false;
    let attributeName = '';

    attributes.forEach((attribute) => {
      // console.log(attribute.name.startsWith('@list'));

      if (attribute.name.startsWith('@list')) {
        attributeName = attribute.name;
      }
    });

    return attributeName;
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

  // elementIsList(element: HTMLElement) {
  //   return this.elementContainsAttribute(element, '@list');
  // }

  // insert(arr: HTMLElement[], index: number, newItem: HTMLElement): HTMLElement[] {
  //   let ss = [...arr.slice(0, index), newItem, ...arr.slice(index)];
  //   return ss;
  // }

  getData(marker: string, data: any[]) {
    for (let j = 0; j < data.length; j++) {
      let item = data[j];

      item.marker == marker;
      if (item.marker == marker) {
        data.push(item.data);
        return item.data;
      }
    }

    throw new Error('There is no data with marker' + marker);
  }

  //   public merge() {
  //     let mergedElements: HTMLElement[] = [];

  //     for (let i = 0; i < this.elements.length; i++) {
  //       const element = this.elements[i];

  //       if (this.parentHasAttribute(element, '@pageContent')) mergedElements.push(element);
  //     }
  //     return mergedElements;
  //   }

  // private parentHasAttribute(element: HTMLElement, attribute: string): boolean {
  //   return element.parentElement?.hasAttribute(attribute) as boolean;
  // }

  private elementContainsAttribute(element: HTMLElement, name: string) {
    return element.attributes.getNamedItem(name) != null;
  }
}
