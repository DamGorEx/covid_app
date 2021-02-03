import React from "react";
import {shopItems} from "./ShopItems"
import "../css/FilterPanel.scss"
import * as ShopUtils from "../utils/ShopUtils";
import Basket from "../front/Basket";

interface myPropsFilterPanel {
    filterProduct: (text: string) => void
    prodToAdd: string
}

enum BasketAction {
    ADD, REMOVE, SUB
}

class FilterPanel extends React.Component<myPropsFilterPanel, {}> {
    state = {
        applyFilter: false,
        productsInBasket: [],
        aniMarker: 0,
        owner: null
    };

    constructor(props: myPropsFilterPanel) {
        super(props);
    }

    componentDidUpdate(prevProps: Readonly<myPropsFilterPanel>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.prodToAdd !== prevProps.prodToAdd) {
            this.setState({productsInBasket: ShopUtils.getPrLstFromLocSt()});
        }
    }

    componentDidMount() {
        this.setState({productsInBasket: ShopUtils.getPrLstFromLocSt()});
    }


    render() {
        const prInBasket = this.state.productsInBasket;
        const prodToAdd = this.props.prodToAdd;
        return (
            <div className="filter-panel-back">
                <div className="filter-panel-item">
                    {shopItems.map((item, index) => {
                        return (
                            <ul className="bar">
                                <li key={index} className={item.cName} onClick={() => {
                                    this.setState({applyFilter: true})
                                    this.props.filterProduct(item.cat)
                                }}>
                                    {item.ikon}
                                    {item.Name}
                                </li>
                            </ul>
                        );
                    })}
                    <div className="buttonArea">
                        {this.state.applyFilter &&
                        <button onClick={() => {
                            this.setState({applyFilter: false});
                            this.props.filterProduct("")
                        }}>Wyczyść filtr</button>
                        }
                    </div>
                </div>
                <Basket handleAdd={this.handleAdd} handleMinus={this.handleMinus} handleDelete={this.handleDelete}
                        prodToAdd={prodToAdd} prInBasket={prInBasket}/>
            </div>
        );
    };

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

export default FilterPanel;