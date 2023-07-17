import React, { useEffect, useState } from 'react'

import client from '../lib/client'

import HeroSection from '../components/HeroSection/HeroSection'
import BestSelling from '../components/BestSelling/BestSelling'
import NewCollection from '../components/NewCollection/NewCollection'
import IkoneFooterBanner from '../components/FooterBanner/IkoneFooterBanner'
import HomeBanner from '../components/HomeBanner/HomeBanner' 


function HomePage() {

  const [saleBanner, setSaleBanner] = useState([])
  const [heroBanners, setHeroBanners] = useState([])
  const [bestSelling, setBestSelling] = useState([])
  const [newCollection, setNewCollection] = useState([])

  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const querySale = '*[_type == "hero_sale"]';
        const docsSale = await client.fetch(querySale)
        setSaleBanner(docsSale)

        const queryBanners = '*[_type == "hero_banner"]';
        const docsBanners = await client.fetch(queryBanners)
        setHeroBanners(docsBanners)

        const queryBestSelling = '*[_type == "product" && is_best_selling == true]';
        const docsBestSelling = await client.fetch(queryBestSelling)
        setBestSelling(docsBestSelling)

        const queryNewCollection = '*[_type == "product" && isNew == true]';
        const docsNewCollection = await client.fetch(queryNewCollection)
        setNewCollection(docsNewCollection)

      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='home-page'>
      {/* home banner */}
      <div className="home-banner">
        <HomeBanner />
      </div>
      {/* hero section */}
      <div className="hero-section">
        <HeroSection saleBanners={ saleBanner } heroBanners={ heroBanners }/>
      </div>
      {/* best selling */}
      <div className="best-selling">
        <BestSelling  bestSelling={ bestSelling }/>
      </div>
      {/* new collection */}
      <div className="new-collection">
        <NewCollection newCollection={ newCollection }/>
      </div>
      {/* banner */}
      <div className="footer-banner">
        <IkoneFooterBanner />
      </div>
    </div>
  )
}

export default HomePage
