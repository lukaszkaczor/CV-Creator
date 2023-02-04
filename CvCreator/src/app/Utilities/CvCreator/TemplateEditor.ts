import { ElementSchemaRegistry } from '@angular/compiler';
import { last } from 'rxjs';
import { ITemplateEditor } from './Interfaces/ITemplateEditor';

export class TemplateEditor implements ITemplateEditor {
  deleteReduntantDataFromLastPage(page: HTMLElement, currentItemClone: HTMLElement) {
    let itemForNextPage = this.createClone(currentItemClone);
    let cl = this.createClone(currentItemClone);
    console.log(cl);

    // console.log(currentItemClone.children[0].attributes);

    const children = this.getElementChildren(currentItemClone);

    // console.log(currentItemClone);

    if (children.length > 0) {
      // console.log(currentItemClone);
      // console.log(children);
      // console.log(this.getLastChild(children));
      let lastChild = this.getLastChild(children);

      // ss.push(lastChild);
      //children of child
      let i = 0;

      while (i < 1000) {
        if (children.length <= 0) break;
        i++;
        let result = this.cutLastWord(lastChild.textContent as string);
        lastChild.textContent = result.text;

        if (this.contentHeightLowerThanPageHeight(page)) {
          break;
        }

        if (lastChild.textContent === '') {
          // console.log(lastChild);

          lastChild.remove();
          lastChild = this.getLastChild(children);
          // console.log(lastChild);
        }
      }
      //
    }

    // if(this.getElementChildren())

    let cutWords = [];
    cutWords.push('');

    // while (this.contentHeightHigherThanPageHeight(page)) {
    //   let result = this.cutLastWord(currentItemClone.textContent as string);
    //   // currentItemClone.textContent = result.text;
    //   if (currentItemClone.textContent == '') currentItemClone.remove(); //remove last element from page if its empty
    //   if (result.lastWord != ' ') cutWords.push(result.lastWord.trim());
    // }
    // console.log(cutWords);
    return { itemForNextPage: itemForNextPage, cutWords: cutWords };
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
