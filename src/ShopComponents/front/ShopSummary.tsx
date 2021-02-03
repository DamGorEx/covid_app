import React from 'react';
import * as ShopUtils from "../utils/ShopUtils";
import {BasketAction} from "../utils/ShopUtils";
import Basket from "./Basket";
import '../css/ShopSummary.css';

class ShopSummary extends React.Component {

    state = {
        productsInBasket: [],
        prodToAdd: ""
    }

    componentDidMount() {
        const prInBasket = ShopUtils.getPrLstFromLocSt()
        this.setState({productsInBasket: prInBasket});
    }

    render() {
        const prInBasket = this.state.productsInBasket;
        const prToAdd = this.state.prodToAdd;
        return (
            <Basket handleAdd={this.handleAdd} handleMinus={this.handleMinus} handleDelete={this.handleDelete}
                    prodToAdd={prToAdd} prInBasket={prInBasket}/>
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
