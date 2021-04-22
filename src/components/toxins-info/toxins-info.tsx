import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./toxins-info.css";

export class ToxinsInfo extends Component<any>{

  public constructor(props: any) {
    super(props);
  }

  public navigation = (toxinId: number) => (event: any) => {
    this.props.history.push(`/toxin/${toxinId}`)
  }

  public render() {
    return (
      <div className="toxins-info">
        <img className="ikea-logo" src="./assets/images/IKEA_LOGO.svg" />
        <div className="toxins-top-area">
          <div className="tree-area">
            <img className="bucket" src="./assets/images/bucket.svg" />
            <img className="tree" src="./assets/images/tree.svg" />
            <img className="left-branch first-branch" src="./assets/images/left-branch.svg" />
            <img className="left-branch second-branch" src="./assets/images/left-branch.svg" />
            <img className="right-branch first-branch" src="./assets/images/right-branch.svg" />
            <img className="right-branch second-branch" src="./assets/images/right-branch.svg" />

            <div className="hexagone hex-am"></div>
            <div className="hexagone hex-bz"></div>
            <div className="hexagone hex-fh"></div>
            <div className="hexagone hex-xy"></div>
            <div className="hexagone hex-tr"></div>


            <img onClick={this.navigation(3)} className="leaf fh-leaf" src="./assets/images/Fh.svg" />
            <img onClick={this.navigation(4)} className="leaf xy-leaf" src="./assets/images/Xy.svg" />
            <img onClick={this.navigation(2)} className="leaf tr-leaf" src="./assets/images/Tr.svg" />
            <img onClick={this.navigation(1)} className="leaf bz-leaf" src="./assets/images/Bz.svg" />
            <img onClick={this.navigation(5)} className="leaf am-leaf" src="./assets/images/Am.svg" />
          </div>

          <NavLink className="back-to-home-btn only-mobile" to="/home">
            <img
              className="back-to-home-icon"
              src="./assets/images/BACK_BT.svg"
            />
          </NavLink>
        </div>
        <div className="toxins-bottom-area">

          <NavLink className="back-to-home-btn only-desktop" to="/home">
            <img
              className="back-to-home-icon"
              src="./assets/images/BACK_BT.svg"
            />
          </NavLink>
          
          <span className="toxins-title">זיהום בבית</span>
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
      </div >
    );
  }
}
