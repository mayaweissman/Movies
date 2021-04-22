import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { PlantModel } from "../../models/plantModel";
import { store } from "../../redux/store";
import { ToxinsIcons } from "../toxins-icons/toxins-icons";
import "./pdf.css";

interface PdfState {
  shoppingCart: PlantModel[];
}

export class Pdf extends Component<any, PdfState> {
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

  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }
  public render() {
    return (
      <div id="page" className="pdf-page">
        <div className="pdf-header">
          <img className="pdf-logo" src="./assets/images/IKEA_LOGO.svg" />
          {'רשימת הצמחים שלי'.split('').reverse().join('')}
          </div>
        <table>
          {this.state.shoppingCart.map((p) => (
            <tr>
              <td className="img-item">
                <img className="img-pdf" src={"./assets/images/" + p.mobileImgSrc} />
              </td>
              <td className="pdf-item-details">
                <span className="pdf-title">{p.hebTitle?.split('').reverse().join('')}</span>
                <div className="toxins-pdf">
                <ToxinsIcons plant={p} size="40px" src="."/>
                </div>
                <span className="pdf-code-item">{p.code}</span>
              </td>
              <td className="best-goes-td">
              <span className="bold-txt-pdf">{'הולך עם:'.split('').reverse().join('')}</span>
                <div className="pdf-best-goes-items">
                  <div className="pdf-item"></div>
                  <div className="pdf-item"></div>
                  <div className="pdf-item"></div>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
