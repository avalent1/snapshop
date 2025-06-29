import React, { useContext, useEffect, useState } from 'react'
import Title from './Title';
import ProductItem from './ProductItem';
import type { Product } from '../../../backend-ex/models/Product'; 
import { getAllProducts } from '../../../backend-ex/data/endpoints/product/get-all-products';
  

const LatestCollection: React.FC = () => {

const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
    const productsData = await getAllProducts({page:0, size:0});
    setLatestProducts(productsData.slice(0, 10)); 
    };

    fetchProducts();
  }, []);

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
        latestProducts.map((item:Product, index) => (
          <ProductItem key={index} product={item} />
        ))
       }
      </div>

    </div>
  )
}

export default LatestCollection
