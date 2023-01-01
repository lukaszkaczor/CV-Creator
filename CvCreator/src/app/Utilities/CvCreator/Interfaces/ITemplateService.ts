export interface ITemplateService {
  getAllElements(template: HTMLElement): HTMLElement[];
  // getAllElements(template: HTMLElement): HTMLCollectionOf<HTMLElement>;
  getFirstPage(template: HTMLElement): HTMLElement;
  getSecondPage(template: HTMLElement): HTMLElement;
  getLastPage(template: HTMLElement): HTMLElement;
  getPageContent(page: HTMLElement): HTMLElement;
}
