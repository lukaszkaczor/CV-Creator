import { Injectable } from '@angular/core';
import { ElementService } from './ElementService';
import { ITemplateEditor } from './Interfaces/ITemplateEditor';
import { TemplateService } from './TemplateService';

@Injectable()
export class TemplateEditor {
  outputMarkers = ['@description', '@firstName', '@lastName', '@placeholder'];

  constructor(private templateService: TemplateService, private elementService: ElementService) {}

  deleteReduntantDataFromLastPage(page: HTMLElement, currentItemClone: HTMLElement) {
    const itemForNextPage = this.templateService.createClone(currentItemClone);
    const pageContent = this.templateService.getPageContent(page);

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
    }

    let allElements = this.templateService.getAllElements(currentItemClone);
    let allClones = this.templateService.getAllElements(itemForNextPage as HTMLElement);

    let filteredElements = this.elementService.filterMarkers(allElements, this.outputMarkers);
    let filteredClones = this.elementService.filterMarkers(allClones, this.outputMarkers);

    for (let i = filteredElements.length - 1; i >= 0; i--) {
      const element = filteredElements[i];
      const deletedWords = [];

      while (true) {
        if (page.offsetHeight >= pageContent.offsetHeight) {
          filteredClones[i].textContent = deletedWords.reverse().join(' ');
          break;
        }

        const { text, lastWord } = this.elementService.cutLastWord(element.textContent as string);
        element.textContent = text;
        deletedWords.push(lastWord);

        if (this.elementService.textContentIsWhiteSpace(element)) {
          element.remove();
          break;
        }
      }
    }

    return itemForNextPage;
  }
}
