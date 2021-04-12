import React, { Component } from "react";
import { QuestionModel } from "../../models/questionModel";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import "./question.css";

interface QuestionProps {
    question: QuestionModel
}

export class Question extends Component<QuestionProps> {

    public constructor(props: QuestionProps) {
        super(props);
    }

    public handleUserAnswerYes = () => {
        store.dispatch({ type: ActionType.changeDisplay, payLoad: 'plant' });
    }

    public keepOnSurvey = () => {
        if (this.props.question) {
            store.dispatch({ type: ActionType.updateCurrentQuestion, payLoad: this.props.question.index ? this.props.question.index + 1 : "" });
        }
    }

    public render() {
        return (
            <div className="question">
                <h1>{this.props.question.hebTitle}</h1>
                <button onClick={this.handleUserAnswerYes}>Yes</button>
                <button onClick={this.keepOnSurvey}>No</button>
            </div>
        )
    }
}