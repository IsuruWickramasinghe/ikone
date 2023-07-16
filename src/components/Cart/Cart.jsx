import React, { useRef } from 'react'

import './cart.css'

import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

import { useStateContext } from '../../context/StateContext'
import { urlFor } from '../../lib/client'

import Payment from '../Payments/Payment'



function Cart() {
  const cartRef = useRef()
  const { cartItems, totalPrice, totalQuantities, onRemove, toggleCartItemQuanitity } = useStateContext()



  return (
    <div className='cart-wrapper' ref={cartRef}>

      {/* cart header */}
      <div className="cart-header">
        <h2>Shopping Cart ({totalQuantities})</h2>
      </div>

      <div className="cart-container">

        {/* empty cart */}
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <h1>empty <i className="ri-shopping-cart-line"></i></h1>
           </div>
         )}

         {/* cart items */}
        <div className="cart-items-wrapper">
          {cartItems.length >= 1 && cartItems.map((item) => (
            // cart item
            <div className="cart-item" key={item._id}>
              {/* item image */}
              <div className="cart-item-img-wrapper">
                <Link to={`/collections/${item.slug.current}`}><img src={`${urlFor(item?.image[0])}`} alt="productimage" className='cart-item-img'/></Link>
              </div>  
              {/* item description */}
              <div className='cart-item-desc-wrapper'>
                <div className="cart-item-desc">
                  <div className='cart-itmem-name'>{item.name}</div>
                  {(item.discount)? <div className="cart-item-descount">{`${item.discount}% OFF / LKR${item.price}`}</div> : "" }
                  <div className="cart-item-price">{`LKR${item.price}.00`}</div>
                </div>
                {/* item quant and remove */}
                <div className="item-quant-and-remove">
                  {/* quantities */}
                  <div className="select-quantity">
                    <button className="quant-min cart-quant" onClick={()=>{toggleCartItemQuanitity(item._id, 'dec')}} >-</button>
                    <div className='quant-val cart-quant'>{item.quantity}</div>
                    <button className="quant-max cart-quant" onClick={()=>{toggleCartItemQuanitity(item._id, 'inc')}}>+</button>
                  </div>
                  {/* remove btn */}
                  <div className="cart-item-remove">
                    <button className='cart-item-remove-btn' onClick={()=>{onRemove(item)}}>
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* cart item price */}
        <div className="cart-items-price-wrapper">
          <div className="summary">
            <div className='summery-header'>Summary</div>
          </div>
          {/* sub total lkr */}
          <div className="sub-total lkr">
            <div className="sub-total-header">
              Subtotal [LKR]
            </div>
            <div className="sub-total-price">
              {`LKR${totalPrice}.00`}
            </div>
          </div>
          {/* btns */}
          <div className="cart-btns">
            <Payment className="cart-btn" button_name={"CONTINUE PAYMENT"} />
            <Link to={'/'}><button className="btn-buy-white cart-btn">CONTINUE SHOPPING</button></Link>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Cart