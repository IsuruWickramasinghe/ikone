import React, { useState, useEffect } from 'react';

import client from '../lib/client'

import ProductsSection from '../components/ProductsSection/ProductsSection';


function ProductsPage({gender}) {

  const [currentGender,setCurrentGender] = useState("")
  const [filteredCategories,setFilteredCategories] = useState([])
  const [filteredProducts,setFilteredProducts] = useState([])
  const [selectedCategory,setSelectedCategory] = useState("all")


  const handleSelectedCategory = (category) => {
    setSelectedCategory(category)
  }

  useEffect(()=>{
    const productsFetch = async () =>{
      try {
        const queryCategories = `*[_type == "product_categories" && product_gender == "${gender}"]`;
        const docsCategories = await client.fetch(queryCategories)
        setFilteredCategories(docsCategories)
        const querySelectedProducts = (selectedCategory == "all")? `*[_type == "product" && gender == "${gender}"]` : `*[_type == "product" && gender == '${gender}' && (gender == '${gender}' && category == "${selectedCategory}")]`;
        const docsSelectedProducts = await client.fetch(querySelectedProducts)
        setFilteredProducts(docsSelectedProducts)
      } catch (error) {
        console.log(error.message)
      }
    }
    (currentGender == gender)? "" : setSelectedCategory("all")
    setCurrentGender(gender)
    productsFetch()
  }, [gender,selectedCategory])


  return (
    <div className='products-page'>

      {/* product categories */}
      <div className="products-sub-categories-wrapper">
        {filteredCategories && filteredCategories?.map((categories)=>(
          <div key={categories} className='products-sub-categories'>
            {categories.sub_categories && categories.sub_categories?.map((category)=>(
              <button 
                key={category} 
                className={(selectedCategory == category)? 'btn-buy-black selected-btn size-btn' : 'btn-buy-black size-btn'}
                onClick={()=>{handleSelectedCategory(category)}}>
                  {category}
              </button>
            ))}
          </div>
        ))}
      </div>
      {/*  */}
      {/* products */}
      <div className='all-products'>
      {(filteredProducts.length == 0)? 'out of stock' : <ProductsSection productsSnaps={filteredProducts}/> }
      </div>
      
    </div>
  )
}

export default ProductsPage