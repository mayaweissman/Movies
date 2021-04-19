import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { PlantModel } from "../../models/plantModel";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import { ToxinsIcons } from "../toxins-icons/toxins-icons";
import "./cart.css";
import jsPDF from "jspdf";
import { url } from "node:inspector";
import { Pdf } from "../pdf/pdf";

interface cartState {
  shoppingCart: PlantModel[];
  state: {};
}

export class Cart extends Component<any, cartState> {
  private unsubscribeStore: Unsubscribe;
  public cartRef = React.createRef<HTMLElement>();

  public constructor(props: any) {
    super(props);
    this.state = {
      shoppingCart: store.getState().shoppingCart,
      state: {},
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

    const cart = document.getElementById("download-btn");

    if (cart) {
      cart.setAttribute("onclick", "getPDF('#page')");
    }
  }

  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }

  public getPdf = () => {
    // onload="getPDF('#root')"
    const cart = document.getElementById("cart");
    console.log(cart);
  };

  public share = () => {
    
    let shareData = {
      title: "MDN",
      text: "Learn web development on MDN!",
      url: "https://developer.mozilla.org",
    };

    navigator
      .share(shareData)
      .then(() => console.log("MDN shared successfully"))
      .catch((e) => console.log(e));
  };

  public render() {
    return (
      <div className="cart">
        <Pdf />
        <header>
          <span className="header-title">רשימת הצמחים שלי</span>
          <img className="ikea-logo" src="./assets/images/IKEA_LOGO.svg" />
          <img
            className="close-cart-icon"
            src="./assets/images/CLOSE_BT.svg"
            onClick={() =>
              store.dispatch({ type: ActionType.changeDisplayForCart })
            }
          />
        </header>
        <main id="cart" ref={this.cartRef}>
          {this.state.shoppingCart.length === 0 && (
            <div className="empty-cart">
              <span>עגלת הקניות שלך ריקה כרגע</span>
            </div>
          )}
          {this.state.shoppingCart.map((p) => (
            <div className="cart-item">
              <div className="left-area-on-item">
                <img
                  className="trash-icon"
                  src="./assets/images/TRASH_1.svg"
                  onClick={() =>
                    store.dispatch({
                      type: ActionType.removeFromShoppingCart,
                      payLoad: p.id,
                    })
                  }
                />
                <div
                  className="plant-img-on-cart"
                  style={{
                    backgroundImage: `url(./assets/images/${p.imgSrc})`,
                  }}
                ></div>
              </div>
              <div className="right-area-on-item">
                <span className="item-title"> {p.hebTitle}</span>
                {/* <span className="price">{p.price}</span> */}
                {/* <span className="amount">{p.amountOnShoppingCart}x</span> */}
                <div className="toxins-on-item">
                  <ToxinsIcons plant={p} />
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
          <button id="download-btn" className="download-btn">
            <img
              className="dowloand-icon"
              src="./assets/images/DOWNLOAD_ICON.svg"
            />
            הורד רשימה
          </button>
          <button className="share-btn" onClick={this.share}>
            {" "}
            <img
              className="share-icon"
              src="./assets/images/SHARE_ICON.svg"
            />{" "}
            שתף
          </button>
        </footer>
      </div>
    );
  }
}
function getPDF(arg0: string) {
  throw new Error("Function not implemented.");
}
