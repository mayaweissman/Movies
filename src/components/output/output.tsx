import { position } from "html2canvas/dist/types/css/property-descriptors/position";
import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { OutputModel } from "../../models/outputModel";
import { PlantModel } from "../../models/plantModel";
import { QuestionModel } from "../../models/questionModel";
import { ToxinModel } from "../../models/toxinModel";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import { ToxinsIcons } from "../toxins-icons/toxins-icons";
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

  public moveToNextPlant = () => {
    const plants = this.state.plants;
    const index = plants.findIndex((p) => p.id === this.state.currentPlant.id);
    if (index !== this.state.plants.length - 1) {
      this.setState({ nextPlant: this.state.currentPlant });
      const currentPlant = plants[index + 1];
      this.setState({ currentPlant });

      const classes = { ...this.state.classes };
      classes.current = "slide-left";
      classes.next = "slide-left";
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
      classes.current = "slide-right";
      classes.next = "slide-right";
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

  public addPlantToWishlist = () => {
    store.dispatch({
      type: ActionType.addPlantToShoppingCart,
      payLoad: this.state.currentPlant,
    });
  };

  public isOnShoppingCart = () => {
    const shoppingCart: PlantModel[] = store.getState().shoppingCart;
    const plant = shoppingCart.find((s) => s.id === this.state.currentPlant.id);
    if (plant) {
      return true;
    }
    return false;
  };

  public isOnLastQuestion = () => {
    const allQuestionsLength = store.getState().allQuestions.length;
    const currentQuestion = { ...this.state.currentQuestion };
    if (currentQuestion?.index as number === allQuestionsLength) {
      return true;
    }

    return false;
  }

  public render() {
    return (
      <div className="output">
        <div className="plants">
          <div className={"current-plant " + this.state.classes.current}>
            <div className="top-plant-area">
              {this.state.plants.findIndex(
                (p) => p.id == this.state.currentPlant.id
              ) !==
                this.state.plants.length - 1 && (
                  <img
                    className="next-btn"
                    src="./assets/images/arrow.svg"
                    onClick={this.moveToNextPlant}
                  />
                )}
              {this.state.plants.findIndex(
                (p) => p.id == this.state.currentPlant.id
              ) !== 0 && (
                  <img
                    className="pre-btn"
                    src="./assets/images/arrow.svg"
                    onClick={this.moveToPrePlant}
                  />
                )}
              <span>{this.state.currentPlant.hebTitle}</span>

            </div>
            <div className="bottom-plant-area">
              <span className="plant-title">
                {this.state.currentPlant.hebTitle}
              </span>
              <div className="toxins-area">
                <span>עוזר להפחית:</span>
                <ToxinsIcons plant={this.state.currentPlant} />
              </div>

              <span className="plant-info">
                {this.state.currentPlant.hebContent}
              </span>

              {!this.isOnLastQuestion() && <button
                className="back-to-survey-btn"
                onClick={this.keepOnSurvey}
              >
                שאלה הבאה
              </button>}
              {this.isOnLastQuestion() && <button
                className="back-to-survey-btn"
                onClick={this.keepOnSurvey}
              >
                לרשימת הצמחים שלי
              </button>}
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
              <div className="toxins-area">
                <span>עוזר להפחית:</span>
                <ToxinsIcons plant={this.state.currentPlant} />
              </div>

              <span className="plant-info">
                {this.state.nextPlant.hebContent}
              </span>
            </div>
          </div>
          <div className="plants-navigation">
            {this.state.plants.map((p) => (
              <div
                className={
                  this.state.currentPlant.id === p.id
                    ? "plant-dot active"
                    : "plant-dot"
                }
              ></div>
            ))}
          </div>
          {!this.isOnShoppingCart() && (
            <button
              onClick={this.addPlantToWishlist}
              className="add-to-list-btn"
            >
              הוספה לרשימה
            </button>
          )}
          {this.isOnShoppingCart() && (
            <button
              onClick={this.addPlantToWishlist}
              className="on-list-btn"
            >
              &#10003; נוסף לרשימה
            </button>
          )}

        </div>
      </div>
    );
  }
}
