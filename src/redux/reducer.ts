import { AppState } from "./appState";
import { Action } from "./action";
import { ActionType } from "./actionType";


export function reducer(oldAppState: AppState, action: Action): AppState {

    const newAppState = { ...oldAppState }; //Duplicate the old state into a new state

    switch (action.type) {

        case ActionType.addMovieToUsersMovies:
            newAppState.usersMovies.push(action.payLoad);
            break;

        case ActionType.getMovies:
            newAppState.moviesToDisplay = action.payLoad;
            break;

        case ActionType.removeMovieFromUsersMovies:
            const index = newAppState.usersMovies.findIndex(m => m.imdbID === action.payLoad);
            newAppState.usersMovies.splice(index, 1);
            break;

        case ActionType.changeDisplayForPopUp:
            if (newAppState.displayPopUp) {
                newAppState.displayPopUp = false;
            }
            else {
                newAppState.displayPopUp = true;
            }
            break;



        default: break;
    }

    return newAppState;
}
