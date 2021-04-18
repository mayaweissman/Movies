import { start } from "node:repl";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import { PlantModel } from "../../models/plantModel";
import { QuestionModel } from "../../models/questionModel";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import "./question.css";

interface QuestionProps {
  question: QuestionModel;
}

interface QuestionState {
  startX: number;
  move: number;
  class: string;
  allQuestions: QuestionModel[];
  shoppingCart: PlantModel[]
}

export class Question extends Component<QuestionProps, QuestionState> {

  private unsubscribeStore: Unsubscribe;

  public constructor(props: QuestionProps) {
    super(props);
    this.state = {
      startX: 0,
      move: 0,
      class: "",
      allQuestions: [],
      shoppingCart: store.getState().shoppingCart
    };

    this.unsubscribeStore = store.subscribe(() => {
      const shoppingCart = store.getState().shoppingCart;
      this.setState({ shoppingCart });
    });
  }

  public componentDidMount() {
    const allQuestions = store.getState().allQuestions;
    this.setState({ allQuestions });
  }


  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }


  public handleUserAnswerYes = () => {
    store.dispatch({ type: ActionType.changeDisplay, payLoad: "output" });
    this.setState({ class: "" });
  };

  public keepOnSurvey = () => {
    if (this.props.question) {
      store.dispatch({
        type: ActionType.updateCurrentQuestion,
        payLoad: this.props.question.index ? this.props.question.index + 1 : "",
      });
      this.setState({ class: "" });
    }
  };

  public slide = (e: any) => {
    const move = e.targetTouches[0].pageX;
    if (this.state.startX === 0) {
      this.setState({ startX: move });
      return;
    }
    if (move > this.state.startX) {
      if (this.state.move < 80) {
        this.setState({ move: this.state.move + 1 });
      } else {
        this.setState({ class: "slide-left" });
      }
      if (this.state.class === "slide-right") {
        this.setState({ class: "back-from-left" });
        setTimeout(() => {
          this.setState({ class: "" });
        }, 1000);
      }
    } else {
      if (this.state.move > -80) {
        this.setState({ move: this.state.move - 1 });
        // this.setState({class: "back-from-right"});
      } else {
        this.setState({ class: "slide-right" });
      }
      if (this.state.class === "slide-left") {
        this.setState({ class: "back-from-right" });
        setTimeout(() => {
          this.setState({ class: "" });
        }, 1000);
      }
    }
  };

  public isOnLastQuestion = () => {
    const allQuestionsLength = store.getState().allQuestions.length;
    const currentQuestion = { ...this.props.question };
    if (currentQuestion?.index as number === allQuestionsLength) {
      return true;
    }

    return false;
  }


  public render() {
    return (
      <div className="question">
        <div className="top-question-area">
          <div className="navigation">
            {this.state.allQuestions.map((q) => (
              <div
                className={
                  q.index === this.props.question.index ? "dot active" : "dot"
                }
              ></div>
            ))}
          </div>
          <NavLink className="back-to-home-btn" to="/home">
            <img
              className="back-to-home-icon"
              src="./assets/images/BACK_BT.svg"
            />
          </NavLink>

          {this.state.shoppingCart.length > 0 && <img
            className="wishlist-icon"
            src="./assets/images/WISHLIST_ICON.svg"
            onClick={() => store.dispatch({ type: ActionType.changeDisplayForCart })}
          />}
        </div>
        <div className="bottom-question-area">
          <span className="question-title">{this.props.question.hebTitle}</span>
          <br />

          <div className="buttons-area">
            {!this.isOnLastQuestion() && <button className="no-btn" onClick={this.keepOnSurvey}>
              לא
            </button>}
            {this.isOnLastQuestion() && <button className="no-btn" onClick={this.handleUserAnswerYes}>
              לא
            </button>}
            <button className="yes-btn" onClick={this.handleUserAnswerYes}>
              כן
            </button>
          </div>
          <span
            onClick={() =>
              store.dispatch({
                type: ActionType.changeDisplay,
                payLoad: "explanation",
              })
            }
            className="why-does-it-matter"
          >
            למה זה משנה?
          </span>
        </div>
      </div>
    );
  }
}
