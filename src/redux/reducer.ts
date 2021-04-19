import { AppState } from "./appState";
import { Action } from "./action";
import { ActionType } from "./actionType";
import { act } from "react-dom/test-utils";
import { QuestionModel } from "../models/questionModel";
import { PlantModel } from "../models/plantModel";

export function reducer(oldAppState: AppState, action: Action): AppState {
  const newAppState = { ...oldAppState }; //Duplicate the old state into a new state

  switch (action.type) {
    case ActionType.changeDisplay:
      newAppState.display = action.payLoad;
      break;

    //Add plant to shopping cart or update plant if exist
    case ActionType.addPlantToShoppingCart:
      const isExist = newAppState.shoppingCart.find(p => p.id === action.payLoad.id);
      if (!isExist) {
        action.payLoad.amountOnShoppingCart = 1;
        newAppState.shoppingCart.push(action.payLoad);
      }
      else {
        const index = newAppState.shoppingCart.findIndex(p => p.id === action.payLoad.id);
        newAppState.shoppingCart[index].amountOnShoppingCart = newAppState.shoppingCart[index].amountOnShoppingCart as number + 1;
      }
      break;

    case ActionType.removeFromShoppingCart:
      const index = newAppState.shoppingCart.findIndex(p => p.id === action.payLoad);
      newAppState.shoppingCart.splice(index, 1);
      break;

    case ActionType.changeDisplayForCart:
      if (newAppState.displayCart === false) {
        newAppState.displayCart = true;
      }
      else {
        newAppState.displayCart = false;
      }
      break;

    case ActionType.updateCurrentQuestion:
      if (action.payLoad <= newAppState.allQuestions.length) {
        newAppState.currentQuestion = newAppState.allQuestions.find(q => q.index === action.payLoad) as QuestionModel;
      }
      else {
        newAppState.displayCart = true;
        newAppState.display = 'home';
        newAppState.currentQuestion = newAppState.allQuestions.find(q => q.index === 1) as QuestionModel;
      }
      break;

    default:
      break;
  }

  return newAppState;
}
