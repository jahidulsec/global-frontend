import React from 'react'
import Slider from '../components/Home/Slider'
import Brand from '../components/Home/Brand'
import TrendingProduct from '../components/Home/TrendingProduct'
import FeaturedProduct from '../components/Home/FeaturedProduct'
import DptMenuHome from '../components/Home/DptMenuHome'
import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <>
    <Helmet>
      <title>Global Computer (BD) | Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh</title>
      <meta property="'description" content="Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh" />
      <meta property="'keywords" content="Laptop shop in Bangladesh, Laptop shop in bd, computer shop in Bangladesh, PC shop in Bangladesh, computer shop in BD, Gaming PC shop in Bangladesh, PC accessories shop in Bangladesh, Online Shop in BD, online computer shop in bd, computer accessories online shop in Bangladesh, computer parts shop in bd, Laptop in Bangladesh, Notebook, Laptop, Desktop, Brand PC, computer, computer store Bangladesh, laptop store Bangladesh, gaming, desktop, monitor, CC camera, CCTV, Global Computer (BD), computer accessories, Desktop accessories, Laptop accessories, Laptop Online Store in BD, hp, apple, asus, bangladesh, boya, brother, cable, GPU, graphics card" />
      <meta property="'og:title" content="Global Computer (BD)" />
      <meta property="og:image" content="/global_mini_logo.png" />
      <meta property="og:url" content="https://globalcomputer.com.bd/" />
      <meta property="og:description" content="Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh" />
    </Helmet>
    <section id='page' className='home-page'>
      <DptMenuHome />
      <Slider />
      {/* <Brand /> */}
      <TrendingProduct />
      <FeaturedProduct />
    </section>
    </>
  )
}

export default Home