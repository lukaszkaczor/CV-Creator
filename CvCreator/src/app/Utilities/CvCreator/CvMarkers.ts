export abstract class CvMarkers {
  public static inputMarkers: string[] = [
    '@description',
    '@firstName',
    '@lastName',
    '@placeholder',
    '@first',
    '@second',
    '@third',
  ];

  public static singleInputMarkers = this.inputMarkers;
  public static elementMarkers: string[] = [
    '@list',
    '@listContent',
    '@removeIfEmpty',
    '@contentlist',
    '@elementList',
  ];
  public static allMarkers: string[] = this.inputMarkers.concat(this.elementMarkers);
  public static optionalMarkers: string[] = ['@third'];
}
