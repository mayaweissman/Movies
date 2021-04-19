export class ExplanationModel {
  public constructor(
    public id?: number,
    public hebTitle?: string,
    public engTitle?: string,
    public hebContent?: string,
    public engContent?: string,
    public toxins?: number[]
  ) { }
}

