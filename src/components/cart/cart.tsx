import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { PlantModel } from "../../models/plantModel";
import { store } from "../../redux/store";
import { PrintPage } from "../list/list";
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
                
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }
}
