import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import "./home.css";

export class Home extends Component {
  public render() {
    return (
      <div className="home">
        <div className="main-home">
          <NavLink className="about-link" to="/about">
            על הפרויקט
          </NavLink>
          {/* <img className="main-logo" src="./assets/images/home-main-logo.svg" />
          <img className="second-logo" src="./assets/images/home-logo.svg" />*/}
          <img className="plants-bg" src="./assets/images/plants-bg.png" />

          <div className="home-main-titles">
            <span className="glad-vaxt">GLAD VÄXT</span>
            <br/>
            <span className="happy-plants">(Happy Plants)</span>

          </div>
        </div>

        <div className="bottom-home">
          <span className="top-txt">
            לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית מוסן מנת. להאמית
            קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך.
          </span>
          <span className="bottom-txt">
            לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית מוסן מנת.
          </span>

          <button onClick={()=>store.dispatch({type: ActionType.changeDisplay, payLoad: 'question'})} className="survey-link">
            תחילת שאלון
          </button>

          <NavLink className="about-pollutions" to="/about-the-toxins">
            ספרו לי עוד על הרעלנים
          </NavLink>
        </div>
      </div>
    );
  }
}
