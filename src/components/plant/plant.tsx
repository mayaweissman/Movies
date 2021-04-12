import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { PlantModel } from "../../models/plantModel";
import { QuestionModel } from "../../models/questionModel";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import "./plant.css";

interface PlantState {
    plant: PlantModel,
    currentQuestion: QuestionModel
}

export class Plant extends Component<any, PlantState>{

    private unsubscribeStore: Unsubscribe;

    public constructor(props: any) {
        super(props);
        this.state = {
            plant: new PlantModel(),
            currentQuestion: store.getState().currentQuestion,
        }

        this.unsubscribeStore = store.subscribe(() => {
            const currentQuestion = store.getState().currentQuestion;
            this.setState({ currentQuestion });
        })
    }

    public componentDidMount() {
        this.unsubscribeStore = store.subscribe(() => {
            const currentQuestion = store.getState().currentQuestion;
            this.setState({ currentQuestion });
        })
        const allPlants: PlantModel[] = store.getState().allPlants;
        const plant: PlantModel = allPlants.find(o => o.id === this.state.currentQuestion.plantId) as PlantModel;
        this.setState({ plant });
    }


    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }

    public keepOnSurvey = () => {
        store.dispatch({ type: ActionType.changeDisplay, payLoad: 'question' });
        store.dispatch({ type: ActionType.updateCurrentQuestion, payLoad: this.state.currentQuestion.index ? this.state.currentQuestion.index + 1 : "" });
    }
    
    public addPlantToShoppingCart = ()=>{
        store.dispatch({type: ActionType.addPlantToShoppingCart, payLoad: this.state.plant});
    }
    
    public render() {
        return (
            <div className="plant">
                <h1>{this.state.plant.hebTitle}</h1>
                <button onClick={this.addPlantToShoppingCart}>הוסף צמח לעגלה</button>
                <button onClick={this.keepOnSurvey}>חזרה לשאלון</button>
            </div>
        )
    }
}