import { getAllInfo } from "../data/info";
import { getAllPlants } from "../data/plants";
import { getAllQuestions } from "../data/questions";
import { InfoModel } from "../models/infoModel";
import { PlantModel } from "../models/plantModel";
import { QuestionModel } from "../models/questionModel";
import { PlantOnCartModel } from "../models/plantOnCartModel";

export class AppState {
  public display: string = "question";
  public currentQuestion: QuestionModel = new QuestionModel();
  public allQuestions: QuestionModel[] = getAllQuestions();
  public allInfos: InfoModel[] = getAllInfo();
  public allPlants: PlantModel[] = getAllPlants();
  public shoppingCart: PlantOnCartModel[] = [];

  public constructor() {
    const json = sessionStorage.getItem("AppState");
    if (json) {
      const appState: AppState = JSON.parse(json);
      this.display = appState.display;
      this.allQuestions = appState.allQuestions;
      this.allInfos = appState.allInfos;
      this.allPlants = appState.allPlants;
      this.currentQuestion = appState.currentQuestion;
      this.shoppingCart = appState.shoppingCart;
    }
  }
}
