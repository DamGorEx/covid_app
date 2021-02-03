import React from 'react';
import {GiGasMask, GiMedicinePills, GiSpiralBottle, ImBooks} from "react-icons/all";

export const shopItems =
    [
        {
            Name: "Maseczki",
            ikon: <GiGasMask/>,
            cName: "nav-text",
            cat: "mask"
        },
        {
            Name: "Artykuły do dezynfekcji",
            ikon: <GiSpiralBottle/>,
            cName: "nav-text",
            cat: "hygiene_products"
        },
        {
            Name: "Suplementy",
            ikon: <GiMedicinePills/>,
            cName: "nav-text",
            cat: "suplements"
        },
        {
            Name: "Książki",
            ikon: <ImBooks/>,
            cName: "nav-text",
            cat: "books"
        }
    ];



