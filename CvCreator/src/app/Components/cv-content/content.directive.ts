import { Template } from './template';
import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appContent]',
})
export class ContentDirective implements OnInit {
  @Input() template: string;
  cvElement: HTMLElement;
  cvTemplate: HTMLElement;
  pages: HTMLElement[] = [];

  dataToInsert = [
    { marker: '@firstName', data: Template.data.firstName },
    { marker: '@lastName', data: Template.data.lastName },
    { marker: '@description', data: Template.data.description },
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {    
    this.cvElement = this.createNewElement('div', '');
    this.cvTemplate = this.createNewElement('div', '');
    this.cvElement.innerHTML = `<div @firstPage class="page" >
                                  <div @pageContent class="page-content"></div>
                                </div>
                                
                                <div @secondPage class="page" style="position: absolute; top: 520px">
                                  <div @pageContent class="page-content"></div>
                                </div>

                                <div @lastPage class="page" style="position: absolute; top: 1040px">
                                  <div @pageContent class="page-content"></div>
                                </div>
                                
                                `;
                                
    let cvBackup = this.createNewElement("div", "");
    cvBackup.innerHTML = this.cvElement.innerHTML;
    console.log(cvBackup);
    
    
    this.initializeBox();

    this.insertDataToTemplate();

    let dataFromTemplate = this.getPageContent(this.cvTemplate);    
    let allElementsFromTemplate = this.getAllElements(dataFromTemplate);

    let mergedElementsFromTemplate: HTMLElement[] = this.merge(
      allElementsFromTemplate
    );
    


    let page = this.getFirstPage(this.cvElement);
    let pageContent = this.getPageContent(page);
    let lastItem: Node = page;


    

    let index = 0;
    for (let i = 0; i < mergedElementsFromTemplate.length;i++)
    {
      let item = mergedElementsFromTemplate[i];

      if (this.contentHeightLowerThanPageHeight(page)) {
        lastItem = this.createClone(item);
        pageContent.appendChild(lastItem);

        if(!this.pages.find(p => p.attributes.getNamedItem("@lastPage")) 
        && page.attributes.getNamedItem("@lastPage") != null)
        this.pages.push(page);

      } else {
        let lastChild = this.getLastChild(pageContent)

        let cutWords = [];
        let dd = 0
        while (this.contentHeightHigherThanPageHeight(page)) {
          dd++;
          
          if(dd == 250) {
          console.log(page.offsetHeight);
          console.log(pageContent.offsetHeight);

            break;
          }
          //--------
          let result = this.cutLastWord(lastChild.textContent as string);
          lastChild.textContent = result.text;
          if (lastChild.textContent == '') lastChild.remove(); //remove last element from page if its empty

          if (result.lastWord != ' ') cutWords.push(result.lastWord.trim());
        }

        index++;
        this.pages.push(page);


        
        if(index == 1)
        {
         console.log("1")
          page= this.getSecondPage(this.cvElement);
          // page = midPageClone as HTMLElement;
          console.log(page);
        }
        if(index == 2)
        {
          console.log("2");
          
          page= this.getLastPage(this.cvElement);
          // page= this.getSecondPage(this.cvElement);
        }

        // if(index == 5)
        // break;

        // let secondPage = this.getSecondPage(this.cvElement);
        pageContent = this.getPageContent(page as HTMLElement); //secondPageContent
        let continuationOfLastItem = pageContent.appendChild(
          this.createClone(lastItem as HTMLElement)
        );
        continuationOfLastItem.textContent = cutWords.reverse().join(' ');
        let currentItemClone = this.createClone(item);
        pageContent.appendChild(currentItemClone);
      }
    }

    

    // let firstPage = this.getFirstPage(this.cvElement);
    // let firstPageContent = this.getPageContent(firstPage);


    // let lastItem: Node = firstPage;

    // mergedElementsFromTemplate.forEach((item) => {
     
    //   if (firstPageContent.offsetHeight < firstPage.offsetHeight) {
    //     lastItem = this.createClone(item);
    //     firstPageContent.appendChild(lastItem);

    //   } else {
    //     let lastChild =
    //       firstPageContent.children[firstPageContent.children.length - 1];

    //     let cutWords = [];
    //     while (firstPageContent.offsetHeight > firstPage.offsetHeight) {
    //       let result = this.cutLastWord(lastChild.textContent as string);
    //       lastChild.textContent = result.text;
    //       if (lastChild.textContent == '') lastChild.remove(); //remove last element from page if its empty

    //       if (result.lastWord != ' ') cutWords.push(result.lastWord.trim());
    //     }

    //     let secondPage = this.getSecondPage(this.cvElement);
    //     firstPageContent = this.getPageContent(secondPage); //secondPageContent
    //     let continuationOfLastItem = firstPageContent.appendChild(
    //       this.createClone(lastItem as HTMLElement)
    //     );
    //     continuationOfLastItem.textContent = cutWords.reverse().join(' ');
    //     let currentItemClone = this.createClone(item);
    //     firstPageContent.appendChild(currentItemClone);
    //   }
    // });
  }

  contentHeightLowerThanPageHeight(page: HTMLElement){
    var content = this.getPageContent(page);
    return content.offsetHeight < page.offsetHeight;
  }

  contentHeightHigherThanPageHeight(page: HTMLElement){
   var content = this.getPageContent(page);
    return content.offsetHeight > page.offsetHeight;
  }

  getLastChild(page: HTMLElement) {
    return page.children[page.children.length - 1]
  }


  //--------------------
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

  merge(elements: HTMLCollectionOf<HTMLElement>) {
    let arr: HTMLElement[] = [];

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.parentElement?.hasAttribute('@pageContent')) {
        arr.push(element);
      }
    }
    return arr;
  }

  createClone(element: HTMLElement) {
    return element.cloneNode(true);
  }

  getFirstPage(element: HTMLElement): HTMLElement {
    let allElements = this.getAllElements(element);

    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];

      if (element.hasAttribute('@firstPage')) {
        // console.log('ddd');
        return element;
      }
    }

    return element;
    // return this.cvElement
    //   .getElementsByTagName('*')
    //   .namedItem('first-page') as HTMLElement;
  }
  getSecondPage(element: HTMLElement): HTMLElement {
    let allElements = this.getAllElements(element);

    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];

      if (element.hasAttribute('@secondPage')) {
        return element;
      }
    }

    return element;
  }
  getLastPage(element: HTMLElement): HTMLElement {
    let allElements = this.getAllElements(element);

    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];

      if (element.hasAttribute('@lastPage')) {
        return element;
      }
    }

    return element;
  }

  elementContainsAttribute(element: HTMLElement, name: string) {
    return element.attributes.getNamedItem(name) != null;
  }

  getAllElements(element: HTMLElement): HTMLCollectionOf<HTMLElement> {
    return element.getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
  }

  getPageContent(page: HTMLElement): HTMLElement {
    let elements = page.getElementsByTagName('*');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.hasAttribute('@pageContent')) return element as HTMLElement;
    }
    //FIX
    return page;
  }

  initializeBox() {
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid red');
    this.renderer.setStyle(this.el.nativeElement, 'width', '350px');
    this.renderer.setStyle(this.el.nativeElement, 'min-height', '500px');
    this.renderer.setStyle(this.el.nativeElement, 'height', 'auto');
    this.renderer.setStyle(this.el.nativeElement, 'margin-left', '400px');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');



    this.renderer.setStyle(this.cvElement, 'border', '1px solid blue');
    this.renderer.setStyle(this.cvElement, 'width', '350px');
    // this.renderer.setStyle(this.cvElement, 'min-height', '500px');
    // this.renderer.setStyle(this.cvElement, 'height', 'auto');
    this.renderer.setStyle(this.cvElement, 'margin-left', '-370px');
    this.renderer.setStyle(this.cvElement, 'position', 'absolute');


    this.cvTemplate.innerHTML = this.template;
    this.cvTemplate.classList.add('container');
    this.cvElement.classList.add('container');
  }

  createNewElement(element: string, content: string) {
    const pNode = this.renderer.createElement(element);
    const txtNode = this.renderer.createText(content);
    this.renderer.appendChild(pNode, txtNode);
    this.renderer.appendChild(this.el.nativeElement, pNode);
    return pNode;
  }

  insertDataToTemplate() {
    let templateContent = this.getPageContent(this.cvTemplate);
    let allTemplateElements = this.getAllElements(templateContent);

    for (let i = 0; i < allTemplateElements.length; i++) {
      const element = allTemplateElements[i];

      this.dataToInsert.forEach((item) => {
        let itemHasAttribute = this.elementContainsAttribute(
          element,
          item.marker
        );
        if (itemHasAttribute) element.textContent = item.data;
      });
    }
  }
}
