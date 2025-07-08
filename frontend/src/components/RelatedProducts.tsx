import React, { use, useEffect, useState } from 'react'
import { Product } from '../../models/Product';
import { getAllProducts } from '../../data/endpoints/product/get-all-products';
import { RelatedProductsProps } from '../types/types';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category, subCategory}: RelatedProductsProps) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    
      useEffect(() => {
        const fetchProducts = async () => {
        const productsData = await getAllProducts();
        setProducts(productsData.slice(0, 10)); 
        };
    
        fetchProducts();
      }, []);

      useEffect(() => {
        if (products.length > 0){
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter(item => item.category === category);
            productsCopy = productsCopy.filter(item => item.subCategory === subCategory);

            setRelatedProducts(productsCopy.slice(0, 5));
        }
      }, [products]);

  return (
    <div className='my-24'>
      <div className='text-center py-2 text-3xl'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {relatedProducts.map((item, index) => (
            <ProductItem key={index} product={item} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
