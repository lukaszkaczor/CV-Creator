import { Template } from './template';
import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appContent]',
})
export class ContentDirectiveOld implements OnInit {
  @Input() template: string;
  cvElement: HTMLElement;
  pages: HTMLElement[] = [];

  dataToInsert = [
    { marker: '@firstName', data: Template.data.firstName },
    { marker: '@lastName', data: Template.data.lastName },
    { marker: '@description', data: Template.data.description },
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initializeBox();

    this.cvElement = this.createNewElement('div', '');
    // this.cvElement = this.renderer.createElement('div');
    this.cvElement.innerHTML = this.template;
    this.cvElement.classList.add('container');

    let firstPage = this.getFirstPage();
    let middlePage = this.getMiddlePage();
    let content = this.gpc(firstPage);

    let allElements = this.getAllElements(this.gpc(firstPage));
    // console.log(this.gpc(firstPage));

    let temp: HTMLElement[] = [];
    // let dudu: HTMLElement[] = [];
    let text = '';

    for (let i = 0; i < allElements.length; i++) {
      // console.log(allElements);

      let element = allElements[i];

      this.dataToInsert.forEach((item) => {
        let itemHasAttribute = this.elementContainsAttribute(
          element,
          item.marker
        );
        // dudu.push(element);
        // console.log(itemHasAttribute);
        if (itemHasAttribute) element.textContent = item.data;
      });
      if (!this.contentIsLowerThanPage(firstPage)) {
        // let clone = this.createClone(element);
        temp.push(element);
      }
    }

    //merge children with parents
    let arr: HTMLElement[] = [];
    temp.forEach((item) => {
      if (item.parentElement?.hasAttribute('@pageContent')) {
        arr.push(item);
      }
    });

    let first = arr[0];
    let ftext: string = first.textContent as string;
    console.log(first);
    let clone = this.createClone(first) as HTMLElement;
    content.appendChild(clone);
    console.log(clone.offsetHeight);

    console.log(content.offsetHeight);

    let middleConent = this.gpc(middlePage);
    console.log(middleConent);

    arr.forEach((item) => {
      middleConent.appendChild(item);
    });
    console.log(content.offsetHeight);

    let arraggio = [];

    while (!this.contentIsLowerThanPage(firstPage)) {
      console.log('---');

      let b = this.cct(ftext);
      ftext = b.text;
      arraggio.push(b.lastWord);
      clone.textContent = ftext;
    }

    //fix
    arraggio = arraggio.filter((e: any) => {
      return e.replace(/(\r\n|\n|\r)/gm, '');
    });

    //fix
    first.textContent = arraggio.reverse().join();
    // if (middleConent.firstChild?.textContent != null)
    //   middleConent.firstChild.textContent = arraggio.reverse().join(' ');

    // arraggio.filter((e) => {
    //   return e == ' ';
    // });

    console.log(arraggio.reverse().join(' '));
  }

  // passNodes(from: HTMLElement, to: HTMLElement, elementToPass: HTMLElement) {
  //   to.appendChild(elementToPass);
  //   // elementToPass.remove();
  // }

  createClone(element: HTMLElement) {
    // console.log(element.outerHTML);
    // element.cloneNode()
    let clone = element.cloneNode(true);
    // console.log(clone);

    return clone;
  }

  // trimContent(page: HTMLElement) {
  //   let trimmed: HTMLElement[] = [];

  //   // while(this.contentIsLowerThanPage(page))
  //   // {
  //   //   page.
  //   // }

  //   console.log(page);
  // }

