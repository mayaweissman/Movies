import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { OutputModel } from "../../models/outputModel";
import { PlantModel } from "../../models/plantModel";
import { QuestionModel } from "../../models/questionModel";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import "./output.css";

interface OutputState {
  output: OutputModel;
  currentQuestion: QuestionModel;
  plants: PlantModel[];
}

export class Output extends Component<any, OutputState> {
  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      output: new OutputModel(),
      currentQuestion: store.getState().currentQuestion,
      plants: [],
    };

    this.unsubscribeStore = store.subscribe(() => {
      const currentQuestion = store.getState().currentQuestion;
      this.setState({ currentQuestion });
    });
  }

  public async componentDidMount() {
    try {
      this.unsubscribeStore = store.subscribe(() => {
        const currentQuestion = store.getState().currentQuestion;
        this.setState({ currentQuestion });
      });
      const allOutputs: OutputModel[] = store.getState().allOutputs;
      const output: OutputModel = allOutputs.find(
        (o) => o.id === this.state.currentQuestion.outputId
      ) as OutputModel;
      this.setState({ output });

      const allPlants: PlantModel[] = await store.getState().allPlants;
      const plants = [];
      for (const id of output.plantsIds as []) {
        for (const p of allPlants) {
          if (p.id === id) {
            plants.push(p);
          }
        }
      }

      this.setState({ plants });
    } catch (err) {
      console.log(err.message);
    }
  }

  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }

  public keepOnSurvey = () => {
    store.dispatch({ type: ActionType.changeDisplay, payLoad: "question" });
    store.dispatch({
      type: ActionType.updateCurrentQuestion,
      payLoad: this.state.currentQuestion.index
        ? this.state.currentQuestion.index + 1
        : "",
    });
  };

  public render() {
    return (
      <div className="output">
        {this.state.plants.map((p) => (
          <div className="plant">{p.hebTitle}</div>
        ))}
        <button onClick={this.keepOnSurvey}>חזרה לשאלון</button>
      </div>
    );
  }
}
