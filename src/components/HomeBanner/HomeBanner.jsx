import React from 'react'
import { urlFor } from '../../lib/client'

function HomeBanner({homeBanner}) {

  return (
    <>
      <div
        data-aos="zoom-out-down"
        data-aos-duration="1000"
        className="home-banner-wrapper">
        {
          homeBanner && homeBanner.map((bnr,i)=>[
            // console.log(bnr.banner)
            <img src={urlFor(bnr.banner)} alt="homebanner" key={i} className='home-banner-img'/>
          ])
        }
      </div>
    </>

  )
}

export default HomeBanner