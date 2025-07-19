import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import { Product } from '../../models/Product'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'


const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home
