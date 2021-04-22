import { getAllInfo } from "../data/info";
import { getAllOutputs } from "../data/outputs";
import { getAllPlants } from "../data/plants";
import { getAllQuestions } from "../data/questions";
import { InfoModel } from "../models/infoModel";
import { OutputModel } from "../models/outputModel";
import { QuestionModel } from "../models/questionModel";
import { PlantModel } from "../models/plantModel";
import { ToxinModel } from "../models/toxinModel";
import { getAllToxins } from "../data/toxins";
import { ExplanationModel } from "../models/explanationModel";
import { getAllExplanations } from "../data/explanations";

export class AppState {
  public display: string = "home";
  public currentQuestion: QuestionModel = new QuestionModel();
  public allQuestions: QuestionModel[] = getAllQuestions();
  public allInfos: InfoModel[] = getAllInfo();
  public allPlants: InfoModel[] = getAllPlants();
  public allOutputs: OutputModel[] = getAllOutputs();
  public allToxins: ToxinModel[] = getAllToxins();
  public allExplanations: ExplanationModel[] = getAllExplanations();
  public shoppingCart: PlantModel[] = [];
  public displayCart: boolean = false;

  public constructor() {
    const json = sessionStorage.getItem("AppState");
    if (json) {
      const appState: AppState = JSON.parse(json);
      this.display = appState.display;
      this.allQuestions = appState.allQuestions;
      this.allPlants = appState.allPlants;
      this.allInfos = appState.allInfos;
      this.allOutputs = appState.allOutputs;
      this.allExplanations = appState.allExplanations;
      this.allToxins = appState.allToxins;
      this.currentQuestion = appState.currentQuestion;
      this.shoppingCart = appState.shoppingCart;
    }
  }
}