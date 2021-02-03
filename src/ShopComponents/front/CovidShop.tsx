import React from 'react';
import FilterPanel from "./FilterPanel";
import ProductPanel from "./ProductPanel";
import "../css/CovidShop.scss"


class CovidShop extends React.Component {
    state = {productFilter: ""}
    filterProduct = (n: string) => {
        this.setState({
            productFilter: n
        });
    };

    render() {
        const currentProductFilter = this.state.productFilter;
        return (<div className="CovidShop">
            <FilterPanel filterProduct={this.filterProduct}/>
            <ProductPanel filteredProduct={currentProductFilter}/>
        </div>);
    }
}

export default CovidShop;