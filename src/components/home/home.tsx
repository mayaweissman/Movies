import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import "./home.css";

export class Home extends Component {

  public isShoppingCartEmpty = () => {

    const shoppingCart = store.getState().shoppingCart;
    if (shoppingCart.length === 0) {
      return true;
    }
    return false;
  }

  public render() {
    return (
      <div className="home">
        <div className="main-home">
          <NavLink className="about-link only-mobile" to="/about">
            אודות הפרויקט
          </NavLink>
          {/* {!this.isShoppingCartEmpty() && <img className="cart-icon" src="./assets/images/WISHLIST_ICON.svg" onClick={() => store.dispatch({ type: ActionType.changeDisplayForCart })} />} */}
          <img className="plants-bg only-mobile" src="./assets/images/plants-bg.png" />
          <img className="flowers-bg only-desktop" src="./assets/images/FLOWERS_BG.svg" />

          <div className="home-main-titles">
            <span className="glad-vaxt">GLAD VÄXT</span>
            <br />
            <span className="happy-plants">Happy Plants</span>

          </div>
        </div>

        <div className="bottom-home">
          <NavLink className="about-link only-desktop" to="/about">
            אודות הפרויקט
          </NavLink>
          <span className="title-on-top">איקאה מציגה: <span className="bold-title"> GLAD VAXT</span></span>

          <span className="top-txt">
            סדרת הצמחים שלא רק נראים טוב, אלא גם עוזרים לכם לשמור על אוויר נקי בבית על ידי ספיחת מזהמים שנמצאים באוויר.
          </span>
          <span className="bottom-txt bold-title">
            ענו על כמה שאלות כדי למצוא את הצמחים שהכי מתאימים לכם          </span>

          <button onClick={() => store.dispatch({ type: ActionType.changeDisplay, payLoad: 'question' })} className="survey-link">
            לחיפוש צמחים
          </button>

          <NavLink className="about-pollutions" to="/about-the-toxins">
            עוד על המזהמים שנמצאים בבית
          </NavLink>
        </div>
      </div>
    );
  }
}
