import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import { ExplanationModel } from "../../models/explanationModel";
import { QuestionModel } from "../../models/questionModel";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import "./explanation.css";

interface ExplanationState {
  allExplanations: ExplanationModel[];
  currentQuestion: QuestionModel;
  explanation: ExplanationModel;
}
export class Explanation extends Component<any, ExplanationState> {
  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      allExplanations: [],
      currentQuestion: store.getState().currentQuestion,
      explanation: new ExplanationModel(),
    };

    this.unsubscribeStore = store.subscribe(() => {
      const currentQuestion = store.getState().currentQuestion;
      this.setState({ currentQuestion });
    });
  }

  public async componentDidMount() {
    try {
      const allExplanations: ExplanationModel[] = await store.getState()
        .allExplanations;
      this.setState({ allExplanations });

      const explanation = allExplanations.find(
        (e) => e.id === this.state.currentQuestion.explanationId
      );
      if (explanation) {
        this.setState({ explanation });
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }

  public render() {
    return (
      <div className="explanation">
        <div className="explanation-top-area">
          <img
            className="back-to-question-icon"
            src="./assets/images/BACK_BT.svg"
            onClick={() =>
              store.dispatch({
                type: ActionType.changeDisplay,
                payLoad: "question",
              })
            }
          />
        </div>
        <div className="explanation-bottom-area">
          <span className="explanation-title">
            {this.state.explanation.hebTitle}
          </span>
          <span className="explanation-content">
            {this.state.explanation.hebContent}
          </span>
        </div>
      </div>
    );
  }
}
