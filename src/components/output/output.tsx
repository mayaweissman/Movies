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
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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

  //Disabled button if no plant was choosen
  public isUserChoosePlant = () => {
    const shoppingCart = store.getState().shoppingCart;
    const plants = [...this.state.plants];
    let isChoose = false;
    for (const plant of plants) {
      for (const plantOnCart of shoppingCart) {
        if (plant.id === plantOnCart.id) {
          isChoose = true;
        }
      }
    }
    return isChoose;
  }

  public addPlantToWishlist = (plant: PlantModel) => (event: any) => {
    store.dispatch({
      type: ActionType.addPlantToShoppingCart,
      payLoad: plant,
    });
  };

  public isOnShoppingCart = (p: PlantModel) => {
    const shoppingCart: PlantModel[] = store.getState().shoppingCart;
    const plant = shoppingCart.find((s) => s.id === p.id);
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

  public responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  public isCurrentPlant = (p: PlantModel) => (event: any) => {
    const container = document.getElementById("right-area-container");
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const index = this.state.plants.indexOf(p);
    const imageSize = vw / 100 * 40;
    if (container) {
      const scroll = Math.abs(container?.scrollLeft);
      console.log(imageSize * index);
      console.log(scroll);
      if (imageSize * index === scroll
        || ((imageSize * index) > scroll && (imageSize * index) < (scroll + 100))
        || ((imageSize * index) < scroll && (imageSize * index) > (scroll - 100))) {
        console.log('is current');
        this.setState({ currentPlant: p });
      }

    }


  }

  public render() {
    return (
      <div className="output">

        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={this.responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          customTransition="transform 300ms ease-in-out"
          transitionDuration={1000}
          containerClass="carousel-container only-mobile"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {this.state.plants.map(p =>
            <div className="plant">
              <div className="main-plant-area">
                <img className="mobile-plant-img" src={"./assets/images/" + p.mobileImgSrc} />

                {!this.isOnShoppingCart(p) && (
                  <button
                    onClick={this.addPlantToWishlist(p as PlantModel)}
                    className="add-to-list-btn"
                  >
                    הוספה לרשימה
                    <img className="add-icon" src="./assets/images/add.svg" />
                  </button>
                )}
                {this.isOnShoppingCart(p) && (
                  <button
                    onClick={() => store.dispatch({ type: ActionType.removeFromShoppingCart, payLoad: this.state.currentPlant.id })}
                    className="on-list-btn"
                  >
                    &#10003; {"נשמר בהצלחה"}
                  </button>
                )}
              </div>
              <div className="details-plant-area">
                <span className="plant-title">
                  {p.hebTitle}
                </span>
                <div className="toxins-area only-mobile">
                  <span>עוזר להפחית:</span>
                  <ToxinsIcons src="." size='10vw' plant={p} />
                </div>
                <div className="toxins-area only-desktop">
                  <span>עוזר להפחית: </span>
                  <ToxinsIcons src="." size='2.8vw' plant={p} />
                </div>

                <span className="plant-info">
                  {p.hebContent}
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
          )}
        </Carousel>

        <div className="all-outputs only-desktop">
          <div id="right-area-container" className="left-area">

            {this.state.plants.map(p =>

              <div id={`plant-${p.id}`} className="plant-container" onClick={this.isCurrentPlant(p)}>
                <img className="img-container" src={"./assets/images/" + p.desktopImgSrc} />
                {this.isCurrentPlant(p)}
              </div>
            )}
          </div>
          <div className="right-area">
            {this.state.plants.map(p =>

              <div className="details-container">
                <span className="plant-title">
                  {p.hebTitle}
                </span>
                <div className="toxins-area only-desktop">
                  <span>עוזר להפחית: </span>
                  <ToxinsIcons src="." size='2.8vw' plant={p} />
                </div>

                <span className="plant-info">
                  {p.hebContent}
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
            )}
          </div>
        </div>
      </div >
    );
  }
}
