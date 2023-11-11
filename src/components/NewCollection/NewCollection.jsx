import React from 'react'

import ProductsSection from '../ProductsSection/ProductsSection'

function NewCollection({newCollection}) {
  return (
    <>
      {/* section header */}
      <h1 className="section-header">
        NEW ARRIVALS
      </h1> 
      {/* product section */}
      <div className="product-section-wrapper">
        <ProductsSection productsSnaps={newCollection}/>
      </div>
    </>
  )
}

export default NewCollection