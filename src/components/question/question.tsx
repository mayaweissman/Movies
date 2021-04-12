import { start } from "node:repl";
import React, { Component } from "react";
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
}

export class Question extends Component<QuestionProps, QuestionState> {
  public constructor(props: QuestionProps) {
    super(props);
    this.state = {
      startX: 0,
      move: 0,
      class: "",
    };
  }

  public handleUserAnswerYes = () => {
    store.dispatch({ type: ActionType.changeDisplay, payLoad: "output" });
  };

  public keepOnSurvey = () => {
    if (this.props.question) {
      store.dispatch({
        type: ActionType.updateCurrentQuestion,
        payLoad: this.props.question.index ? this.props.question.index + 1 : "",
      });
    }
  };

  public slide = (e: any) => {
    const move = e.targetTouches[0].pageX;
    if (this.state.class === "") {
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
      } else {
        if (this.state.move > -80) {
          this.setState({ move: this.state.move - 1 });
        } else {
          this.setState({ class: "slide-right" });
        }
      }
    } 
  };

  public render() {
    return (
      <div className="question">
        <div className="top-question-area">
          <div className="navigation">.....</div>
        </div>
        <div className="bottom-question-area">
          <span className="question-title">{this.props.question.hebTitle}</span>
          <br />

          <div
            className="buttons-area"
            onTouchEnd={() => this.setState({ startX: 0 })}
            onTouchMove={this.slide}
          >
            <div
              style={{ transform: `translateX(${this.state.move}px)` }}
              className={"no-btn " + this.state.class}
              onClick={this.keepOnSurvey}
            >
              No.
            </div>
            <div
              style={{ transform: `translateX(${this.state.move}px)` }}
              className={"yes-btn " + this.state.class}
              onClick={this.handleUserAnswerYes}
            >
              Yes
              {this.state.class === "slide-right" && (
                <span className="after-yes">!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
