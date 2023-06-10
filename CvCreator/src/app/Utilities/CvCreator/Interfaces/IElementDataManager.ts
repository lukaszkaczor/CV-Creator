import { CvOutputElementType } from '../CvOutputElementType';

export interface IElementDataManager {
  readonly type: CvOutputElementType;
  insertDataToElement(element: HTMLElement, data: any[]): HTMLElement;
}
