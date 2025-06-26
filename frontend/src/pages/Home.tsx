import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import { Product } from '../../../backend-ex/models/Product'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'


const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
    </div>
  )
}

export default Home
