import React from "react";
import {shopItems} from "./ShopItems"
import "../css/FilterPanel.scss"

interface myProps {
    filterProduct: (text: string) => void
}

class FilterPanel extends React.Component<myProps, {}> {
    state = {
        applyFilter: false
    }

    constructor(props: myProps) {
        super(props);
    }

    render() {
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
            </div>
        );
    };
}

export default FilterPanel;