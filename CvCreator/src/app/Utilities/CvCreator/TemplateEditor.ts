import { Injectable } from '@angular/core';
import { ElementService } from './ElementService';
import { TemplateService } from './TemplateService';
import { CvMarkers } from './CvMarkers';

@Injectable()
export class TemplateEditor {
  constructor(private ts: TemplateService, private es: ElementService) {}

  deleteReduntantDataFromPage(page: HTMLElement, currentItemClone: HTMLElement) {
    let itemForNextPage = this.ts.createClone(currentItemClone);
    const pageContent = this.ts.getPageContent(page);

    // if element has no children
    if (!this.es.elementHasChildren(currentItemClone)) {
      let cutWords = [];

      while (this.ts.contentHeightHigherThanPageHeight(page)) {
        const { text, lastWord } = this.es.cutLastWord(currentItemClone.textContent as string);
        currentItemClone.textContent = text;
        cutWords.push(lastWord);
      }
      itemForNextPage.textContent = cutWords.reverse().join(' ');
      return itemForNextPage;
    }

    const itemAttributes = currentItemClone.attributes;
    let parentMarker = '';

    CvMarkers.allMarkers.forEach((marker) => {
      if (itemAttributes.getNamedItem(marker) != null) parentMarker = marker;
    });

    const allElements = this.ts.getAllElements(currentItemClone);
    const allClones = this.ts.getAllElements(itemForNextPage as HTMLElement);

    const filteredElements = this.es.filterMarkers(allElements, CvMarkers.allMarkers, parentMarker);
    const filteredClones = this.es.filterMarkers(allClones, CvMarkers.allMarkers, parentMarker);

    for (let i = filteredElements.length - 1; i >= 0; i--) {
      const element = filteredElements[i];

      const deletedWords: string[] = [];

      while (true) {
        if (page.offsetHeight >= pageContent.offsetHeight) {
          filteredClones[i].textContent = deletedWords.reverse().join(' ');
          break;
        }

        const lastWord = this.es.cutLastWord(element.textContent as string).lastWord;

        // let allItems = this.ts.getAllElements(element);

        // allItems.forEach((item) => {
        //   if (this.es.itemHasInputAttribute(item)) {
        //     item.textContent = text;
        //     console.log(item);
        //   }
        // });

        if (page.offsetHeight < pageContent.offsetHeight) {
          element.remove();
          break;
        }

        deletedWords.push(lastWord);

        // if item has no text, remove it
        if (this.es.textContentIsWhiteSpace(element)) {
          element.remove();
          break;
        }
      }
    }

    this.deleteEmptyMarkers(itemForNextPage);

    return itemForNextPage;
  }

  deleteEmptyMarkers(item: HTMLElement) {
    let elements = this.ts.getAllElements(item);

    elements.forEach((item) => {
      if (item.textContent == '') item.remove();
    });
  }
}
