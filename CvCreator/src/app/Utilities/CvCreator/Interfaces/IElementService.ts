export interface IElementService {
  elementHasChildren(element: HTMLElement): boolean;
  cutLastWord(textContent: string): { text: string; lastWord: string };
  textContentIsWhiteSpace(element: HTMLElement): boolean;
  filterMarkers(
    elements: HTMLElement[],
    outputMarkers: string[],
    parentMarker: string
  ): HTMLElement[];
}
