import ProductInBasket from "../interfaces/ProductInBasket";
import {AiOutlineMinus, AiOutlinePlus, RiDeleteBin5Line} from "react-icons/all";
import * as ShopUtils from "../utils/ShopUtils";
import React from "react";
import {Table} from "react-bootstrap";

interface BasketProp {
    prodToAdd: string,
    prInBasket: never[],

    handleAdd(name: string, index: number): void,

    handleMinus(name: string, index: number): void,

    handleDelete(name: string): void,
};


export default class Basket extends React.Component<BasketProp> {
    state = {
        aniMarker: 0,
        owner: 0
    }

    constructor(prop: BasketProp) {
        super(prop);
    }

    render() {
        let prInBasket = this.props.prInBasket;
        let aniMarker = this.state.aniMarker;
        let callOwner = this.state.owner;
        return (
            <div className="basket-shop-display">
                <p>Podgląd koszyka:</p>
                <Table hover className="basket-table">
                    {prInBasket.map((p: ProductInBasket, index) => {
                        return (
                            <tr
                                // @ts-ignore.
                                aniMarker={(aniMarker !== 0 && index === callOwner) ? aniMarker :
                                    (p.name + p.qty === this.props.prodToAdd) ? 1 : 0}
                                className="basket-table-row"
                                onAnimationEnd={() => {
                                    this.setState({aniMarker: 0})
                                }}
                            >
                                <td>
                                    <li className="basket-table-first-cell">{p.name}</li>
                                </td>
                                <td>{" x" + p.qty}</td>
                                <div className="basket-table-buttons">
                                    <td onClick={() => {
                                        this.setState({aniMarker: 1, owner: index})
                                        this.props.handleAdd(p.name, index)
                                    }}
                                    ><AiOutlinePlus/></td>
                                    <td><AiOutlineMinus onClick={() => {
                                        this.setState({aniMarker: -1, owner: index})
                                        this.props.handleMinus(p.name, index)
                                    }}/></td>
                                    <td><RiDeleteBin5Line onClick={() => {
                                        this.props.handleDelete(p.name)
                                    }}/></td>
                                </div>
                            </tr>
                        );
                    })}
                </Table>
                <div className="basket-total">
                    <p>Suma:</p>
                    <p>{ShopUtils.getTotalPrice()} zł</p>
                </div>
            </div>
        );
    }
}