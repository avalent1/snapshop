import React, { useContext } from 'react'
import { ShopContext } from '../context/ShowContext'
import { ProductProps } from '../types/types';
import { Link } from 'react-router-dom';

const ProductItem = ( {_id, image, name, price}: ProductProps) => {

    const {currency} = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${_id}`}>
    <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
    </div>
    <p className='pt-3 pb-1 text-sm'>{name}</p>
    <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
