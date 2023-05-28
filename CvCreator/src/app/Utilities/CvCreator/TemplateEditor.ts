import { Injectable } from '@angular/core';
import { ElementService } from './ElementService';
import { TemplateService } from './TemplateService';

@Injectable()
export class TemplateEditor {
  constructor(private ts: TemplateService, private es: ElementService) {}

  deleteReduntantDataFromPage(page: HTMLElement, currentItemClone: HTMLElement) {
    const itemForNextPage = this.ts.createClone(currentItemClone);

    // if currentItemClone has no children
    if (!this.es.elementHasChildren(currentItemClone)) {
      let cutWords = [];

      //shorten it, till it fit to the page content
      while (this.ts.contentHeightHigherThanPageHeight(page)) {
        const { text, lastWord } = this.es.cutLastWord(currentItemClone.textContent as string);
        currentItemClone.textContent = text;
        cutWords.push(lastWord);
      }

      itemForNextPage.textContent = cutWords.reverse().join(' ');
      return itemForNextPage;
    }

    let lastChildBackup = null;
    let lastChildParent = null;

    while (this.ts.contentHeightHigherThanPageHeight(page)) {
      const lastChild = this.getLastElement(currentItemClone);
      lastChildBackup = this.ts.createClone(lastChild);
      lastChildParent = lastChild.parentElement;
      lastChild.remove();
    }

    const currentItemTemplate = this.ts.createClone(currentItemClone);

    while (true) {
      const templateFirstEl = this.getFirstElement(currentItemTemplate);
      const itemFirstEl = this.getFirstElement(itemForNextPage);

      if (templateFirstEl.outerHTML !== itemFirstEl.outerHTML) break;

      itemFirstEl.remove();
      templateFirstEl.remove();
    }

    lastChildParent?.appendChild(lastChildBackup as Node);
    let lastItemInCurrentPage = this.getLastElement(currentItemClone);
    let cutWords = [];

    while (this.ts.contentHeightHigherThanPageHeight(page)) {
      const { text, lastWord } = this.es.cutLastWord(lastItemInCurrentPage.textContent as string);
      lastItemInCurrentPage.textContent = text;
      cutWords.push(lastWord);
    }

    let textForNextPage = this.getFirstElement(itemForNextPage);

    textForNextPage.textContent = cutWords.reverse().join(' ');

    let last = this.getLastElement(currentItemClone);

    while (last.textContent?.trim() == '') {
      // if the last and current item clone (parent) are the same element
      if (last.outerHTML === currentItemClone.outerHTML) break;

      last.remove();
      last = this.getLastElement(currentItemClone);
    }

    return itemForNextPage;
  }

  getLastElement(element: HTMLElement): HTMLElement {
    if (element.childElementCount > 0)
      return this.getLastElement(element.lastElementChild as HTMLElement);

    return element;
  }

  getFirstElement(element: HTMLElement): HTMLElement {
    if (element.childElementCount > 0)
      return this.getFirstElement(element.firstElementChild as HTMLElement);

    return element;
  }

  deleteEmptyMarkers(item: HTMLElement) {
    let elements = this.ts.getAllElements(item);

    elements.forEach((item) => {
      if (item.textContent == '') item.remove();
    });
  }
}
