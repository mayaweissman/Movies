import { AppState } from "./appState";
import { Action } from "./action";
import { ActionType } from "./actionType";
import { act } from "react-dom/test-utils";
import { QuestionModel } from "../models/questionModel";

export function reducer(oldAppState: AppState, action: Action): AppState {
  const newAppState = { ...oldAppState }; //Duplicate the old state into a new state

  switch (action.type) {
    case ActionType.changeDisplay:
      newAppState.display = action.payLoad;
      break;

    case ActionType.updateCurrentQuestion:
      if(action.payLoad <= newAppState.allQuestions.length){
        newAppState.currentQuestion = newAppState.allQuestions.find(q => q.index === action.payLoad) as QuestionModel;
      }
      break;

    default:
      break;
  }

  return newAppState;
}
