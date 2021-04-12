import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { About } from "../about/about";
import { Home } from "../home/home";
import { Question } from "../question/question";
import { Survey } from "../survey/survey";
import { TopMenu } from "../top-menu/top-menu";
import "./layout.css";

export class Layout extends Component {
    public render() {
        return (
            <div className="layout">
                <BrowserRouter>
                <img className="ikea-logo" src="./assets/images/IKEA_LOGO.svg"/>
                    {/* <header>
                        <TopMenu />
                    </header>
                    <main> */}
                        <Switch>
                            <Route path="/home" component={Home} exact />
                            <Route path="/survey" component={Survey} exact />
                            <Route path="/about" component={About} exact />
                            <Redirect from="/" to="/home" exact />
                        </Switch>
                    {/* </main> */}
                    
                </BrowserRouter>
            </div>
        )
    }
}