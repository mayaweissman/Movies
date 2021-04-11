import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { OutputModel } from "../../models/outputModel";
import { QuestionModel } from "../../models/questionModel";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import "./output.css";

interface OutputState {
    output: OutputModel,
    currentQuestion: QuestionModel
}

export class OutPut extends Component<any, OutputState>{

    private unsubscribeStore: Unsubscribe;

    public constructor(props: any) {
        super(props);
        this.state = {
            output: new OutputModel(),
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
        const allOutputs: OutputModel[] = store.getState().allOutputs;
        const output: OutputModel = allOutputs.find(o => o.id === this.state.currentQuestion.outputId) as OutputModel;
        this.setState({ output });
    }


    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }

    public keepOnSurvey = () => {
        store.dispatch({ type: ActionType.changeDisplay, payLoad: 'question' });
        store.dispatch({ type: ActionType.updateCurrentQuestion, payLoad: this.state.currentQuestion.index ? this.state.currentQuestion.index + 1 : "" });
    }

    public render() {
        return (
            <div className="output">
                <h1>{this.state.output.hebTitle}</h1>
                <button onClick={this.keepOnSurvey}>חזרה לשאלון</button>
            </div>
        )
    }
}