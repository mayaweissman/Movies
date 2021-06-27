import React, { Component } from "react";
import { MovieModel } from "../../models/movieModel";
import "./movie-pop-up.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/actionType";

interface MoviePopUpProps {
  movie: MovieModel;
}

interface MoviePopUpState {
  plot: {
    short: string;
    full: string;
  };
  plotDisplay: string;
  showLoader: boolean;
}

export class MoviePopUp extends Component<MoviePopUpProps, MoviePopUpState> {
  public constructor(props: MoviePopUpProps) {
    super(props);
    this.state = {
      plot: {
        short: "",
        full: "",
      },
      plotDisplay: "short",
      showLoader: false,
    };
  }

  public async componentDidMount() {
    try {

      //Get Plots for movie from API
      this.setState({ showLoader: true });
      const responseForShort = await axios.get(
        `http://www.omdbapi.com/?apikey=99890933&i=${this.props.movie.imdbID}`
      );
      const responseForFull = await axios.get(
        `http://www.omdbapi.com/?apikey=99890933&i=${this.props.movie.imdbID}&plot=full`
      );
      const fullPlot = responseForFull.data.Plot;
      const shortPlot = responseForShort.data.Plot;
      const plot = { ...this.state.plot };
      plot.short = shortPlot;
      plot.full = fullPlot;
      this.setState({ plot });
    } catch (err) {
      console.log(err.message);
    } finally {
      //Hide loader on finish
      this.setState({ showLoader: false });
    }
  }

  public render() {
    return (
      <div className="pop-up">
        <div className="inside-pop-up">
          <button
            className="close-btn"
            onClick={() =>
              store.dispatch({ type: ActionType.changeDisplayForPopUp })
            }
          >
            <CloseIcon />
          </button>

          <div className="movie-info">
            <div className="movie-main-info">
              <span className="movie-title">{this.props.movie.Title}</span>
              <span className="movie-year">{this.props.movie.Year}</span>
            </div>

            {this.props.movie.Poster !== "N/A" && (
              <img src={this.props.movie.Poster} />
            )}
            {this.props.movie.Poster === "N/A" && (
              <div className="no-img">No img to movie</div>
            )}
          </div>

          <div className="plot-area">
            {this.state.showLoader && (
              <img src="./assets/images/horizontal-lodaer.gif" className="plot-loader"/>
            )}
            <div className="plot">
              {this.state.plotDisplay === "short"
                ? this.state.plot.short
                : this.state.plot.full}
            </div>
            <button
              onClick={
                this.state.plotDisplay === "short"
                  ? () => this.setState({ plotDisplay: "full" })
                  : () => this.setState({ plotDisplay: "short" })
              }
            >
              {this.state.plotDisplay === "short" ? (
                <>
                  Full plot <ExpandMoreIcon />{" "}
                </>
              ) : (
                <>
                  Short plot <ExpandLessIcon />{" "}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
