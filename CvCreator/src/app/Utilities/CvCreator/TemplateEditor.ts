import { Injectable } from '@angular/core';
import { ElementService } from './ElementService';
import { ITemplateEditor } from './Interfaces/ITemplateEditor';
import { TemplateService } from './TemplateService';

@Injectable()
export class TemplateEditor {
  outputMarkers = [
    '@description',
    '@firstName',
    '@lastName',
    '@placeholder',
    '@first',
    '@second',
    '@third',
    '@list',
    '@listContent',
    '@removeIfEmpty',
  ];

  inputMarkers = [
    '@description',
    '@firstName',
    '@lastName',
    '@placeholder',
    '@first',
    '@second',
    '@third',
  ];

  constructor(private templateService: TemplateService, private elementService: ElementService) {}

  deleteReduntantDataFromLastPage(page: HTMLElement, currentItemClone: HTMLElement) {
    let itemForNextPage = this.templateService.createClone(currentItemClone);
    const pageContent = this.templateService.getPageContent(page);
    // console.log(currentItemClone);

    // jesli element nie ma dzieci
    if (!this.elementService.elementHasChildren(currentItemClone)) {
      let cutWords = [];

      while (this.templateService.contentHeightHigherThanPageHeight(page)) {
        const { text, lastWord } = this.elementService.cutLastWord(
          currentItemClone.textContent as string
        );
        currentItemClone.textContent = text;
        cutWords.push(lastWord);
      }
      itemForNextPage.textContent = cutWords.reverse().join(' ');
      return itemForNextPage;
    }

    const itemAttributes = currentItemClone.attributes;
    // console.log(itemAttributes);
    let parentMarker = '';

    this.outputMarkers.forEach((marker) => {
      if (itemAttributes.getNamedItem(marker) != null) parentMarker = marker;
    });

    // console.log(parentMarker);

    let allElements = this.templateService.getAllElements(currentItemClone);
    let allClones = this.templateService.getAllElements(itemForNextPage as HTMLElement);

    let filteredElements = this.elementService.filterMarkers(
      allElements,
      this.outputMarkers,
      parentMarker
    );
    let filteredClones = this.elementService.filterMarkers(
      allClones,
      this.outputMarkers,
      parentMarker
    );

    // filteredElements = allElements;
    // filteredClones = allClones;
    //fix filters

    // filteredElements.forEach((d) => console.log(d.innerHTML));

    for (let i = filteredElements.length - 1; i >= 0; i--) {
      const element = filteredElements[i];

      let flag = false;
      // console.log(element);
      // console.log(page.offsetHeight);
      // console.log(pageContent.offsetHeight);

      // element.remove();

      // if (page.offsetHeight > pageContent.offsetHeight) break;

      const deletedWords: string[] = [];

      let index = 0;

      while (true) {
        console.log(element);
        console.log(page.offsetHeight);
        console.log(pageContent.offsetHeight);
        if (page.offsetHeight >= pageContent.offsetHeight) {
          filteredClones[i].textContent = deletedWords.reverse().join(' ');
          break;
        }

        const { text, lastWord } = this.elementService.cutLastWord(element.textContent as string);

        //element has marker

        let allItems = this.templateService.getAllElements(element);
        let ss = false;
        // console.log(allItems);

        allItems.forEach((item) => {
          // console.log(item);
          if (this.itemHasInputAttribute(item)) {
            console.log(item);
            item.textContent = text;

            console.log(page.offsetHeight);
            console.log(pageContent.offsetHeight);
          }
        });

        // console.log(element.innerHTML);

        if (page.offsetHeight < pageContent.offsetHeight) {
          element.remove();
          break;
        }

        // element.textContent = text;

        deletedWords.push(lastWord);

        if (this.elementService.textContentIsWhiteSpace(element)) {
          element.remove();
          break;
        }
      }
    }

    this.deleteEmptyMarkers(itemForNextPage);

    return itemForNextPage;
  }

  itemHasInputAttribute(item: HTMLElement) {
    let flag = false;
    this.inputMarkers.forEach((marker) => {
      if (item.attributes.getNamedItem(marker)) flag = true;
    });
    return flag;
  }

  elementHasMarker(element: HTMLElement) {
    const marker = '@third';

    return element.attributes.getNamedItem(marker)?.value === marker;
  }

  deleteEmptyMarkers(item: HTMLElement) {
    let elements = this.templateService.getAllElements(item);

    elements.forEach((item) => {
      if (item.textContent == '') item.remove();
    });
  }
}
