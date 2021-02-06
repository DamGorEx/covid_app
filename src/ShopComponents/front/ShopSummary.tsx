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
            <div className="summary-background">
                <div className="summary-wrapper">
                    <div className="basketSummary">
                    <Basket handleAdd={this.handleAdd} handleMinus={this.handleMinus} handleDelete={this.handleDelete}
                            prodToAdd={prToAdd} prInBasket={prInBasket}/>
                    </div>
                    <div className="summary-user-data">
                        <h1>Dane odbiorcy przesyłki</h1>
                        <form onSubmit={this.onSubmit} className="order-form">
                            <div className="name-block">
                                <label htmlFor="name">Imie: <abbr title="required"
                                                                  aria-label="required">*</abbr></label>
                                <input onChange={this.onChange} className="nameInput" type="text" name="name" id="name"
                                       placeholder="podaj imie" required/>

                                <label htmlFor="surname">Nazwisko: <abbr title="required"
                                                                         aria-label="required">*</abbr></label>
                                <input onChange={this.onChange} className="surnameInput" type="text" name="surname"
                                       id="surname"
                                       placeholder="podaj nazwisko"
                                       required/>

                            </div>
                            <div className="ship-block">

                                <label htmlFor="email">Email: <abbr title="required"
                                                                    aria-label="required">*</abbr></label>
                                <input onChange={this.onChange} className="emailInput" type="text" name="email"
                                       id="email"
                                       placeholder="podaj adres e-mail"/>
                                <div>
                                    <label htmlFor="phone">Telefon:</label>
                                    <input onChange={this.onChange} className="phoneInput" type="number"
                                           name="phone"
                                           id="phone"
                                           placeholder="podaj numer telefonu"/>
                                </div>

                                <label htmlFor="address">Ulica:</label>
                                <input onChange={this.onChange} className="addressInput" type="text" name="street"
                                       id="street"
                                       placeholder="podaj adres"/>
                                <label htmlFor="zipcode">Kod pocztowy:</label>
                                <input onChange={this.onChange} className="zipInput" type="text" name="zipcode"
                                       id="zipcode"
                                       placeholder="podaj kod pocztowy"/>
                                <label htmlFor="city">Miasto: <abbr title="required"
                                                                    aria-label="required">*</abbr></label>
                                <input onChange={this.onChange} className="cityInput" type="text" name="city" id="city"
                                       placeholder="podaj miasto" required/>
                                <label htmlFor="shpMethod">Metoda wysyłki: <abbr title="required"
                                                                                 aria-label="required">*</abbr></label>
                                <input onChange={this.onChange}className="methodSend" list="browsers" name="shpMethod" id="shpMethod"/>
                                <datalist id="browsers">
                                    {shpMethList.map(p => {

                                        return (
                                            <option value={p}/>
                                        )
                                    })}
                                </datalist>

                            </div>
                            <input type="submit" className="order-submit-button" value="Zapisz się"/>
                        </form>
                    </div>
                </div>
            </div>
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
