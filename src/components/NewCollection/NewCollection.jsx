import React from 'react'

import ProductsSection from '../ProductsSection/ProductsSection'

function NewCollection({newCollection}) {
  return (
    <>
      {/* section header */}
      <div className="section-header">
        NEW ARRIVALS
      </div> 
      {/* product section */}
      <div className="product-section-wrapper">
        <ProductsSection productsSnaps={newCollection}/>
      </div>
    </>
  )
}

export default NewCollection