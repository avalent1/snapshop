import React, { useContext, useEffect, useRef, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Product } from '../../models/Product';
import { getAllProducts } from '../../data/endpoints/product/get-all-products';
import Title from './Title';
import ProductItem from './ProductItem';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { currency } = useContext(ShopContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getAllProducts();
      setBestSeller(productsData.filter((item) => item.bestseller).slice(0, 10));
    };

    fetchProducts();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.offsetWidth / 1.5;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='my-10 relative'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          These are the pieces everyone's talking about. Shop our most-loved and top-selling items.
        </p>
      </div>

      {/* Strelice */}
      <button
        onClick={() => scroll('left')}
        className='absolute left-0 top-[50%] transform -translate-y-1/2 bg-white rounded-full shadow-md z-10 p-2 hover:bg-gray-100'
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => scroll('right')}
        className='absolute right-0 top-[50%] transform -translate-y-1/2 bg-white rounded-full shadow-md z-10 p-2 hover:bg-gray-100'
      >
        <ChevronRight size={24} />
      </button>

      {/* Horizontalni scrollable container */}
      <div
        ref={scrollRef}
        className='flex overflow-x-auto gap-4 px-4 no-scrollbar scroll-smooth'
      >
        {bestSeller.map((item: Product, index) => (
          <div key={index} className='min-w-[180px] max-w-[200px] flex-shrink-0'>
            <ProductItem product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
