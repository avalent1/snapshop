import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShowContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { ProductProps } from '../types/types';

const LatestCollection = () => {

  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  
  useEffect(()=>{
    setLatestProducts(products.slice(0,10))
  },[])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'Latest'} text2={'Collection'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, nisi quae repellendus deserunt aliquam aliquid necessitatibus quibusdam veniam tenetur fugit impedit aperiam fuga ad ipsa facere cum magni dicta fugiat?</p>
      </div>
    
      {/* Rendering product
      phone view dvije kolone, tablet view tri kolone, desktop view četiri kolone, laptop view pet kolona
      */}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
       {
        latestProducts.map((item:ProductProps, index) => (
          <ProductItem key={index} _id={item._id} image={item.image} name={item.name} price={item.price} />
        ))
       }
      </div>

    </div>
  )
}

export default LatestCollection
