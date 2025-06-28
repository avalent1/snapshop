import { createContext, useState } from "react";
import { ShopContextType } from "../types/types";

export const ShopContext = createContext<ShopContextType>({
    currency: '$',
    delivery_fee: 10,
    search: '',
    setSearch: () => {},
    showSearch: true,
    setShowSearch: () => {}
});

const ShopContextProvider = (props: React.PropsWithChildren)=> {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState<string>('');
    const [showSearch, setShowSearch] = useState<boolean>(false);

    const value = {
        currency, delivery_fee, search, setSearch, showSearch, setShowSearch
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;