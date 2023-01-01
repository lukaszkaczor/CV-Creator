import { ITemplateEditor } from './Interfaces/ITemplateEditor';

export class TemplateEditor implements ITemplateEditor {
  deleteReduntantDataFromLastPage(page: HTMLElement, currentItemClone: HTMLElement) {
    let itemForNextPage = this.createClone(currentItemClone);

    let cutWords = [];
    while (this.contentHeightHigherThanPageHeight(page)) {
      let result = this.cutLastWord(currentItemClone.textContent as string);
      currentItemClone.textContent = result.text;
      if (currentItemClone.textContent == '') currentItemClone.remove(); //remove last element from page if its empty
      if (result.lastWord != ' ') cutWords.push(result.lastWord.trim());
    }
    // console.log(cutWords);
    return { itemForNextPage: itemForNextPage, cutWords: cutWords };
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
