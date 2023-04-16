export class ElementService {
  public elementHasChildren(element: HTMLElement) {
    return element.children.length > 0;
  }

  cutLastWord(textContent: string): { text: string; lastWord: string } {
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

  textContentIsWhiteSpace(element: HTMLElement) {
    return element.textContent?.trim() == '';
  }

  filterMarkers(
    elements: HTMLElement[],
    outputMarkers: string[],
    parentMarker: string
  ): HTMLElement[] {
    let toReturn: HTMLElement[] = [];
    // console.log(elements);
    console.log(parentMarker);

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      for (let j = 0; j < outputMarkers.length; j++) {
        const marker = outputMarkers[j];

        if (element.attributes.getNamedItem(marker) != null) toReturn.push(element);
      }
    }

    //fix
    if (parentMarker != '') toReturn = this.merge(toReturn, parentMarker);

    return toReturn;
  }

  public merge(elements: HTMLElement[], parentMarker: string) {
    let mergedElements: HTMLElement[] = [];
    // console.log(this.elements);

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (this.parentHasAttribute(element, parentMarker)) mergedElements.push(element);
    }
    return mergedElements;
  }

  private parentHasAttribute(element: HTMLElement, attribute: string): boolean {
    return element.parentElement?.hasAttribute(attribute) as boolean;
  }
  // filterMarkers(elements: HTMLElement[], outputMarkers: string[], parentMarker: string) {
  //   let toReturn: HTMLElement[] = [];
  //   console.log(elements);

  //   for (let i = 0; i < elements.length; i++) {
  //     const element = elements[i];

  //     for (let j = 0; j < outputMarkers.length; j++) {
  //       const marker = outputMarkers[j];

  //       if (element.attributes.getNamedItem(marker) != null) toReturn.push(element);
  //     }
  //   }
  //   return toReturn;
  // }
  // filterMarkers(elements: HTMLElement[], outputMarkers: string[]) {
  //   let toReturn: HTMLElement[] = [];

  //   for (let i = 0; i < outputMarkers.length; i++) {
  //     let marker = outputMarkers[i];

  //     for (let j = 0; j < elements.length; j++) {
  //       let element = elements[j];
  //       if (element.attributes.getNamedItem(marker) != null) {
  //         toReturn.push(element);
  //       }
  //     }
  //   }
  //   return toReturn;
  // }
}
