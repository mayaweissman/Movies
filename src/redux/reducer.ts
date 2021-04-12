import { AppState } from "./appState";
import { Action } from "./action";
import { ActionType } from "./actionType";
import { act } from "react-dom/test-utils";
import { QuestionModel } from "../models/questionModel";
import { PlantOnCartModel } from "../models/plantOnCartModel";

export function reducer(oldAppState: AppState, action: Action): AppState {
  const newAppState = { ...oldAppState }; //Duplicate the old state into a new state

  switch (action.type) {
    case ActionType.changeDisplay:
      newAppState.display = action.payLoad;
      break;

    //Add plant to shopping cart or update plant if exist
    case ActionType.addPlantToShoppingCart:
      const index = newAppState.shoppingCart.findIndex(p => p.plantId === action.payLoad.id);
      if (index >= 0) {
        const shoppingCart = [...newAppState.shoppingCart];
        shoppingCart[index].count = shoppingCart[index].count as number + 1;
        newAppState.shoppingCart = shoppingCart;
      }
      else {
        const plant = new PlantOnCartModel(newAppState.shoppingCart.length + 1, action.payLoad.id, 1);
        newAppState.shoppingCart.push(plant);
      }
      break;

    case ActionType.updateCurrentQuestion:
      if (action.payLoad <= newAppState.allQuestions.length) {
        newAppState.currentQuestion = newAppState.allQuestions.find(q => q.index === action.payLoad) as QuestionModel;
      }
      else{
        newAppState.display = 'cart';
      }
      break;

    default:
      break;
  }

  return newAppState;
}
