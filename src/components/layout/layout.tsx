import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { About } from "../about/about";
import { Cart } from "../cart/cart";
import { Home } from "../home/home";
import { Question } from "../question/question";
import { Survey } from "../survey/survey";
import { Toxin } from "../toxin/toxin";
import { ToxinsInfo } from "../toxins-info/toxins-info";
import "./layout.css";

export class Layout extends Component {
    public render() {
        return (
            <div className="layout">
                <BrowserRouter>
                    {/* <header>
                        <TopMenu />
                    </header>
                    <main> */}
                        <Switch>
                            <Route path="/survey" component={Survey} exact />
                            <Route path="/about" component={About} exact />
                            <Route path="/about-the-toxins" component={ToxinsInfo} exact />
                            <Route path="/toxin/:toxinId" component={Toxin} />
                            <Redirect from="/" to="/survey" />
                        </Switch>
                    {/* </main> */}
                    
                </BrowserRouter>
            </div>
        )
    }
}