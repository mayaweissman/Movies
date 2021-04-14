import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./toxins-info.css";

export class ToxinsInfo extends Component {
  public render() {
    return (
      <div className="toxins-info">
        <img className="ikea-logo" src="./assets/images/IKEA_LOGO.svg" />
        <div className="toxins-top-area">
          <NavLink className="back-to-home-btn" to="/home">
            <img
              className="back-to-home-icon"
              src="./assets/images/BACK_BT.svg"
            />
          </NavLink>
        </div>
        <div className="toxins-bottom-area">
          <span className="toxins-title">הרעלנים</span>
          <span className="toxins-content">
            כולם מודעים לזיהום האוויר שנמצא בחוץ, עשן רכבים ומפעלים. אבל רובנו
            לא מודעים למזהמים המסוכנים שנמצאים בתוך הבית. רעלנים עלולים להיפלט
            מחפצים יומיומיים שאפילו לא חשבנו עליהם, כמו מטהרי אוויר, נרות
            ריחניים, חומרים ניקוי, מזגנים וחברינו ההולכים על ארבע.
            <br />
            <br />
            נתנו משמעות חדשה למחקר של NASA, וזיהינו 5 מזהמים שנפוצים בבתים
            בישראל: בנזן, אתילן תלת כלורי, פורמדלהיד, קסילן ואמוניה. את המזהמים
            האלו, חילקנו לפי צמחים שיכולים לנקות אותם.
            <br />
            <br />
            כדי לעזור לכם להבין את רמת האפקטיביות של כל אחד מהצמחים באיקאה,
            יצרנו מערכת סימונים פשוטה, שמציגה לכם על כל צמח את הרעלנים שהוא יכול
            לספוח – כך הפכנו את המדע המסובך הזה, לסימונים פשוטים להבנה.
          </span>
        </div>
      </div>
    );
  }
}
