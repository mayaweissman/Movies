import { Store } from "redux";
import { AppState } from "./appState";
import { Action } from "./action";

export const saveToSessionStorage = (store: { getState: () => any; }) => (next: (arg0: any) => void) => (action: any) => {
    next(action);
    sessionStorage.setItem("AppState", JSON.stringify(store.getState()));
};
