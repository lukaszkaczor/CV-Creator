export interface ITemplateEditor {
  // deleteReduntantDataFromLastPage(
  //   page: HTMLElement,
  //   itemClone: HTMLElement
  // ): { itemForNextPage: Node; cutWords: string[] };

  createClone(element: HTMLElement): Node;
  // contentHeightHigherThanPageHeight(page: HTMLElement): boolean;
  // contentHeightLowerThanPageHeight(page: HTMLElement): boolean;
}
