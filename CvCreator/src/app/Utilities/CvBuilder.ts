export class CvBuilder {
  private _node: HTMLElement;
  private _template: HTMLElement;
  private _pages: [] = [];
  private _temp: HTMLElement;

  private _cv: HTMLElement;

  firstName = 'Imie';
  lastName = 'Nazwisko';
  list = [
    { id: 1, text: 'jeden' },
    { id: 2, text: 'dwa' },
  ];

  constructor(template: HTMLElement, cv: HTMLElement, temp: HTMLElement) {
    this._template = template;
    this._cv = cv;
    this._temp = temp;
  }

  public build() {
    // this._temp = this.getClone(
    //   this.getPage(this._template, 'first-page').outerHTML
    // );

    var current = this.getClone(
      this.getPage(this._template, 'first-page').outerHTML
    );

    console.log(this._temp.clientHeight);
    this._temp.innerHTML += current.outerHTML;
    console.log(this._temp.clientHeight);

    // console.log(this.getAllChildren(this._temp));
    // this.getChild(this._temp, 'firstName').textContent = 'W----';
    // this._cv.innerHTML += this._temp.innerHTML;

    console.log(
      this.getPageContentHeight(this._temp),
      this.getPageContentActualHeight(this._temp)
    );

    // console.log(this.getClone(this.getFirstPage().outerHTML));
    // this._cc.innerHTML += this.getClone(
    //   this.getFirstPage().outerHTML
    // ).outerHTML;
    // this.getChild(this.getFirstPage(), 'firstName').textContent =
    //   this.firstName;
    // var parser = new DOMParser();
    // let re = parser.parseFromString(this.getFirstPage().outerHTML, 'text/html');
    // console.log(re.body as HTMLElement);
    // // var ds = document.createElement(this.getFirstPage().innerHTML);
    // var dd = this.getMiddlePage().outerHTML;
    // this._cc.innerHTML += dd;
    // this._cc.innerHTML += re.body.innerHTML;
    // console.log(this._cc);
    // console.log(
    //   this.getFirstPageContentHeight(),
    //   this.getFirstPageContentActualSize()
    // );
  }

  getPageContentHeight(node: HTMLElement) {
    return this.getChild(node, 'box').clientHeight;
  }
  getPageContentActualHeight(node: HTMLElement) {
    return this.getChild(node, 'content1').clientHeight;
  }

  getClone(text: string) {
    const parser = new DOMParser();
    return parser.parseFromString(text, 'text/html').body;
  }

  private getAllChildren(node: HTMLElement = this._node) {
    return node.getElementsByTagName('*');
  }

  getChild(node: HTMLElement = this._node, id: string): HTMLElement {
    const children: any = this.getAllChildren(node);

    return children[id];
  }

  getPage(node: HTMLElement, pageName: string): HTMLElement {
    const pages: any = this.getAllChildren(node);
    return pages[pageName];
  }

  getFirstPage(node: HTMLElement): HTMLElement {
    const pages: any = this.getAllChildren(node);
    return pages['first-page'];
  }
  getMiddlePage(): HTMLElement {
    const pages: any = this.getAllChildren();
    return pages['middle-page'];
  }

  // getFirstPageContentHeight() {
  //   return this.getChild(this.getFirstPage(), 'box').clientHeight;
  // }
  // getFirstPageContentActualSize() {
  //   return this.getChild(this.getFirstPage(), 'content1').clientHeight;
  // }

  getContent(page: HTMLElement) {}

  getElementHeight(element: HTMLElement) {
    return element.clientHeight;
  }

  getAllPages(): HTMLCollectionOf<Element> {
    return this._node.getElementsByTagName('*');
  }
}
