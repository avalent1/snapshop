import { createContext } from "react";
import { products } from "../assets/assets";
import { ShopContextType } from "../types/types";

export const ShopContext = createContext<ShopContextType>({
    products,
    currency: '$',
    delivery_fee: 10,
});

const ShopContextProvider = (props: React.PropsWithChildren)=> {

    const currency = '$';
    const delivery_fee = 10;

    const value = {
        products, currency, delivery_fee
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;