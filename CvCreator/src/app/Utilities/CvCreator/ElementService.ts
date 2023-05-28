import { Injectable } from '@angular/core';
import { IElementService } from './Interfaces/IElementService';
import { CvOutputElementType } from './CvOutputElementType';
import { CvMarkers } from './CvMarkers';

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

  getElementType(item: HTMLElement): CvOutputElementType {
    const attributes = item.attributes;

    let type = CvOutputElementType.None;

    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];

      if (attribute.name.startsWith('@list')) {
        type = CvOutputElementType.List;
        break;
      } else if (this.attributeIsInList(attribute.name)) {
        type = CvOutputElementType.SingleElement;
        break;
      }
    }

    return type;
  }

  private attributeIsInList(attribute: string): boolean {
    return CvMarkers.inputMarkers.some((marker) =>
      marker.toLowerCase().includes(attribute.toLowerCase())
    );
  }
}
