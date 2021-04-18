import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { ToxinModel } from "../../models/toxinModel";
import { store } from "../../redux/store";
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



  public async componentDidMount() {
    try {
      const toxinId = this.props.match.params.toxinId;
      const allToxins: ToxinModel[] = await store.getState().allToxins;
      const toxin = allToxins.find((t) => t.id === +toxinId);
      if (toxin) {
        this.setState({ toxin });
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  public render() {
    return (
      <div className="toxin-page">
        <img className="ikea-logo" src="../assets/images/IKEA_LOGO.svg" />
        <div className="toxin-top-area">
          <img
            className="back-icon"
            src="../assets/images/BACK_BT.svg"
            onClick={() => this.props.history.goBack()}
          />
          {/* <NavLink className="back-to-home-btn" to="/home">
            <img
              className="back-to-home-icon"
              src="../assets/images/BACK_BT.svg"
            />
          </NavLink> */}
          <div className="hexagon">
            <span className="short-name-on-hex">{this.state.toxin.shortName}</span>
            <br />
            <span className="name-on-hex">{this.state.toxin.engTitle}</span>
          </div>
        </div>
        <div className="toxin-bottom-area">
          <span className="toxin-title">{this.state.toxin.hebTitle}</span>
          <span className="toxin-content">{this.state.toxin.hebContent}</span>
        </div>
      </div>
    );
  }
}
