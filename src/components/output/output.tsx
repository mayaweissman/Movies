import { position } from "html2canvas/dist/types/css/property-descriptors/position";
import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { OutputModel } from "../../models/outputModel";
import { PlantModel } from "../../models/plantModel";
import { QuestionModel } from "../../models/questionModel";
import { ToxinModel } from "../../models/toxinModel";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import "./output.css";

interface OutputState {
  output: OutputModel;
  currentQuestion: QuestionModel;
  plants: PlantModel[];
  currentPlant: PlantModel;
  nextPlant: PlantModel;
  allToxins: ToxinModel[];
  classes: { current: string; next: string };
}

export class Output extends Component<any, OutputState> {
  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      output: new OutputModel(),
      currentQuestion: store.getState().currentQuestion,
      plants: [],
      currentPlant: new PlantModel(),
      nextPlant: new PlantModel(),
      allToxins: [],
      classes: { current: "", next: "" },
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

      const allToxins = store.getState().allToxins;
      this.setState({ allToxins });

      this.setState({ currentPlant: plants[0] });
      this.setState({ nextPlant: plants[1] });
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

  public isHelpForToxin = (toxinId: number) => {
    const tox = this.state.currentPlant.toxins?.find((t) => t === toxinId);
    if (tox) {
      return true;
    }
    return false;
  };

  public moveToNextPlant = () => {
    const plants = this.state.plants;
    const index = plants.findIndex((p) => p.id === this.state.currentPlant.id);
    if (index !== this.state.plants.length - 1) {
      this.setState({ nextPlant: this.state.currentPlant });
      const currentPlant = plants[index + 1];
      this.setState({ currentPlant });

      const classes = { ...this.state.classes };
      classes.current = "slide-right";
      classes.next = "slide-right";
      this.setState({ classes });
      setTimeout(() => {
        const classes = { ...this.state.classes };
        classes.current = "";
        classes.next = "";
        this.setState({ classes });
      }, 1000);
    }
  };

  public moveToPrePlant = () => {
    const plants = this.state.plants;
    const index = plants.findIndex((p) => p.id === this.state.currentPlant.id);
    if (index !== 0) {
      const classes = { ...this.state.classes };
      classes.current = "slide-left";
      classes.next = "slide-left";
      this.setState({ classes });

      this.setState({ nextPlant: this.state.currentPlant });
      const currentPlant = plants[index - 1];
      this.setState({ currentPlant });

      setTimeout(() => {
        const classes = { ...this.state.classes };
        classes.current = "";
        classes.next = "";
        this.setState({ classes });
      }, 1000);
    }
  };

  public render() {
    return (
      <div className="output">
        <div className="plants">
          <div className={"current-plant " + this.state.classes.current}>
            <div className="top-plant-area">
              {this.state.plants.findIndex(
                (p) => p.id == this.state.currentPlant.id
              ) !== 0 && (
                <img
                  className="next-btn"
                  src="./assets/images/arrow.svg"
                  onClick={this.moveToPrePlant}
                />
              )}
              {this.state.plants.findIndex(
                (p) => p.id == this.state.currentPlant.id
              ) !==
                this.state.plants.length - 1 && (
                <img
                  className="pre-btn"
                  src="./assets/images/arrow.svg"
                  onClick={this.moveToNextPlant}
                />
              )}
              <span>{this.state.currentPlant.hebTitle}</span>
            </div>
            <div className="bottom-plant-area">
              <span className="plant-title">
                {this.state.currentPlant.hebTitle}
              </span>
              <div className="toxins">
                <span>עוזר להפחית:</span>
                {this.state.allToxins.map((t) => (
                  <div
                    className={
                      this.isHelpForToxin(t.id as number)
                        ? "toxin active"
                        : "toxin"
                    }
                  >
                    {t.shortName}
                  </div>
                ))}
              </div>
              <span className="plant-info">
                {this.state.currentPlant.hebContent}
              </span>
            </div>
          </div>
          <div className={"next-plant " + this.state.classes.next}>
            <div className="top-plant-area">
              <span>{this.state.nextPlant.hebTitle}</span>
            </div>
            <div className="bottom-plant-area">
              <span className="plant-title">
                {this.state.nextPlant.hebTitle}
              </span>
              <div className="toxins">
                <span>עוזר להפחית:</span>
                {this.state.allToxins.map((t) => (
                  <div
                    className={
                      this.isHelpForToxin(t.id as number)
                        ? "toxin active"
                        : "toxin"
                    }
                  >
                    {t.shortName}
                  </div>
                ))}
              </div>
              <span className="plant-info">
                {this.state.nextPlant.hebContent}
              </span>
            </div>
          </div>

          <button className="back-to-survey-btn" onClick={this.keepOnSurvey}>
            שאלה הבאה
          </button>
        </div>
        <button className="add-to-list-btn">הוספה לרשימה</button>
      </div>
    );
  }
}
