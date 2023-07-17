import React, { useEffect,useState } from 'react'

import client from '../../lib/client'
import { urlFor } from '../../lib/client'

function HomeBanner() {


  const [homeBanner, setHomeBanner] = useState([])

  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const queryHomeBanner = '*[_type == "home_banner"]';
        const docsHomeBanner = await client.fetch(queryHomeBanner)
        setHomeBanner(docsHomeBanner)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [])








  return (
    <div>
      <div className="home-banner-wrapper">
        {
          homeBanner && homeBanner.map((bnr,i)=>[
            // console.log(bnr.banner)
            <img src={urlFor(bnr.banner)} alt="x" key={i} className='home-banner-img'/>
          ])
        }
      </div>
    </div>

  )
}

export default HomeBanner