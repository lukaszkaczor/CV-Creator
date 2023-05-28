export interface ITemplateService {
  getAllElements(template: HTMLElement): HTMLElement[];
  getFirstPage(template: HTMLElement): HTMLElement;
  getSecondPage(template: HTMLElement): HTMLElement;
  getPageContent(page: HTMLElement): HTMLElement;
  createClone(item: HTMLElement): HTMLElement;
  contentHeightHigherThanPageHeight(page: HTMLElement): boolean;
  contentHeightLowerThanPageHeight(page: HTMLElement): boolean;
}
