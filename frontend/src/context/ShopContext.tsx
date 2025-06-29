import { createContext, useEffect, useState } from "react";
import { AddToCartProps, CartItem, RemoveFromCartProps, ShopContextType } from "../types/types";
import { Product } from "../../../backend-ex/models/Product";
import { toast } from "react-toastify";
import { getAllProducts } from "../../../backend-ex/data/endpoints/product/get-all-products";

export const ShopContext = createContext<ShopContextType>({
    currency: '$',
    delivery_fee: 10,
    search: '',
    setSearch: () => {},
    showSearch: false,
    setShowSearch: () => {},
    cartItems: {},
    addToCart: async () => {},
    getCartCount: () => 0,
    updateQuantity: async () => {},
    getCartAmount: () => 0,
});

const ShopContextProvider = (props: React.PropsWithChildren)=> {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState<string>('');
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<Record<number, CartItem>>({});
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
    const fetchProducts = async () => {
    const productsData = await getAllProducts({page:0, size:0});
    setProducts(productsData.slice(0, 10)); 
    };

    fetchProducts();
    }, []);

    const addToCart = async ({itemId, size}: AddToCartProps) => {

        if (!size) {
            toast.error('Please select a size before adding to cart.');
            return;
        }
        
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems){
            for (const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async ({itemId, size, quantity}:RemoveFromCartProps) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems){
            let itemInfo = products.find((product) => product._id === Number(items))
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0 && itemInfo){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const value = {
        currency, delivery_fee, 
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;