import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./about.css";

export class About extends Component {
  public render() {
    return (
      <div className="about">
        <img className="ikea-logo" src="./assets/images/IKEA_LOGO.svg" />
        <div className="about-top-area">
          <NavLink className="back-to-home-btn" to="/home">
            <img
              className="back-to-home-icon"
              src="./assets/images/BACK_BT.svg"
            />
          </NavLink>
        </div>
        <div className="about-bottom-area">
          <span className="about-title">על הפרויקט</span>
          <span className="about-content">
            האוויר שאנחנו נושמים בתוך הבית, עלול להיות מזוהם יותר מהאוויר בחוץ,
            בגלל מזהמים שנפלטים מצבע הקירות, אבק, חומרי ניקוי, אוויר מזגנים
            ועוד.
            <br />
            <br />
            GLAD VAXT, "הצמחים הטובים" של איקאה, הם צמחים בעלי יכולת לספוח
            רעלנים מהאוויר, ולתרום לאוויר נקי יותר בבית שלכם. באמצעות שימוש
            במחקר של NASA, זיהינו 5 מזהמים שנפוצים בבתים בישראל, ויצרנו מקרא
            מיוחד, כדי לסמן את הרעלנים שכל צמח מסוגל לנקות.
            <br />
            <br />
            אז בין אם צבעתם את הבית לאחרונה, או שיש לכם חיות מחמד, או שאתם
            משתמשים הרבה בחומרי ניקוי, תוכלו לזהות את הרעלנים שנמצאים אצלכם,
            ולמצוא את הצמחים שהכי מתאימים לאורח החיים שלכם ולבית שלכם.
            <br />
            <br />
            הצמחים הטובים של איקאה – לא רק נראים טוב, גם עושים טוב.
          </span>
        </div>
      </div>
    );
  }
}
