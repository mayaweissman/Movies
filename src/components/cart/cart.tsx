import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { PlantModel } from "../../models/plantModel";
import { store } from "../../redux/store";
import { PrintPage } from "../list/list";
import { Toxins } from "../toxins/toxins";
import "./cart.css";

interface cartState {
  shoppingCart: PlantModel[];
}
export class Cart extends Component<any, cartState> {
  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      shoppingCart: store.getState().shoppingCart,
    };
    this.unsubscribeStore = store.subscribe(() => {
      const shoppingCart = store.getState().shoppingCart;
      this.setState({ shoppingCart });
    });
  }

  public componentDidMount() {
    this.unsubscribeStore = store.subscribe(() => {
      const shoppingCart = store.getState().shoppingCart;
      this.setState({ shoppingCart });
    });
  }

  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }

  public render() {
    return (
      <div className="cart">
        <header>
          <span className="header-title">רשימת הצמחים שלי</span>
          <img className="ikea-logo" src="./assets/images/IKEA_LOGO.svg" />
        </header>
        <main>
          {this.state.shoppingCart.map((p) => (
            <div className="cart-item">
              <div className="left-area-on-item">
                <img className="trash-icon" src="./assets/images/BACK_BT.svg" />
                <div className="plant-img"></div>
              </div>
              <div className="right-area-on-item">
                <span className="item-title"> {p.hebTitle}</span>
                <div className="toxins-on-item">
                <Toxins plant={p} />
                </div>
                <span className="size-item">{p.size}</span>
                <span className="code-item">{p.code}</span>
                <span className="bold-txt">הולך עם:</span>
                <div className="best-goes-items">
                  <div className="item"></div>
                  <div className="item"></div>
                  <div className="item"></div>
                </div>
              </div>
            </div>
          ))}
        </main>
        <footer>
          <button className="download-btn">הורד רשימה</button>
          <button className="share-btn">שתף</button>
        </footer>
      </div>
    );
  }
}
