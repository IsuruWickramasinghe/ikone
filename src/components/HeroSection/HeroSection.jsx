import React from 'react'

import HeroIcon from '../../assets/hero-icon.svg'
import CountDownTimer from '../CountDown/CountDownTimer'
import { urlFor } from '../../lib/client'

import { Link } from 'react-router-dom'

import { Carousel } from 'react-responsive-carousel';


function HeroSection({saleBanners,heroBanners}) {

  return (
    <>
      {/* discount cards */}
      {saleBanners && saleBanners?.map((data, index) => (
        <div 
        className="discount-cards" key={index} >
          {/* current discount */}
          <div className="current-discount">
            <div>
               <img src={HeroIcon} alt="heroicon" className="hero-icon" />
              <p className="heading">{data.header}</p>
              <div className="sale-countdown">
                 <CountDownTimer targetDate={new Date(data.sale_end)} />
              </div>
              {/* sale buy button */}
              <Link to={`/collections/${data.route_path}`}>
                <button className='sale-buy-btn btn-buy-white'>
                  SHOW NOW
                </button>
              </Link>
            </div>
            <div>
              {data.sale_category && data.sale_category.title} {/* Accessing the title property of the sale_category */}
            </div>
          </div>
          {/* up coming discount */}
          <div className="upcomming-event">
          <img src={HeroIcon} alt="heroicon" className="hero-icon" />
            <div className="upcomming-event-header">
              Upcoming Event
            </div>
            <div className="upcomming-event-title">
              {data.upcoming_event}
            </div>
          </div>
        </div>
      ))}

      {/* hero product banner */}  
      <div className="hero-banner-wrapper">

        {/* banner one */}
        {heroBanners &&
          heroBanners?.map((bnrs, index) => (
            <div className="hero-product-banners" key={index}
            data-aos-duration="1000"
            data-aos="fade-up"
            >
              <Carousel 
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                autoPlay={true}
                stopOnHover={true}
                swipeable={true}
                emulateTouch={true}>
                {bnrs.banner && bnrs.banner?.map((bnr, i) => (
                  <div key={i}>
                    <img src={urlFor(bnr)} alt="herobanner" className="hero-banner" />
                  </div>
                ))}
              </Carousel>
            </div>
          ))}

      </div>
        </>
  )
}

export default HeroSection