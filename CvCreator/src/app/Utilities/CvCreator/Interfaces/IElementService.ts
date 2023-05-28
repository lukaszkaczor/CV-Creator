import { CvOutputElementType } from '../CvOutputElementType';

export interface IElementService {
  elementHasChildren(element: HTMLElement): boolean;
  cutLastWord(textContent: string): { text: string; lastWord: string };
  textContentIsWhiteSpace(element: HTMLElement): boolean;
  getElementType(element: HTMLElement): CvOutputElementType;
}
