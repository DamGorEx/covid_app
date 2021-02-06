import React from 'react';
import {GiGasMask, GiMedicinePills, GiSpiralBottle, ImBooks} from "react-icons/all";


export const shopItems =
    [
        {
            Name: "MASECZKI",
            ikon: <GiGasMask/>,
            cName: "nav-text2",
            cat: "mask"
        },
        {
            Name: "DEZYNFEKCJA",
            ikon: <GiSpiralBottle/>,
            cName: "nav-text2",
            cat: "hygiene_products"
        },
        {
            Name: "SUPLEMENTY",
            ikon: <GiMedicinePills/>,
            cName: "nav-text2",
            cat: "suplements"
        },
        {
            Name: "KSIAŻKI",
            ikon: <ImBooks/>,
            cName: "nav-text2",
            cat: "books"
        }
    ];



