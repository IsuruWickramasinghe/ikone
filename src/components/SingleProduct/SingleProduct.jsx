import React, { useState,useEffect } from 'react'

import './singleProduct.css'

import client, { urlFor } from '../../lib/client'
import { useStateContext } from '../../context/StateContext';

import { Link, useNavigate, useParams } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import { toast } from 'react-hot-toast';

import LoadingScreenInside from '../LoadingScreen/LoadingScreenInside';

function SingleProduct() {

  const nevigate = useNavigate()

  const {changeQuantitiesMax, changeQuantitiesMin, selectedQuantities, onAdd, selectedSize, setSelectedSize } = useStateContext();

  const [isLoadingSingleProduct, setIsLoadingSingleProduct] = useState(true)

  const currentSlug = useParams().productId
  const [singheProduct, setSingheProduct] = useState([])

  const selectedProductSize = (productSize) => {
    setSelectedSize(productSize)
  }

  // get current product data
  useEffect(()=>{
    const sale_section = async () =>{
      try {
        const querySingleProduct = `*[_type == "product" && slug.current == "${currentSlug}"]`;
        const docsSingleProduct = await client.fetch(querySingleProduct)
        setSingheProduct(docsSingleProduct)
        setIsLoadingSingleProduct(false)
      } catch (error) {
        console.log(error.message)
        setIsLoadingSingleProduct(true)
      }
    }
    sale_section()
  }, [])

  if(isLoadingSingleProduct){
    return(
      <div className="single-product-container">
        <div className="loading-screen-1">
          <LoadingScreenInside />
        </div>
      </div>
    )
  }

  return (
    <div className='single-product-container'>
      {/* selected product */}
      {singheProduct && singheProduct?.map((product,index)=>(
        <div key={index} className='single-product-wrapper'>


          {/* images */}
          <div className="single-product-image-wrapper">
            <div className="single-product-image">
              <Carousel 
                showThumbs={false}
                showStatus={true}
                swipeable={true}
                emulateTouch={true}>
                {product.image && product.image.map((image,index)=>(
                  <img key={image} src={urlFor(image)} alt="product-image" className='product-image'/>
                ))}
              </Carousel>
            </div>
          </div>


          {/* product details */}
          <div className="single-product-details">
            {/* title */}
            <div className="single-product-title">
              {product.name}
            </div>
            {/* discount */}
            {(product.discount)? 
            <div className="single-product-discount">
              {`${product.discount}% OFF / LKR${product.price}.00`}
            </div> : ""
            }
            {/* price */}
            <div className="single-product-price">
              {`LKR${product.price}.00`}
            </div>
            {/* hr tag */}
            <div className="hr-tag"></div>
            {/* sizes */}
            <div className="single-product-sizes">
              <div className="product-desc-title">
                SIZE
              </div>
              <div className="size-btns">
                {product.size && product.size.map((productSize) => (
                  (productSize != "")
                  ? 
                  <button 
                    onClick={()=>{selectedProductSize(productSize)}}
                    className={(selectedSize == productSize)? 'btn-buy-black selected-btn size-btn' : 'btn-buy-black size-btn'} 
                    key={productSize}>{productSize}
                  </button> 
                  : ""
                ))}
              </div>
            </div>
            {/* QUANTITY */}
            <div className="single-product-quantity">
              <div className="product-desc-title">
                QUANTITY
              </div>
              <div className="select-quantity">
                <button className="quant-min" onClick={changeQuantitiesMin}>-</button>
                <div className='quant-val'>{selectedQuantities}</div>
                <button className="quant-max" onClick={changeQuantitiesMax}>+</button>
              </div>
            </div>
            {/* hr tag */}
            <div className="hr-tag"></div>
            {/* buttons */}
            <div className="single-product-btns">
              <button className="btn-buy-black" onClick={()=>{ (selectedSize === "")? toast.error("select item size") : (onAdd(product,selectedQuantities),nevigate('/cart')) }}>BUY NOW</button>
              <button className="btn-buy-white" onClick={()=>(selectedSize === "")? toast.error("select item size") : onAdd(product,selectedQuantities) }>ADD TO CART</button>
            </div>
            {/* policys */}
            <div className="product-policys">
                <Link className='product-policy-link'>privacy policy</Link>
                <Link className='product-policy-link'>shipping policy</Link>
            </div>
            {/* hr tag */}
            <div className="hr-tag"></div>
            {/* description */}
            <div className="single-product-description">
              <div className="product-dec-title">
                DESCRIPTION
              </div>
              <div className="desc-points">
                <ul>
                <div className="desc-text">
                  {product.details_desc}
                </div>
                  {product.details_points && product.details_points.map((point,i)=>(
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SingleProduct