export class PlantModel {
  public constructor(
    public id?: number,
    public mobileImgSrc?: string,
    public desktopImgSrc?: string,
    public hebTitle?: string,
    public engTitle?: string,
    public hebContent?: string,
    public engContent?: string,
    public price?: number,
    public size?: string,
    public code?: number,
    public toxins?: number[],
    public amountOnShoppingCart?: number
  ) { }
}

