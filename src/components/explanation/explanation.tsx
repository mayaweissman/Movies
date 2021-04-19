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

  public getImgSrc = (toxinId: number) => {
    let imgSrc = `toxin-${toxinId}-stroke.svg`;
    if (this.state.explanation.toxins) {
      for (const t of this.state.explanation.toxins) {
        if (t === toxinId) {
          imgSrc = `toxin-${toxinId}.svg`;
        }
      }
    }

    return imgSrc;
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
          <img className="wood-exp" src="./assets/images/tree-branch.svg" />
          <img className="bucket-exp" src="./assets/images/bucket.svg" />
          <img className="exp-bz exp-leaf" src={"./assets/images/" + this.getImgSrc(1)} />
          <img className="exp-tr exp-leaf" src={"./assets/images/" + this.getImgSrc(2)} />
          <img className="exp-fh exp-leaf" src={"./assets/images/" + this.getImgSrc(3)} />
          <img className="exp-xy exp-leaf" src={"./assets/images/" + this.getImgSrc(4)} />
          <img className="exp-am exp-leaf" src={"./assets/images/" + this.getImgSrc(5)} />
        </div>
        <div className="explanation-bottom-area">
          <span className="explanation-title">
          למה זה משנה?
          </span>
          <span className="explanation-content">
            {this.state.explanation.hebContent}
          </span>
        </div>
      </div>
    );
  }
}
