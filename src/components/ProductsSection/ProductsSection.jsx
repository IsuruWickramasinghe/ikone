import React from 'react'

import './productsSection.css'

import { Link } from "react-router-dom";
import { urlFor } from '../../lib/client';

import LoadingScreenInside from '../LoadingScreen/LoadingScreenInside';

import { useStateContext } from '../../context/StateContext';

function ProductsSection({productsSnaps}) {

  const { loadingComps } = useStateContext()


  return (
    <>
      {
        (loadingComps) ?
          <div className='loading-screen-1'>
            <LoadingScreenInside />
          </div>
         :
          <>
          {productsSnaps && productsSnaps?.map((item,index) => (
            <div className="product-card" key={index}>
              {/* {console.log(item)} */}
              <div className="product-img">
                <Link to={`/collections/${item && item.slug.current}`}>
                  <img src={urlFor(item && item.image[0])} alt="productimg" />
                </Link>
              </div>
              <div className="product-desc">
                <div className="product-title">
                  {item.name}
                  {/* Carnage Desire Oversize Tee - Vintage */}
                </div>
                <div className="product-discount">
                  {(item.discount)? `${item.discount}% OFF / LKR${item.price}.00`  : "no special offers"}
                </div>
                <div className="product-price">
                  {`LKR${item.price}.00`}
                </div>
              </div>
            </div>
          ))}
          </>
        
      }
    </>
  )
}

export default ProductsSection