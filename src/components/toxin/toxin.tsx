import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { ToxinModel } from "../../models/toxinModel";
import "./toxin.css";

interface ToxinState {
  toxin: ToxinModel;
}
export class Toxin extends Component<any, ToxinState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      toxin: new ToxinModel(),
    };
  }
  public render() {
    return (
      <div className="toxin">
        <img className="ikea-logo" src="./assets/images/IKEA_LOGO.svg" />
        <div className="toxin-top-area">
          <NavLink className="back-to-home-btn" to="/home">
            <img
              className="back-to-home-icon"
              src="./assets/images/BACK_BT.svg"
            />
          </NavLink>
        </div>
        <div className="toxin-bottom-area">
          <span className="toxin-title">{this.state.toxin.hebTitle}</span>
          <span className="toxin-content">{this.state.toxin.hebContent}</span>
        </div>
      </div>
    );
  }
}
