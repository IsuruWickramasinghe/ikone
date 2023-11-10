import React, { useEffect, useState } from 'react';

import client from '../lib/client';

import HeroSection from '../components/HeroSection/HeroSection';
import BestSelling from '../components/BestSelling/BestSelling';
import NewCollection from '../components/NewCollection/NewCollection';
import IkoneFooterBanner from '../components/FooterBanner/IkoneFooterBanner';
import HomeBanner from '../components/HomeBanner/HomeBanner';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';

import { useStateContext } from '../context/StateContext';


function HomePage() {

  const {isLoadingHomePage,saleBanner,heroBanners,bestSelling,newCollection,homeBanner} = useStateContext()

  if (isLoadingHomePage) {
    return (
      <div className="loading-screen">
        <LoadingScreen />
      </div>
    );
  }


  return (
    <div className="home-container">

      {/* home banner */}
      <div className="home-banner">
        <HomeBanner homeBanner={homeBanner} />
      </div>
    <div className="home-page">
      {/* hero section */}
      <div className="hero-section"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <HeroSection saleBanners={saleBanner} heroBanners={heroBanners} />
      </div>
      {/* best selling */}
      <div className="best-selling"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <BestSelling bestSelling={bestSelling} />
      </div>
      {/* new collection */}
      <div className="new-collection"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <NewCollection newCollection={newCollection} />
      </div>
      {/* banner */}
      <div className="footer-banner"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <IkoneFooterBanner />
      </div>
    </div>
    </div>
  );
}

export default HomePage;
