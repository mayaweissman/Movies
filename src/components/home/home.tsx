import React, { ChangeEvent, Component } from "react";
import "./home.scss";
import axios from "axios";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { MovieModel } from "../../models/movieModel";
import { Movies } from "../movies/movies";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/actionType";

interface MoviesState {
  username: string;
  isUserStartTyping: boolean;
  showLoader: boolean;
  textOnNoMovies: string;
  screenWidth: number;
}

export class Home extends Component<any, MoviesState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      isUserStartTyping: false,
      showLoader: false,
      textOnNoMovies: "",
      screenWidth: 0,
    };
  }

  public componentDidMount() {
    //If have no username key on session storage take user back to login page
    const username = sessionStorage.getItem("username");
    if (!username) {
      this.props.history.push("/login");
    } else {
      this.setState({ username });
    }

    const usersMovies = store.getState().moviesToDisplay;
    if (usersMovies.length > 0) {
      this.setState({ isUserStartTyping: true });
      this.setState({ textOnNoMovies: "" });
    }
    this.setState({ screenWidth: window.screen.width });
  }

  public searchMovies = async (args: ChangeEvent<HTMLInputElement>) => {
    try {
      //Show loader on start searching
      this.setState({ showLoader: true });
      const searchVal = args.target.value;
      if (searchVal) {
        //Get movies from OMDb API
        this.setState({ isUserStartTyping: true });
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=99890933&s=${searchVal}&page=`
        );
        const moviesData = response.data;

        //If got no movies from API
        if (moviesData.Response === "False") {
          this.setState({ textOnNoMovies: moviesData.Error });
        } else {
          const movies: MovieModel[] = moviesData.Search;
          this.setState({ textOnNoMovies: "" });
          store.dispatch({ type: ActionType.getMovies, payLoad: movies });
        }
      } else {
        this.setState({ isUserStartTyping: false });
        this.setState({ textOnNoMovies: "" });
        store.dispatch({ type: ActionType.getMovies, payLoad: [] });
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      //Hide loader on finish searching
      this.setState({ showLoader: false });
      if (!args.target.value) {
        this.setState({ textOnNoMovies: "" });
      }
    }
  };

  public displayUsersMovies = () => {
    this.setState({ isUserStartTyping: true });
    const usersMovies = store.getState().usersMovies;
    store.dispatch({ type: ActionType.getMovies, payLoad: usersMovies });

    if (usersMovies.length > 0) {
      this.setState({ textOnNoMovies: "" });
    } else {
      this.setState({ textOnNoMovies: "No favorites movies selected" });
    }
  };

  public render() {
    return (
      <div className="home">
        <header>
          <span className="username">Hello {this.state.username}!</span>
          <input
            placeholder="Search movies"
            className={this.state.isUserStartTyping ? "active" : ""}
            onInput={this.searchMovies}
          />
          <button onClick={this.displayUsersMovies}>
            {" "}
            {this.state.screenWidth > 700 && (
              <>
                <StarBorderIcon />
                My movies
              </>
            )}
            {this.state.screenWidth < 700 && <StarBorderIcon fontSize='large'/>}
          </button>
        </header>

        <main>
          {this.state.showLoader && <img src="./assets/images/loader.gif" />}
          {!this.state.showLoader && (
            <Movies text={this.state.textOnNoMovies} />
          )}
        </main>
      </div>
    );
  }
}
