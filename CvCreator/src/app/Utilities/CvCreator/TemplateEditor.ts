import { ElementSchemaRegistry } from '@angular/compiler';
import { ITemplateEditor } from './Interfaces/ITemplateEditor';
import { TemplateService } from './TemplateService';

export class TemplateEditor implements ITemplateEditor {
  outputMarkers = ['@description', '@firstName', '@lastName', '@placeholder'];

  deleteReduntantDataFromLastPage(page: HTMLElement, currentItemClone: HTMLElement) {
    let itemForNextPage = this.createClone(currentItemClone);
    // console.log(currentItemClone);
    console.log(currentItemClone);
    console.log(currentItemClone.children.length);

    if (currentItemClone.children.length == 0) currentItemClone.remove();

    // jesli element nie ma dzieci

    const templateService = new TemplateService();
    let allElements = templateService.getAllElements(currentItemClone);
    // console.log(allElements);
    let allClones = templateService.getAllElements(itemForNextPage as HTMLElement);

    let filteredClones = this.filterMarkers(allClones);
    let filteredElements = this.filterMarkers(allElements);

    let ts = new TemplateService();
    console.log(allElements);
    console.log(filteredElements);
    const pageContent = ts.getPageContent(page);
    // console.log(pageContent.offsetHeight);

    for (let i = filteredElements.length - 1; i >= 0; i--) {
      const element = filteredElements[i];
      // console.log(element);
      let s = 0;

      let deletedWords = [];

      while (true) {
        s++;

        if (page.offsetHeight >= pageContent.offsetHeight) {
          // filteredClones[i].textContent = element.textContent;
          filteredClones[i].textContent = deletedWords.reverse().join(' ');

          break;
        }

        let text = this.cutLastWord(element.textContent as string);
        element.textContent = text.text;
        // console.log(text.lastWord);

        deletedWords.push(text.lastWord);

        if (element.textContent.trim() == '') {
          element.remove();
          break;
        }
      }

      // element.remove();
      // console.log(page.offsetHeight);
      // console.log(pageContent.offsetHeight);

      // for(let i = 0; i<10 ;i++)
      // {

      // }

      // while (pageHeight < contentHeight) {
      //   element.remove();

      //   pageHeight = page.offsetHeight;
      //   contentHeight = pageContent.offsetHeight;
      // }

      // element.remove();

      // while (s < 100) {
      //   s++;
      //   console.log(page.offsetHeight);
      //   console.log(pageContent.offsetHeight);
      //   console.log(element);
      //   element.remove();
      // }

      // while (page.offsetHeight < pageContent.offsetHeight || s < 200) {
      //   s++;
      //   let text = this.cutLastWord(element.textContent as string);
      //   element.textContent = text.text;
      // }

      // while (page.offsetHeight > pageContent.offsetHeight || element.textContent?.trim() == '') {
      //   console.log(page.offsetHeight);
      //   console.log(pageContent.offsetHeight);

      //   s++;
      //   let text = this.cutLastWord(element.textContent as string);
      //   element.textContent = text.text;
      // }

      // while (pageContent.offsetHeight > page.offsetHeight || s < 10) {
      //   s++;
      //   // let text = this.cutLastWord(element.textContent as string);
      //   // element.textContent = text.text;
      // }
      // itemForNextPage = element;
    }

    console.log(itemForNextPage);

    // filteredElements.forEach((element) => {
    //   console.log(element);
    //   itemForNextPage = element;
    //   // element.remove();
    //   console.log(page.offsetHeight);
    // });

    let cutWords = [];
    cutWords.push('');

    return { itemForNextPage: itemForNextPage, cutWords: cutWords };
  }

  filterMarkers(elements: HTMLElement[]) {
    let toReturn: HTMLElement[] = [];

    for (let i = 0; i < this.outputMarkers.length; i++) {
      let marker = this.outputMarkers[i];

      for (let j = 0; j < elements.length; j++) {
        let element = elements[j];
        if (element.attributes.getNamedItem(marker) != null) {
          toReturn.push(element);
        }
      }
    }
    return toReturn;
  }

  getLastChild(children: HTMLCollection) {
    return children[children.length - 1];
  }

  getElementChildren(element: HTMLElement) {
    return element.children;
  }

  createClone(element: HTMLElement) {
    return element.cloneNode(true);
  }

  cutLastWord(textContent: string): { text: string; lastWord: string } {
    let cutWords = [];
    let text = textContent;
    if (text == null) return { text: '', lastWord: '' };

    let str = text;
    let lastIndex = str.lastIndexOf(' ');
    cutWords.push(str.substring(lastIndex));

    return {
      text: str.substring(0, lastIndex),
      lastWord: str.substring(lastIndex),
    };
  }

  contentHeightHigherThanPageHeight(page: HTMLElement) {
    var content = this.getPageContent(page);
    return content.offsetHeight > page.offsetHeight;
  }

  contentHeightLowerThanPageHeight(page: HTMLElement) {
    var content = this.getPageContent(page);
    return content.offsetHeight < page.offsetHeight;
  }

  getPageContent(page: HTMLElement): HTMLElement {
    let elements = page.getElementsByTagName('*');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.hasAttribute('@pageContent')) return element as HTMLElement;
    }

    throw new Error('Missing @pageContent in page template');
  }
}
