import React from 'react'

import './bestSelling.css'

import ProductsSection from '../ProductsSection/ProductsSection'

function BestSelling({bestSelling}) {
  return (
    <>
      {/* section header */}
      <div className="section-header">
        BEST SELLING
      </div> 
      {/* product section */}
      <div className="product-section-wrapper">
          <ProductsSection productsSnaps={bestSelling}/>
      </div>
    </>
  )
}

export default BestSelling