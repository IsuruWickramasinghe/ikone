import React, { useEffect, useState } from 'react';

import client from '../lib/client';

import HeroSection from '../components/HeroSection/HeroSection';
import BestSelling from '../components/BestSelling/BestSelling';
import NewCollection from '../components/NewCollection/NewCollection';
import IkoneFooterBanner from '../components/FooterBanner/IkoneFooterBanner';
import HomeBanner from '../components/HomeBanner/HomeBanner';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';


function HomePage() {

  const [isLoadingHomePage, setIsLoadingHomePage] = useState(true);

  const [saleBanner, setSaleBanner] = useState([]);
  const [heroBanners, setHeroBanners] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [newCollection, setNewCollection] = useState([]);
  const [homeBanner, setHomeBanner] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySale = '*[_type == "hero_sale"]';
        const docsSale = await client.fetch(querySale);
        setSaleBanner(docsSale);

        const queryBanners = '*[_type == "hero_banner"]';
        const docsBanners = await client.fetch(queryBanners);
        setHeroBanners(docsBanners);

        const queryBestSelling = '*[_type == "product" && is_best_selling == true]';
        const docsBestSelling = await client.fetch(queryBestSelling);
        setBestSelling(docsBestSelling);

        const queryNewCollection = '*[_type == "product" && isNew == true]';
        const docsNewCollection = await client.fetch(queryNewCollection);
        setNewCollection(docsNewCollection);

        const queryHomeBanner = '*[_type == "home_banner"]';
        const docsHomeBanner = await client.fetch(queryHomeBanner);
        setHomeBanner(docsHomeBanner);

        setIsLoadingHomePage(false); // Data fetching is completed, set isLoadingHomePage to false.
      } catch (error) {
        console.log(error.message);
        setIsLoadingHomePage(true); // Error occurred, set isLoadingHomePage to false.
      }
    };

    fetchData();
  }, []);


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
        data-aos="fade-right"
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
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <IkoneFooterBanner />
      </div>
    </div>
    </div>
  );
}

export default HomePage;
