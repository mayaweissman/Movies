import { MovieModel } from "../models/movieModel";

export class AppState {
    public usersMovies: MovieModel[] = [];
    public displayPopUp: boolean = false;
    public moviesToDisplay: MovieModel[] = [];

    public constructor() {
        const json = sessionStorage.getItem("AppState");
        if (json) {
            const appState: AppState = JSON.parse(json);
            this.usersMovies = appState.usersMovies;
        }
    }
}
