import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./home.css";

export class Home extends Component {
  public render() {
    return (
      <div className="home">
        <div className="main-home">
          <NavLink className="about-link" to="/about">
            על הפרויקט
          </NavLink>
          <img className="main-logo" src="./assets/images/home-main-logo.svg" />
          <img className="second-logo" src="./assets/images/home-logo.svg" />
          <img className="plants-bg" src="./assets/images/plants-bg.png" />
        </div>

        <div className="bottom-home">
          <span className="top-txt">
            לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית מוסן מנת. להאמית
            קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. 
          </span>
          <span className="bottom-txt">
            לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית מוסן מנת. 
          </span>

          <NavLink className="survey-link" to="/survey">
           תחילת שאלון
          </NavLink>

          <NavLink className="about-pollutions" to="/about-the-toxins">
              ספרו לי עוד על הרעלנים
          </NavLink>
        </div>
      </div>
    );
  }
}
