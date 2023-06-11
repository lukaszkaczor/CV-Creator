import { IDataMerger } from './Interfaces/IDataMerger';

export class HtmlElementMerger implements IDataMerger {
  public merge(elements: HTMLElement[]): HTMLElement[] {
    let mergedElements: HTMLElement[] = [];

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (this.parentHasAttribute(element, '@pageContent')) mergedElements.push(element);
    }
    return mergedElements;
  }

  private parentHasAttribute(element: HTMLElement, attribute: string): boolean {
    return element.parentElement?.hasAttribute(attribute) as boolean;
  }
}
