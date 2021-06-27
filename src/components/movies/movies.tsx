import React, { Component } from "react";
import { MovieModel } from "../../models/movieModel";
import "./movies.scss";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";
import { MoviePopUp } from "../movie-pop-up/movie-pop-up";
import { ActionType } from "../../redux/actionType";

interface MoviesProps {
  text: string;
}

interface MoviesState {
  displayPopUp: boolean;
  movies: MovieModel[];
  movieToPopUp: MovieModel;
}

export class Movies extends Component<MoviesProps, MoviesState> {
  private unsubscribeStore: Unsubscribe;

  public constructor(props: MoviesProps) {
    super(props);
    this.state = {
      displayPopUp: store.getState().displayPopUp,
      movies: store.getState().moviesToDisplay,
      movieToPopUp: new MovieModel(),
    };

    //Subscribe to store
    this.unsubscribeStore = store.subscribe(() => {
      const displayPopUp = store.getState().displayPopUp;
      const movies = store.getState().moviesToDisplay;
      this.setState({ displayPopUp });
      this.setState({ movies });
    });
  }

  public componentDidMount() {
    this.unsubscribeStore = store.subscribe(() => {
      const displayPopUp = store.getState().displayPopUp;
      const movies = store.getState().moviesToDisplay;
      this.setState({ displayPopUp });
      this.setState({ movies });
    });
  }

  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }

  public openPopUp = (movie: MovieModel) => (event: any) => {
    this.setState({ movieToPopUp: movie });
    store.dispatch({ type: ActionType.changeDisplayForPopUp });
  };

  //Return if movie already on user's list
  public isOnFavorites = (movie: MovieModel) => {
    const usersMovies: MovieModel[] = store.getState().usersMovies;
    const isExist = usersMovies.find((m) => m.imdbID === movie.imdbID);
    if (isExist) {
      return true;
    }
    return false;
  };


  //Toggle for movie on user's list - Remove from list if exist / insert if not.
  public handleToggleForMovieOnUsersList =
    (movie: MovieModel) => (event: any) => {

      //Do not open movie pop up
      event.stopPropagation();
      let isExist = this.isOnFavorites(movie);
      if (isExist) {
        store.dispatch({
          type: ActionType.removeMovieFromUsersMovies,
          payLoad: movie.imdbID,
        });
        return;
      }
      store.dispatch({
        type: ActionType.addMovieToUsersMovies,
        payLoad: movie
      });
    };

  public render() {
    return (
      <div className="movies">
        {!this.props.text && (
          <div className="movies-container">
            {this.state.movies.map((m) => (
              <div className="movie" key={m.imdbID} onClick={this.openPopUp(m)}>
                {m.Poster !== "N/A" && <img src={m.Poster} />}
                {m.Poster === "N/A" && (
                  <div className="no-img">No img to movie</div>
                )}
                <div className="title-area">
                  <span className="movie-title">{m.Title}</span>
                </div>
                <span className="movie-year">{m.Year}</span>
                <button onClick={this.handleToggleForMovieOnUsersList(m)}>
                  {this.isOnFavorites(m) ? (
                    <>
                      Remove from favorites <StarBorderIcon />
                    </>
                  ) : (
                    <>
                      Add to favorites <StarBorderIcon />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        <span className="no-movies-txt">
          {this.props.text && this.props.text}
        </span>
        
        {this.state.displayPopUp && (
          <MoviePopUp movie={this.state.movieToPopUp} />
        )}
      </div>
    );
  }
}
