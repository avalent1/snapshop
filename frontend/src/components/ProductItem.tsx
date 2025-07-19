import React, { useContext, useEffect, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import type { Product } from '../../models/Product';
import gsap from 'gsap';

interface ProductProps {
  product: Product;
}

const ProductItem: React.FC<ProductProps> = ({ product }) => {
  const { currency } = useContext(ShopContext);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const randomX = gsap.utils.random(-100, 100);
    const randomRotation = gsap.utils.random(-8, 8);

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 100,
        x: randomX,
        rotate: randomRotation,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        rotate: 0,
        scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.6)',
      }
    );
  }, []);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      rotate: 1,
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to(imgRef.current, {
      y: -8,
      scale: 1.1,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to(imgRef.current, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  return (
    <Link
      ref={cardRef}
      to={`/product/${product.id}`}
      className='block text-gray-700 cursor-pointer'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='overflow-hidden rounded-2xl shadow-xl'>
        <img
          ref={imgRef}
          src={product.images[0].url}
          alt={product.name}
          className='transition-all duration-300 ease-in-out w-full h-auto'
        />
      </div>
      <p className='pt-3 pb-1 text-sm tracking-wide'>{product.name}</p>
      <p className='text-sm font-semibold text-gray-800'>
        {currency}
        {product.price}
      </p>
    </Link>
  );
};

export default ProductItem;
