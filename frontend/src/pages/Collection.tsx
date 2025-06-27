import React, { use, useEffect, useState } from 'react'
import { Product } from '../../../backend-ex/models/Product';
import { getAllProducts } from '../../../backend-ex/data/endpoints/product/get-all-products';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);

  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (r: React.ChangeEvent<HTMLInputElement>) => {
    if (subCategory.includes(r.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== r.target.value));
    }
    else {
      setSubCategory(prev => [...prev, r.target.value]);
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }
  
  
    useEffect(() => {
      const fetchProducts = async () => {
      const productsData = await getAllProducts({page:0, size:0});
      setProducts(productsData); 
      };
  
      fetchProducts();
    }, []);

    useEffect(() => {
      setFilterProducts(products);
    }, []);

    useEffect(() => {
      applyFilter();
    }, [category, subCategory]);


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter options */}

      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Categories */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory}/> Men
            </p><p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory}/> Women
            </p><p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}/> Kids
            </p>
          </div>
        </div>

        {/* Subcategories */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> Topwear
            </p><p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
            </p><p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className='flex-1'>
        
        <div className='flex justify-between text-base sm::text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          {/* Sorting options */}
          <select className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Rendering products */}

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
          filterProducts.map((item:Product, index) => (
            <ProductItem key={index} product={item} />
          ))
        }
        </div>

      </div>
    </div>
  )
}

export default Collection
