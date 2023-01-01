export interface ICvDataManager {
  insertDataToMarkers(
    allElements: HTMLElement[],
    // allElements: HTMLCollectionOf<HTMLElement>,
    dataToInsert: any[]
  ): ICvDataManager;

  merge(): HTMLElement[];
}
