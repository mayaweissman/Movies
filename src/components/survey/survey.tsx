import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { getAllInfo } from "../../data/info";
import { getAllOutputs } from "../../data/outputs";
import { getAllQuestions } from "../../data/questions";
import { InfoModel } from "../../models/infoModel";
import { OutputModel } from "../../models/outputModel";
import { QuestionModel } from "../../models/questionModel";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import { Cart } from "../cart/cart";
import { Explanation } from "../explanation/explanation";
import { Home } from "../home/home";
import { Output } from "../output/output";
import { Question } from "../question/question";
import "./survey.css";

interface SurveyState {
  display: string;
  currentQuestion: QuestionModel;
  allQuestions: QuestionModel[];
  allOutputs: OutputModel[];
  allInfos: InfoModel[];
  displayForCart: boolean
}

export class Survey extends Component<any, SurveyState> {
  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      display: store.getState().display,
      currentQuestion: store.getState().currentQuestion,
      allQuestions: [],
      allOutputs: [],
      allInfos: [],
      displayForCart: store.getState().displayCart
    };

    this.unsubscribeStore = store.subscribe(() => {
      const display = store.getState().display;
      const currentQuestion = store.getState().currentQuestion;
      const displayForCart = store.getState().displayCart;
      this.setState({displayForCart});
      this.setState({ currentQuestion });
      this.setState({ display });
    });
  }


  public async componentDidMount() {
    try {
      this.unsubscribeStore = store.subscribe(() => {
        const display = store.getState().display;
        const currentQuestion = store.getState().currentQuestion;
        const displayForCart = store.getState().displayCart;
        this.setState({displayForCart});
        this.setState({ currentQuestion });
        this.setState({ display });
      });

      const allQuestions = await store.getState().allQuestions;
      this.setState({allQuestions});
      if (!this.state.currentQuestion.id) {
        store.dispatch({ type: ActionType.updateCurrentQuestion, payLoad: 1 });
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
      <div className="survey">
        <img className="ikea-logo" src="./assets/images/IKEA_LOGO.svg" />
        {this.state.display === "question" && (
          <Question question={this.state.currentQuestion} />
        )}
        {this.state.display === "output" && <Output />}
        {this.state.display === "explanation" && <Explanation />}
        {this.state.display === "home" && <Home />}
        {this.state.displayForCart && <Cart />}
        
      </div>
    );
  }
}
