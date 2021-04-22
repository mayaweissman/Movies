import React, { Component } from "react";
import { PlantModel } from "../../models/plantModel";
import { store } from "../../redux/store";
import { ToxinsIcons } from "../toxins-icons/toxins-icons";
import "./list.css";

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

interface ListState {
    plants: PlantModel[]
}

export class List extends Component<any, ListState>{

    public constructor(props: any) {
        super(props);
        this.state = {
            plants: []
        }
    }

    public componentDidMount() {
        const hash = this.props.match.params.hash;
        //962ba10daf93947728a61f1000e0e1a8782d836268f1db32572dc27bc63eb63db57236dec4aa6d764c6b491df314648b1638503d2b4465c93dd71f318399c02e25bc14bdaea563b153e5b4184e06c9cd2ae5a57130a78e5acab05348694c43ca05a11fe4ca347c22d5aa4045e96d5375
        const decryptedString = cryptr.decrypt(hash);
        const allPlants: PlantModel[] = store.getState().allPlants;
        const idxs = decryptedString.split('-');
        const plants = [];
        for (const i of idxs) {
            for (const p of allPlants) {
                if (p.id === +i) {
                    plants.push(p);
                }
            }
        }
        this.setState({ plants });
    }

    public render() {
        return (
            <div className="list">
                <div className="list-header">
                    <img className="list-logo" src="../assets/images/IKEA_LOGO.svg" />
                    רשימת הצמחים שלי
                </div>
                <table>
                    {this.state.plants.map((p) => (
                        <tr>
                            <td className="img-item">
                                <img className="img-list" src={"../assets/images/" + p.mobileImgSrc} />
                            </td>
                            <td className="list-item-details">
                                <span className="list-title">{p.hebTitle}</span>
                                <div className="toxins-list only-desktop">
                                    <ToxinsIcons plant={p} size="3vw" src=".."/>
                                </div>
                                <div className="toxins-list only-mobile">
                                    <ToxinsIcons plant={p} size="8vw" src=".."/>
                                </div>
                                <span className="list-code-item">{p.code}</span>
                                <span className="bold-txt-list only-mobile">הולך טוב עם:</span>
                                <div className="list-best-goes-items only-mobile">
                                    <div className="list-item"></div>
                                    <div className="list-item"></div>
                                    <div className="list-item"></div>
                                </div>
                            </td>
                            <td className="best-goes-td-list only-desktop">
                                <span className="bold-txt-list">הולך טוב עם:</span>
                                <div className="list-best-goes-items">
                                    <div className="list-item"></div>
                                    <div className="list-item"></div>
                                    <div className="list-item"></div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        )
    }
}