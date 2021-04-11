import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./home.css";

export class Home extends Component{
    public render(){
        return(
            <div className="home">
                <h1>Home</h1>
                <NavLink to="/survey">התחל סקר</NavLink>
            </div>
        )
    }
}