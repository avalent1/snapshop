import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import { Product } from '../../../backend-ex/models/Product'


const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
    </div>
  )
}

export default Home
