import { Injectable } from '@angular/core';
import { IElementService } from './Interfaces/IElementService';

@Injectable()
export class ElementService implements IElementService {
  public elementHasChildren(element: HTMLElement): boolean {
    return element.children.length > 0;
  }

  public cutLastWord(textContent: string): { text: string; lastWord: string } {
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

  public textContentIsWhiteSpace(element: HTMLElement): boolean {
    return element.textContent?.trim() == '';
  }

  public filterMarkers(
    elements: HTMLElement[],
    outputMarkers: string[],
    parentMarker: string
  ): HTMLElement[] {
    let output: HTMLElement[] = [];

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      for (let j = 0; j < outputMarkers.length; j++) {
        const marker = outputMarkers[j];

        if (this.elementHasAttribute(element, marker)) output.push(element);
      }
    }

    if (parentMarker != '') output = this.merge(output, parentMarker);

    return output;
  }

  private merge(elements: HTMLElement[], parentMarker: string) {
    let mergedElements: HTMLElement[] = [];

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (this.parentHasAttribute(element, parentMarker)) mergedElements.push(element);
    }
    return mergedElements;
  }

  private parentHasAttribute(element: HTMLElement, attribute: string): boolean {
    return element.parentElement?.hasAttribute(attribute) as boolean;
  }

  private elementHasAttribute(element: HTMLElement, attributeName: string) {
    return element.attributes.getNamedItem(attributeName) != null;
  }
}
