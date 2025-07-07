import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';
import type { Product } from '../../models/Product';

interface ProductProps {
  product: Product;
}

const ProductItem: React.FC<ProductProps> = ({ product }) => {

    const {currency} = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${product.id}`}>
    <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={product.images[0].url} alt="" />
    </div>
    <p className='pt-3 pb-1 text-sm'>{product.name}</p>
    <p className='text-sm font-medium'>{currency}{product.price}</p>
    </Link>
  )
}

export default ProductItem
