export interface ICvDataManager {
  // insertDataToMarkers(
  //   allElements: HTMLElement[],
  //   // allElements: HTMLCollectionOf<HTMLElement>,
  //   dataToInsert: any[]
  // ): ICvDataManager;
  insertDataToMarkers(
    allElements: HTMLElement[],
    // allElements: HTMLCollectionOf<HTMLElement>,
    dataToInsert: any[]
  ): HTMLElement[];

  merge(): HTMLElement[];
}
