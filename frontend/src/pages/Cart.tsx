import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Product } from '../../../backend-ex/models/Product';
import { getAllProducts } from '../../../backend-ex/data/endpoints/product/get-all-products';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart: React.FC = () => {

  const  {currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [products, setProducts] = useState<Product[]>([]);
  const tempData: { _id: number; size: string; quantity: number }[] = [];

  const [cartData, setCartData] = useState<{ _id: number; size: string; quantity: number }[]>([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
      const productsData = await getAllProducts({page:0, size:0});
      setProducts(productsData); 
      };
  
      fetchProducts();
    }, []);

    useEffect(() => {

      for (const items in cartItems) {
        for (const item in cartItems[items]){
          if (cartItems[items][item] > 0 ){
            tempData.push({
              _id: Number(items),
              size: item,
              quantity:cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);

    }, [cartItems]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;
            return (
              <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-col-[4fr_2fr_0.5fr] items-center gap-4">
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text.xs sn:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e)=>e.target.value === '' || e.target.value === '0' ? null : updateQuantity({ itemId: item._id, size: item.size, quantity: Number(e.target.value)})} className='border max-w-10 sm:mx-w-20 px-1 sm:px2 py-1' type="number" min={1} defaultValue={item.quantity} />
                <img onClick={() => updateQuantity({ itemId: item._id, size: item.size, quantity: 0 })} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            );
          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w.[450px]'>
          <CartTotal />
        </div>
      </div>

    </div>
  )
}

export default Cart
