import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Product } from '../../../backend-ex/models/Product';
import { getAllProducts } from '../../../backend-ex/data/endpoints/product/get-all-products';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const [bestSeller, setBestSeller] = useState<Product[]>([]);
    
      useEffect(() => {
        const fetchProducts = async () => {
        const productsData = await getAllProducts({page:0, size:0});
        setBestSeller(productsData.filter((item) => item.bestseller).slice(0, 5)); 
        };
    
        fetchProducts();
      }, []);
      
    const {currency} = useContext(ShopContext);
    //const [bestSeller, setBestSeller] = useState<Product[]>([]);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'BEST'} text2={'SELLERS'}></Title>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Dummy text</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          bestSeller.map((item:Product, index) => (
          <ProductItem key={index} product={item} />
        ))
        }
      </div>
    </div>
  )
}

export default BestSeller
