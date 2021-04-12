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
}

export class Question extends Component<QuestionProps, QuestionState> {
  public constructor(props: QuestionProps) {
    super(props);
    this.state = {
      startX: 0,
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
    if (this.state.startX === 0) {
      this.setState({ startX: move });
      return;
    }
    if (move > this.state.startX) {
      console.log("left");
    } else {
      console.log("right");
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
            <div className="no-btn" onClick={this.keepOnSurvey}>
              No.
            </div>
            <div className="yes-btn" onClick={this.handleUserAnswerYes}>
              Yes
            </div>
          </div>
        </div>
      </div>
    );
  }
}
