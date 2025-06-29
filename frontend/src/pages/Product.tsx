import React, { use, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAllProducts } from '../../../backend-ex/data/endpoints/product/get-all-products';
import type { Product } from '../../../backend-ex/models/Product'; 
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const numProductId = productId ? Number(productId) : undefined;
  const {currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState<Product>();
  const [products, setProducts] = useState<Product[]>([]);
  const [size, setSize] = useState<string>('');
  
  const [image,setImage] = useState<string>('');
  
    useEffect(() => {
      const fetchProducts = async () => {
      const productsData = await getAllProducts({page:0, size:0});
      setProducts(productsData); 
      };
  
      fetchProducts();
    }, []);

    const fetchProductData = async () => {
      
      products.map((item) => {
        if (item._id === numProductId) {
          setProductData(item);
          setImage(item.image[0]);
          return null;
        }
    })
    }

    useEffect(() => {
      if (numProductId !== undefined) {
        fetchProductData();
      }
    }, [numProductId, products]);

    
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100'>
      
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product images section */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index)=> (
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>

          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* Product details section */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={()=> setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>

          <button onClick={()=>addToCart({itemId:productData._id, size})} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Review section */}

      <div className='mt-20'>
          <div className='flex'>
              <b className='border px-5 py-3 text-sm'>Description</b>
              <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>E-commerce websites are online platforms that enable businesses and individuals to buy and sell goods or services over the internet. These sites provide a convenient shopping experience, allowing customers to browse products, compare prices, and make purchases from anywhere at any time.</p>
              <p>E-commerce platforms often include features such as product catalogs, shopping carts, secure payment gateways, and customer reviews. They play a crucial role in the modern economy by connecting buyers and sellers globally, streamlining transactions, and offering a wide variety of products that may not be available locally.</p>
          </div>
      </div>

      {/* Related products section */}
      
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />


    </div>
  ) : 
  <div className='opacity-0'></div>
}

export default Product
