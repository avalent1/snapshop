import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-3/4 text-gray-500'>
                Welcome to our online store! We are dedicated to providing you with the best shopping experience, offering a wide range of products at competitive prices. Our team is committed to ensuring your satisfaction with every purchase. Thank you for choosing us!
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li className='hover:text-gray-800 cursor-pointer'>Home</li>
                <li className='hover:text-gray-800 cursor-pointer'>About Us</li>
                <li className='hover:text-gray-800 cursor-pointer'>Delivery</li>
                <li className='hover:text-gray-800 cursor-pointer'>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+385/95-544-9920</li>
                <li>contact@snapshop.com</li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className='text-center text-gray-500 text-xs my-5'>© 2025 Snapshop. All rights reserved.</p>
        </div>

    </div>
  )
}

export default Footer
