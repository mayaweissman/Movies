import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Home } from "../home/home";
import { Login } from "../login/login";
import "./layout.scss";

export class Layout extends Component {
    public render() {
        return (
            <div className="layout">
                <BrowserRouter>
                        <Switch>
                            <Route path="/login" component={Login} exact />
                            <Route path="/movies" component={Home} exact />
                            <Redirect from="/" to="/movies" />
                        </Switch>                    
                </BrowserRouter>
            </div>
        )
    }
}