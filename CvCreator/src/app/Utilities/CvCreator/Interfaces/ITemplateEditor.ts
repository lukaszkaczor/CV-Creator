export interface ITemplateEditor {
  // deleteReduntantDataFromLastPage(
  //   page: HTMLElement,
  //   itemClone: HTMLElement
  // ): { itemForNextPage: Node; cutWords: string[] };
  deleteReduntantDataFromPage(page: HTMLElement, currentItemClone: HTMLElement): HTMLElement;

  // createClone(element: HTMLElement): Node;
  // contentHeightHigherThanPageHeight(page: HTMLElement): boolean;
  // contentHeightLowerThanPageHeight(page: HTMLElement): boolean;
}
