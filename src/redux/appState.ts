import { getAllInfo } from "../data/info";
import { getAllOutputs } from "../data/outputs";
import { getAllPlants } from "../data/plants";
import { getAllQuestions } from "../data/questions";
import { InfoModel } from "../models/infoModel";
import { OutputModel } from "../models/outputModel";
import { QuestionModel } from "../models/questionModel";
import { PlantModel } from "../models/plantModel";

export class AppState {
  public display: string = "question";
  public currentQuestion: QuestionModel = new QuestionModel();
  public allQuestions: QuestionModel[] = getAllQuestions();
  public allInfos: InfoModel[] = getAllInfo();
  public allPlants: InfoModel[] = getAllPlants();
  public allOutputs: OutputModel[] = getAllOutputs();
  public shoppingCart: PlantModel[] = [];

  public constructor() {
    const json = sessionStorage.getItem("AppState");
    if (json) {
      const appState: AppState = JSON.parse(json);
      this.display = appState.display;
      this.allQuestions = appState.allQuestions;
      this.allPlants = appState.allPlants;
      this.allInfos = appState.allInfos;
      this.allOutputs = appState.allOutputs;
      this.currentQuestion = appState.currentQuestion;
      this.shoppingCart = appState.shoppingCart;
    }
  }
}
