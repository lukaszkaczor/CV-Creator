import { ITemplateService } from './Interfaces/ITemplateService';

export class TemplateService implements ITemplateService {
  getAllElements(template: HTMLElement): HTMLElement[] {
    return Array.from(template.getElementsByTagName('*')) as HTMLElement[];
  }

  getFirstPage(element: HTMLElement): HTMLElement {
    return this.findElementWithAttribute(element, '@firstPage');
  }

  getSecondPage(element: HTMLElement): HTMLElement {
    return this.findElementWithAttribute(element, '@secondPage');
  }

  getPageContent(page: HTMLElement): HTMLElement {
    return this.findElementWithAttribute(page, '@pageContent');
  }

  createClone(item: HTMLElement): HTMLElement {
    return item.cloneNode(true) as HTMLElement;
  }

  getPaddingVaules(element: HTMLElement) {
    const style = window.getComputedStyle(element);
    return {
      paddingTop: Math.round(parseFloat(style.paddingTop)),
      paddingBottom: Math.round(parseFloat(style.paddingBottom)),
    };
  }

  contentHeightHigherThanPageHeight(page: HTMLElement) {
    const content = this.getPageContent(page);
    const padding = this.getPaddingVaules(page);

    return content.offsetHeight > page.offsetHeight - padding.paddingTop - padding.paddingBottom;
  }

  contentHeightLowerThanPageHeight(page: HTMLElement) {
    const content = this.getPageContent(page);
    const padding = this.getPaddingVaules(page);

    return content.offsetHeight < page.offsetHeight - padding.paddingTop - padding.paddingBottom;
  }

  private findElementWithAttribute(element: HTMLElement, attribute: string): HTMLElement {
    const list = this.getAllElements(element);

    for (let i = 0; i < list.length; i++) if (list[i].hasAttribute(attribute)) return list[i];

    throw new Error(`Cannot find attribute: ${attribute} in given element.`);
  }
}
