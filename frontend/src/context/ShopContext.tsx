import { createContext, useEffect, useState } from "react";
import { AddToCartProps, CartItem, RemoveFromCartProps, ShopContextType } from "../types/types";
import { Product } from "../../models/Product";
import { toast } from "react-toastify";
import { getAllProducts } from "../../data/endpoints/product/get-all-products";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext<ShopContextType>({
    currency: '$',
    delivery_fee: 10,
    search: '',
    setSearch: () => { },
    showSearch: false,
    setShowSearch: () => { },
    cartItems: [],
    addToCart: async () => { },
    getCartCount: () => 0,
    updateQuantity: async () => { },
    removeFromCart: async () => { },
    getCartAmount: () => 0,
    navigate: (to: string) => { },
    token: '',
    setToken: () => { },
    backendUrl: 'http://localhost:4000',
    setCartItems: () => { },

});

const ShopContextProvider = (props: React.PropsWithChildren) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState<string>('');
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await getAllProducts();
            setProducts(productsData.slice(0, 10));
        };

        fetchProducts();
    }, []);

    const addToCart = async({ itemId, size }: AddToCartProps) => {
        if (!size) {
            toast.error('Please select a size before adding to cart.');
            return;
        }

        setCartItems(prev => {
            const itemIndex = prev.findIndex(
                item => item.productId === itemId && item.size === size
            );

            if (itemIndex !== -1) {
                // Item exists – update quantity
                const updated = [...prev];
                updated[itemIndex].quantity += 1;
                return updated;
            }

            // Item doesn't exist – add new one
            const product = products.find(p => p.id === itemId);
            if (!product) {
                return prev;
            }

            return [
                ...prev,
                {
                    productId: itemId,
                    size,
                    quantity: 1,
                    price: product.price,
                },
            ];
        });

        if (token) {
            axios
                .post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } })
                .then(() => toast.info('Item added to cart'))
                .catch(err => console.error(err));
        }
    };


    const getCartCount = () => {
        let totalCount = 0;
        for (let i = 0; i < cartItems.length; i++) {
            totalCount += cartItems[i].quantity;
        }
        return totalCount;
    }

    const updateQuantity = async ({ itemId, size, quantity }: RemoveFromCartProps) => {
        let cartData = structuredClone(cartItems);
        const currentItem = cartData.find(
            (item) => item.productId === itemId && item.size === size
        );
        if (currentItem) {
            currentItem.quantity = quantity;

            setCartItems(cartData);


            if (token) {
                try {
                    await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity: currentItem.quantity }, { headers: { token } })
                    toast.info("Product quantity updated")
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    const removeFromCart = async ({ itemId, size }: RemoveFromCartProps) => {
        const cartData = structuredClone(cartItems);
        const index = cartData.findIndex(
            (item) => item.productId === itemId && item.size === size
        );

        if (index !== -1) {
            cartData.splice(index, 1);
            setCartItems(cartData);

            if (token) {
                try {
                    await axios.delete(`${backendUrl}/api/cart/remove`, {
                        data: { itemId, size },
                        headers: { token },
                    });
                    toast.info('Product removed from cart');
                } catch (error) {
                    console.error(error);
                    toast.error('Error while removing item');
                }
            }
        }
    };

    const getCartAmount = () =>
        cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);


    const getUserCart = async (token: string) => {
        try {

            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { Authorization: `Bearer ${token}` } })

            setCartItems(response.data.cartData)
            console.log("tooo:", cartItems)

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            getUserCart(token);
        }
    }, [token]);


    const value = {
        currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch, setCartItems,
        cartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl, token, removeFromCart,
        setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;