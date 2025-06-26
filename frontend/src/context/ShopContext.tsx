import { createContext, useEffect, useState } from "react";
//import { products } from "../assets/assets";
import { ShopContextType } from "../types/types";
import { Product } from "../../../backend-ex/models/Product";
import { getAllProducts } from "../../../backend-ex/data/endpoints/product/get-all-products";
import { getAllProductsMock } from "../../../backend-ex/data/providers/mock-provider/mock-data/get-all-products-mock";

export const ShopContext = createContext<ShopContextType>({
    currency: '$',
    delivery_fee: 10,
});

const ShopContextProvider = (props: React.PropsWithChildren)=> {

    const currency = '$';
    const delivery_fee = 10;

    const value = {
        currency, delivery_fee
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;