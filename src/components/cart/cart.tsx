import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { PlantModel } from "../../models/plantModel";
import { store } from "../../redux/store";
import { PrintPage } from "../list/list";
import "./cart.css";


interface cartState {
    shoppingCart: PlantModel[]
}
export class Cart extends Component<any, cartState>{

    private unsubscribeStore: Unsubscribe;

    public constructor(props: any) {
        super(props);
        this.state = {
            shoppingCart: store.getState().shoppingCart
        }
        this.unsubscribeStore = store.subscribe(() => {
            const shoppingCart = store.getState().shoppingCart;
            this.setState({ shoppingCart });
        })
    }

    public componentDidMount() {
        this.unsubscribeStore = store.subscribe(() => {
            const shoppingCart = store.getState().shoppingCart;
            this.setState({ shoppingCart });
        })
    }

    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }



    public render() {
        return (
            <div className="cart">
                      <PrintPage />

                <h1>Shopping cart</h1>
                <table>
                    <thead>
                        <tr>
                            <td>כמות</td>
                            <td>מזהה מוצר</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.shoppingCart.map(p =>
                            <tr>
                                <td>{p.hebTitle}</td>
                                <td>{p.code}</td>

                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}