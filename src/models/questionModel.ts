export class QuestionModel {
    public constructor(
      public id?: number,
      public index?: number,
      public imgSrc?: string,
      public hebTitle?: string,
      public engTitle?: string, 
      public outputId?: number,
      public infoId?: number,
      public explanationId?: number,
    ) {}
  }
  
  