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

  public static elementMarkers: string[] = ['@list', '@listContent', '@removeIfEmpty'];
  public static allMarkers: string[] = this.inputMarkers.concat(this.elementMarkers);
  public static optionalMarkers: string[] = ['@third'];
}
