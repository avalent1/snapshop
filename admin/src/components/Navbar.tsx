import React from 'react'
import {assets} from '../assets/assets.ts'

type LoginProps = {
    setToken: (token: string) => void;
};

const Navbar: React.FC<LoginProps> = ({ setToken }) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src={assets.snapshop_logo} alt="" />
      <p className='text-2xl font-semibold text-gray-700 mb-2 border-b pb-1'>Admin Panel</p>
      <button onClick={() => setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
