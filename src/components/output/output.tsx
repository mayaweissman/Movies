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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import InfiniteScroll from "react-infinite-scroll-component";

interface OutputState {
  output: OutputModel;
  currentQuestion: QuestionModel;
  plants: PlantModel[];
  currentPlant: PlantModel;
  nextPlant: PlantModel;
  allToxins: ToxinModel[];
  class: string;
  showPopUp: boolean;
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
      class: "",
      showPopUp: true,
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
  };

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
    if ((currentQuestion?.index as number) === allQuestionsLength) {
      return true;
    }

    return false;
  };

  public responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  public slideLeft = () => {
    const container = document.getElementById("right-area-container");
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const imageSize = (vw / 100) * 38;
    container?.scrollTo({
      top: 0,
      left: container?.scrollLeft - imageSize,
      behavior: "smooth",
    });

    this.setState({ class: "slide-right" });
    const plants = this.state.plants;
    const index = plants.indexOf(this.state.currentPlant);
    if (index !== plants.length - 1) {
      this.setState({ currentPlant: plants[index + 1] });
    }
    setTimeout(() => {
      this.setState({ class: "" });
    }, 1000);
  };

  public slideRight = () => {
    const container = document.getElementById("right-area-container");
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const imageSize = (vw / 100) * 38;
    container?.scrollTo({
      top: 0,
      left: container?.scrollLeft + imageSize,
      behavior: "smooth",
    });

    this.setState({ class: "slide-left" });
    const plants = this.state.plants;
    const index = plants.indexOf(this.state.currentPlant);
    if (index !== 0) {
      this.setState({ currentPlant: plants[index - 1] });
    }
    setTimeout(() => {
      this.setState({ class: "" });
    }, 1000);
  };

  public render() {
    return (
      <div className="output">
        <div className="all-outputs only-desktop">
          <div id="right-area-container" className="left-area">
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
            <img
              className="right-arrow"
              onClick={this.slideRight}
              src="./assets/images/arrow.svg"
            />

            <img
              className="left-arrow"
              onClick={this.slideLeft}
              src="./assets/images/arrow.svg"
            />

            {this.state.plants.map((p) => (
              <div
                id={`plant-${p.id}`}
                className="plant-container"
                style={{
                  backgroundImage: `url(./assets/images/${p.desktopImgSrc})`,
                }}
              >
                {this.state.showPopUp &&
                  this.state.plants.indexOf(p) === 0 &&
                  this.state.currentQuestion.index === 1 && (
                    <div
                      className="output-popup"
                      onClick={() => this.setState({ showPopUp: false })}
                    >
                      <img
                        className="white_close"
                        src="./assets/images/white_close.svg"
                        onClick={() => this.setState({ showPopUp: false })}
                      />
                      <div className="first-section">
                        <div className="number-icon">1</div>
                        <span>תבחר צמח מתוך רשימת הצמחים שלנו</span>
                        <img
                          className="hor-arrow"
                          src="./assets/images/TUT_ARROW_1.svg"
                        />
                      </div>
                      <div className="second-section">
                        <div className="number-icon">2</div>
                        <span>
                          בכדי לעבור לשאלה הבאה יש לבחור לפחות צמח אחד מהרשימה
                          שלנו
                        </span>
                        <img
                          className="bottom-arrow"
                          src="./assets/images/TUT_ARROW_3.svg"
                        />
                      </div>
                      <div className="third-section">
                        <div className="number-icon">3</div>
                        <span>אחרי הוספת הצמח תוכל לעבור לשאלה הבאה</span>
                        <img
                          className="top-arrow"
                          src="./assets/images/TUT_ARROW_2.svg"
                        />
                        <div className="transperent">שאלה הבאה</div>
                      </div>
                    </div>
                  )}
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
                    onClick={() =>
                      store.dispatch({
                        type: ActionType.removeFromShoppingCart,
                        payLoad: this.state.currentPlant.id,
                      })
                    }
                    className="on-list-btn"
                  >
                    &#10003; {"נשמר בהצלחה"}
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="right-area">
            <div className={"details-container " + this.state.class}>
              <span className="plant-title">
                {this.state.currentPlant.hebTitle}
              </span>
              <div className="toxins-area only-desktop">
                <span>עוזר להפחית: </span>
                <ToxinsIcons
                  src="."
                  size="2.8vw"
                  plant={this.state.currentPlant}
                />
              </div>

              <span className="plant-info">
                {this.state.currentPlant.hebContent}
              </span>

              {!this.isOnLastQuestion() && (
                <button
                  className="back-to-survey-btn"
                  onClick={
                    this.isUserChoosePlant()
                      ? this.keepOnSurvey
                      : () => this.setState({ showPopUp: true })
                  }
                >
                  שאלה הבאה
                </button>
              )}
              {this.isOnLastQuestion() && (
                <button
                  className="back-to-survey-btn"
                  onClick={
                    store.getState().shoppingCart.length > 0
                      ? this.keepOnSurvey
                      : () => {}
                  }
                >
                  לרשימת הצמחים שלי
                </button>
              )}
            </div>
          </div>
        </div>

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
          {this.state.plants.map((p) => (
            <div className="plant">
              <div className="main-plant-area">
                <img
                  className="mobile-plant-img"
                  src={"./assets/images/" + p.mobileImgSrc}
                />

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
                    onClick={() =>
                      store.dispatch({
                        type: ActionType.removeFromShoppingCart,
                        payLoad: this.state.currentPlant.id,
                      })
                    }
                    className="on-list-btn"
                  >
                    &#10003; {"נשמר בהצלחה"}
                  </button>
                )}
              </div>
              <div className="details-plant-area">
                <span className="plant-title">{p.hebTitle}</span>
                <div className="toxins-area only-mobile">
                  <span>עוזר להפחית:</span>
                  <ToxinsIcons src="." size="10vw" plant={p} />
                </div>
                <div className="toxins-area only-desktop">
                  <span>עוזר להפחית: </span>
                  <ToxinsIcons src="." size="2.8vw" plant={p} />
                </div>

                <span className="plant-info">{p.hebContent}</span>

                {!this.isOnLastQuestion() && (
                  <button
                    className="back-to-survey-btn"
                    onClick={this.keepOnSurvey}
                  >
                    שאלה הבאה
                  </button>
                )}
                {this.isOnLastQuestion() && (
                  <button
                    className="back-to-survey-btn"
                    onClick={this.keepOnSurvey}
                  >
                    לרשימת הצמחים שלי
                  </button>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}
