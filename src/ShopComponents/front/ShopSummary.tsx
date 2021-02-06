import React, {ChangeEvent, FormEvent} from 'react';
import * as ShopUtils from "../utils/ShopUtils";
import {BasketAction, fetchDataFromServer} from "../utils/ShopUtils";
import Basket from "./Basket";
import '../css/ShopSummary.css';
import {Redirect} from "react-router-dom";
import 'reactjs-popup/dist/index.css';
import Popup from "../front/Popup";

class ShopSummary extends React.Component {

    state = {
        productsInBasket: [],
        prodToAdd: "",
        shipMethods: [],
        name: null,
        surname: null,
        email: null,
        number: null,
        street: null,
        zipcode: null,
        city: null,
        shpMethod: null,
        orderSent: false,
        redirect: false,
    }

    togglePopup() {
        this.setState({
            orderSent: !this.state.orderSent,
            redirect: true
        });
    }

    componentDidMount() {
        const prInBasket = ShopUtils.getPrLstFromLocSt()
        this.setState({productsInBasket: prInBasket});
        fetchDataFromServer("http://localhost:8080/orders/shpMethod", (p: any) => {
            this.setState({shipMethods: p})
        }, {});
    }

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit = (e: FormEvent<any>) => {
        e.preventDefault();
        let wrapper = {
            products: this.state.productsInBasket,
            user: {
                name: this.state.name,
                surname: this.state.surname,
                email: this.state.email,
                number: this.state.number,
                street: this.state.street,
                zipcode: this.state.zipcode,
                city: this.state.city
            },
            shpMethod: this.state.shpMethod
        };
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(wrapper)
        };
        fetchDataFromServer("http://localhost:8080/orders", () => {
            this.setState({orderSent: true, productInBasket: []});
            localStorage.removeItem("productsInBasket");
        }, requestOptions);
        console.log(JSON.stringify(wrapper));
    }

    render() {
        const prInBasket = this.state.productsInBasket;
        const prToAdd = this.state.prodToAdd;
        const shpMethList = this.state.shipMethods;
        if (this.state.orderSent) {
            return (
                <Popup
                    text='Zamówienie przyjęte!'
                    closePopup={this.togglePopup.bind(this)}
                />
            );
        } else if (this.state.redirect) {
            this.setState({redirect: false})
            return <Redirect to="/shop"/>
        }
        return (


            <body>


            <div>
                {/* <div className="summary-wrapper"> */}

                <div className="text-basket">
                    <Basket handleAdd={this.handleAdd} handleMinus={this.handleMinus} handleDelete={this.handleDelete}
                            prodToAdd={prToAdd} prInBasket={prInBasket}/>
                </div>

                <div className="wizyta-dane">
                    <p className="wizyta-dane-headers">DANE ODBIORCY PRZESYŁKI</p>
                </div>

                <div className="summary-user-data-bck">
                    {/* <h1>Dane odbiorcy przesyłki</h1> */}
                    <form onSubmit={this.onSubmit} className="order-form">


                        <div className="name-block-summary">

                            <div className="wizyta-dane-input-name">
                                <label htmlFor="name">IMIE: <abbr title="required"
                                                                  aria-label="required">*</abbr></label>
                                <input onChange={this.onChange} className="name-input" type="text" name="name" id="name"
                                       required/>
                                <div className="title-space"></div>

                                <label htmlFor="surname">NAZWISKO: <abbr title="required"
                                                                         aria-label="required">*</abbr></label>
                                <input onChange={this.onChange} className="name-input" type="text" name="surname"
                                       id="surname"
                                       required/>
                                <div className="title-space"></div>

                                {/* </div> */}


                                {/* <div className="ship-block"> */}

                                <label htmlFor="email">EMAIL: <abbr title="required"
                                                                    aria-label="required">*</abbr></label>
                                <input onChange={this.onChange} className="name-input" type="text" name="email"
                                       id="email"
                                />
                                <div className="title-space"></div>
                                <div>
                                    <label htmlFor="phone">TELEFON:</label>
                                    <input onChange={this.onChange} className="name-input" type="number"
                                           name="phone"
                                           id="phone"/>
                                </div>
                                <div className="title-space"></div>
                            </div>

                            <div className="wizyta-dane-input-name">
                                <label htmlFor="address">ULICA:</label>
                                <input onChange={this.onChange} className="name-input" type="text" name="street"
                                       id="street"/>
                                <div className="title-space"></div>

                                <label htmlFor="zipcode">KOD POCZTOWY:</label>
                                <input onChange={this.onChange} className="name-input" type="text" name="zipcode"
                                       id="zipcode"/>
                                <div className="title-space"></div>

                                <label htmlFor="city">MIASTO: <abbr title="required"
                                                                    aria-label="required">*</abbr></label>
                                <input onChange={this.onChange} className="name-input" type="text" name="city" id="city"
                                       required/>
                                <div className="title-space"></div>

                                <label htmlFor="shpMethod">METODA WYSYŁKI: <abbr title="required"
                                                                                 aria-label="required">*</abbr></label>
                                <input onChange={this.onChange} className="name-input" list="browsers" name="shpMethod"
                                       id="shpMethod"/>
                                <datalist id="browsers">
                                    {shpMethList.map(p => {

                                        return (
                                            <option value={p}/>
                                        )
                                    })}
                                </datalist>
                            </div>


                            <div className="title-space"></div>
                            <div className="title-space"></div>

                            <input type="submit" className="form-button-submit-bsk" value="ZAPISZ SIĘ"/>
                        </div>


                    </form>
                </div>


                <div>
                    <div className="footer">
                        <div className="footerTop">
                            CONTENT MANAGEMENT SYSTEM - PJATK
                        </div>

                        <div className="footerBottom">
                            <div className="footerBottomLeft">
                                DOMINIKA ŁUGOWSKA <div className="pStyle3"></div>
                                MICHELLE HEROK <div className="pStyle3"></div>
                                DAMIAN GORAJ <div className="pStyle3"></div>
                                MARCIN CHOJNACKI
                            </div>
                            <div className="footerBottomRight">
                                PJATK <div className="pStyle3"></div>
                                Koszykowa 86,
                                <div className="pStyle3"></div>
                                02-008 Warszawa
                            </div>
                        </div>
                    </div>
                </div>


                {/* </div> */}
            </div>

            </body>


        );
    }

    handleAdd = (product: string, index: number) => {
        const newProdInBasket = ShopUtils.updateBasket(product, BasketAction.ADD, 1);
        this.setState({
            productsInBasket: newProdInBasket
        });
    }

    handleMinus = (product: string, index: number) => {
        const newProdInBasket = ShopUtils.updateBasket(product, BasketAction.SUB, 1);
        this.setState({
            productsInBasket: newProdInBasket
        })
    }

    handleDelete = (product: string) => {
        const newProdInBasket = ShopUtils.updateBasket(product, BasketAction.REMOVE, 0);
        this.setState({
            productsInBasket: newProdInBasket
        })
    }
}

export default ShopSummary;
