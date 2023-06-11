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

    // delete elements from end and create their backup
    while (this.ts.contentHeightHigherThanPageHeight(page)) {
      const lastChild = this.getLastElement(currentItemClone);
      lastChildBackup = this.ts.createClone(lastChild);
      lastChildParent = lastChild.parentElement;
      lastChild.remove();
    }

    const currentItemTemplate = this.ts.createClone(currentItemClone);

    //delete first elements from both template elements
    while (true) {
      const firstElementFromCurrentItem = this.getFirstElement(currentItemTemplate);
      const firstElementFromItemForNextPage = this.getFirstElement(itemForNextPage);

      // if html structure of both elements are diffrent, break the loop
      if (firstElementFromCurrentItem.outerHTML !== firstElementFromItemForNextPage.outerHTML)
        break;

      firstElementFromItemForNextPage.remove();
      firstElementFromCurrentItem.remove();
    }

    lastChildParent?.appendChild(lastChildBackup as Node);
    let lastItemInCurrentPage = this.getLastElement(currentItemClone);
    let cutWords = [];

    //cut last word of last element in group till it will fit to cv size
    while (this.ts.contentHeightHigherThanPageHeight(page)) {
      if (lastItemInCurrentPage.textContent?.trim() == '') break;

      const { text, lastWord } = this.es.cutLastWord(lastItemInCurrentPage.textContent as string);
      lastItemInCurrentPage.textContent = text;
      cutWords.push(lastWord);
    }

    // set text of first element in next page from cut elements of prev page
    let textForNextPage = this.getFirstElement(itemForNextPage);
    if (cutWords.length > 0) textForNextPage.textContent = cutWords.reverse().join(' ');

    this.deleteEmptyElementsFromEnd(currentItemClone);

    return itemForNextPage;
  }

  private getLastElement(element: HTMLElement): HTMLElement {
    if (element.childElementCount > 0)
      return this.getLastElement(element.lastElementChild as HTMLElement);

    return element;
  }

  private getFirstElement(element: HTMLElement): HTMLElement {
    if (element.childElementCount > 0)
      return this.getFirstElement(element.firstElementChild as HTMLElement);

    return element;
  }

  private deleteEmptyElementsFromEnd(element: HTMLElement) {
    let last = this.getLastElement(element);

    while (last.textContent?.trim() == '') {
      if (last.outerHTML === element.outerHTML) break;

      last.remove();
      last = this.getLastElement(element);
    }
  }
}