  insertData() {
    let firstPage = this.getFirstPage();
    let middlePage = this.getMiddlePage();
    let content = this.gpc(firstPage);
    // let content = this.getPageContent(firstPage);
    this.dataToInsert.forEach((item) => {
      const arr = this.searchForElementsWithAttribute(content, item.marker);
      let clone: Node;
      let lt: string;

      //first page
      for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        element.textContent = item.data;
        clone = this.createClone(element);

        if (!this.contentIsLowerThanPage(firstPage)) {
          // if (false) {
          const elementBackup = element;
          let textBackup = element.textContent;
          let lastText = this.trimPage(firstPage, element);

          content = this.gpc(middlePage);
          // content = this.getPageContent(middlePage);
          clone = this.createClone(element);

          lt = lastText;
          clone.textContent = lastText;
          console.log(clone);

          break;
        }
      }

      // console.log(content);

      // const nextPageArr = this.searchForElementsWithAttribute(
      //   content,
      //   item.marker
      // );

      // console.log(middlePage);
      // // this.renderer.app
      // nextPageArr.forEach((r) => {
      //   console.log(clone);

      //   this.renderer.appendChild(middlePage, clone);
      //   r.textContent = clone.textContent;

      // });
    });
  }

  trimPage(firstPage: HTMLElement, element: HTMLElement) {
    const elementBackup = element;
    const textBackup = element.textContent;
    let cutWords: any = [];

    while (!this.contentIsLowerThanPage(firstPage)) {
      let dd = this.clw(element);
      element.textContent = dd.text;
      cutWords.push(dd.lastWord);
    }

    cutWords = cutWords.filter((e: any) => {
      return e.replace(/(\r\n|\n|\r)/gm, '');
    });
    // console.log(cutWords.reverse().join(' '));
    //
    return cutWords.reverse().join(' ');
  }

  clw(element: HTMLElement): { text: string; lastWord: string } {
    let cutWords = [];
    let text = element.textContent;
    if (text == null) return { text: '', lastWord: '' };

    let str = text;
    let lastIndex = str.lastIndexOf(' ');
    cutWords.push(str.substring(lastIndex));

    return {
      text: str.substring(0, lastIndex),
      lastWord: str.substring(lastIndex + 1),
    };
  }

  cutLastWord(element: HTMLElement) {
    //
    let cutWords = [];
    let text = element.textContent;
    if (text == null) return '';

    let str = text;
    let lastIndex = str.lastIndexOf(' ');
    cutWords.push(str.substring(lastIndex));

    return str.substring(0, lastIndex);
  }
  cutLastWordFromText(textContent: string) {
    //
    let cutWords = [];
    let text = textContent;
    if (text == null) return '';

    let str = text;
    let lastIndex = str.lastIndexOf(' ');
    cutWords.push(str.substring(lastIndex));

    return str.substring(0, lastIndex);
  }

  cct(textContent: string): { text: string; lastWord: string } {
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

  // cutLastWord(text: string | null): string {
  //   if (text == null) return '';

  //   var str = text;
  //   var lastIndex = str.lastIndexOf(' ');
  //   this.cutWords.push(str.substring(lastIndex));

  //   return str.substring(0, lastIndex);
  //   // this.c1.nativeElement.innerText
  // }

  searchForElementsWithAttribute(element: HTMLElement, attribute: string) {
    let allElements = this.getAllElements(element);

    let elements: HTMLElement[] = [];

    for (let i = 0; i < allElements.length; i++) {
      this.elementContainsAttribute(allElements[i], attribute)
        ? elements.push(allElements[i])
        : null;
    }
    // console.log(elements);

    // console.log(allElements);
    // console.log(element);

    // console.log(this.elementsContainsAttribute(element, attribute));

    return elements;
  }

  elementContainsAttribute(element: HTMLElement, name: string) {
    return element.attributes.getNamedItem(name) != null;
  }

  contentIsLowerThanPage(page: HTMLElement): boolean {
    const contentHeight = this.gpc(page).clientHeight;
    const pageHeight = page.offsetHeight;

    return contentHeight < pageHeight;
  }

  getContentHeight(content: HTMLElement) {
    console.log(content.offsetHeight);

    return content.clientHeight;
  }

  getFirstPage(): HTMLElement {
    return this.cvElement
      .getElementsByTagName('*')
      .namedItem('first-page') as HTMLElement;
  }
  getMiddlePage(): HTMLElement {
    return this.cvElement
      .getElementsByTagName('*')
      .namedItem('middle-page') as HTMLElement;
  }

  getLastElement(content: HTMLElement): HTMLElement {
    return content.lastChild as HTMLElement;
  }

  // getPageContent(page: HTMLElement): HTMLElement {
  //   // return page.hasAttribute
  //   //    as HTMLElement;
  //   return page
  //     .getElementsByTagName('*')
  //     .namedItem('page-content') as HTMLElement;
  //   return page;
  // }

  gpc(page: HTMLElement): HTMLElement {
    // console.log(page);
    let elements = page.getElementsByTagName('*');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      // console.log(element.hasAttribute('@pageContent'));
      if (element.hasAttribute('@pageContent')) return element as HTMLElement;
    }
    //FIX
    return page;
  }

  getChildren(element: HTMLElement): HTMLCollection {
    return element.children;
  }

  getAllElements(element: HTMLElement): HTMLCollectionOf<HTMLElement> {
    return element.getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
  }

  getChild(element: HTMLElement, name: string): HTMLElement {
    return this.getAllElements(element).namedItem(name) as HTMLElement;
  }

  initializeBox() {
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid red');
    this.renderer.setStyle(this.el.nativeElement, 'width', '350px');
    this.renderer.setStyle(this.el.nativeElement, 'min-height', '500px');
    this.renderer.setStyle(this.el.nativeElement, 'height', 'auto');
    this.renderer.setStyle(this.el.nativeElement, 'margin-left', '300px');
  }

  createNewElement(element: string, content: string) {
    const pNode = this.renderer.createElement(element);
    const txtNode = this.renderer.createText(content);

    // this.renderer.setStyle(pNode, 'color', 'red');
    // this.renderer.addClass(pNode, ['asd']);
    this.renderer.appendChild(pNode, txtNode);
    this.renderer.appendChild(this.el.nativeElement, pNode);
    return pNode;
  }
}
