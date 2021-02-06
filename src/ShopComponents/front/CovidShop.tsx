import React from 'react';
import FilterPanel from "./FilterPanel";
import ProductPanel from "./ProductPanel";
import "../css/CovidShop.scss"
import ProductInBasketCollection from "../interfaces/ProductInBasketCollection";
import ProductInBasket from "../interfaces/ProductInBasket";
import * as ShopUtils from "../utils/ShopUtils";

class CovidShop extends React.Component {
    state = {productFilter: "", lastItemAdded: ""}
    filterProduct = (n: string) => {
        this.setState({
            productFilter: n
        });
    };
    addToBasket = (n: string, price: number) => {
        console.log(n);
        let lc: any = localStorage.getItem("productsInBasket");
        console.log(lc);
        if (lc != null) {
            let products: ProductInBasketCollection = JSON.parse(lc);
            let prodExisted = false;
            products.products.forEach((p) => {
                if (n == p.name) {
                    p.qty = p.qty + 1;
                    prodExisted = true;
                    this.setState({lastItemAdded: p.name + p.qty})
                }
            });
            if (!prodExisted) {
                let newProd: ProductInBasket = {name: n, qty: 1, price: price};
                products.products.push(newProd);
                this.setState({lastItemAdded: n + 1})
            }
            localStorage.setItem("productsInBasket", JSON.stringify(products));
        } else {
            const firstProdInBasket: ProductInBasket = {name: n, qty: 1, price: price};
            const firstProdInBasketCol: ProductInBasketCollection = {products: [firstProdInBasket]};
            localStorage.setItem("productsInBasket", JSON.stringify(firstProdInBasketCol));
        }
    };

    render() {
        const currentProductFilter = this.state.productFilter;
        const prodToAdd = this.state.lastItemAdded;
        return (
            <body>
                 <div className="text-welcome">
                    DOKONAJ NIEZBĘDNYCH ZAKUPÓW W NASZYM SKLEPIE
                  </div>
          
                  <div className="koszyk-pasek">
                        <div className="koszyk-pasek-daneL">KOSZYK</div>
                        <div className="koszyk-pasek-daneR">SUMA: {ShopUtils.getTotalPrice()} zł</div>
                 </div>

                <div className="CovidShop">
                    <FilterPanel filterProduct={this.filterProduct} prodToAdd={prodToAdd}/>
                    <div className="shopAll">
                        <ProductPanel filteredProduct={currentProductFilter} addToBasket={this.addToBasket}/>
                    </div>
                </div>




            <div className="footer">
              <div className="footerTop">
                  CONTENT MANAGEMENT SYSTEM - PJATK
              </div>

              <div className="footerBottom">
                  <div className="footerBottomLeft">
                      <a href="link1.html" className="footerOption"> LINK1 </a><div className="pStyle3"></div>
                      <a href="link2.html" className="footerOption"> LINK2 </a><div className="pStyle3"></div>
                      <a href="link3.html" className="footerOption"> LINK3 </a><div className="pStyle3"></div>
                      <a href="link4.html" className="footerOption"> LINK4 </a><div className="pStyle3"></div>
                  </div>
                  <div className="footerBottomRight">
                      DOMINIKA ŁUGOWSKA <div className="pStyle3"></div>
                      MICHELLE HEROK <div className="pStyle3"></div>
                      DAMIAN GORAJ <div className="pStyle3"></div>
                      MARCIN CHOJNACKI
                  </div>
              </div>
          </div>
        </body>);
    }
}

export default CovidShop;