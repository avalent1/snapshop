import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to Snapshop! We are passionate about bringing you the latest trends and timeless classics in fashion. Our mission is to provide high-quality products and exceptional service to our valued customers.</p>
          <p>Founded in 2025, Snapshop has quickly grown into a trusted destination for shoppers seeking style, value, and convenience. Thank you for being a part of our journey!</p>
          <b className='text-gray-800'>Our mission</b>
          <p>Our mission is to help you express your style with confidence by offering a wide range of quality fashion at fair prices.</p>
        </div>

      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US?'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We offer a carefully curated selection of quality products at fair prices, ensuring you always find something you love.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Our team is committed to fast shipping, secure payments, and friendly customer support to make your shopping experience smooth and enjoyable.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>At Snapshop, your satisfaction is our top priority. Join our community and discover the difference!</p>
        </div>
      </div>

      <NewsletterBox />
      
    </div>
  )
}

export default About
