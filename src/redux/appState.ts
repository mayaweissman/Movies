import { getAllInfo } from "../data/info";
import { getAllOutputs } from "../data/outputs";
import { getAllQuestions } from "../data/questions";
import { InfoModel } from "../models/infoModel";
import { OutputModel } from "../models/outputModel";
import { QuestionModel } from "../models/questionModel";

export class AppState {
  public display: string = "question";
  public currentQuestion: QuestionModel = new QuestionModel();
  public allQuestions: QuestionModel[] = getAllQuestions();
  public allInfos: InfoModel[] = getAllInfo();
  public allOutputs: OutputModel[] = getAllOutputs();

  public constructor() {
    const json = sessionStorage.getItem("AppState");
    if (json) {
      const appState: AppState = JSON.parse(json);
      this.display = appState.display;
      this.allQuestions = appState.allQuestions;
      this.allInfos = appState.allInfos;
      this.allOutputs = appState.allOutputs;
      this.currentQuestion = appState.currentQuestion;
    }
  }
}
