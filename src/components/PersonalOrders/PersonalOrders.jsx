import React, { useState } from 'react'
import './personalOrders.css'

import { urlFor } from '../../lib/client'

import { db } from '../../config/firebase'
import { updateDoc, doc, getDocs, collection } from 'firebase/firestore'

import toast from 'react-hot-toast'

import { useStateContext } from '../../context/StateContext'



function PersonalOrders() {

  const { user, userOrderHistory, setUserOrderHistory  } = useStateContext()

  // confirm order shipping
  const handleConfirmOrder = async (orderId) => {
    if (user) {
      try {
        await updateDoc(doc(db, 'ikoneUsers', user.uid, 'userPurchases', orderId), {
          isOrderCompleted: true,
        });
        toast.success('Thank you for shopping with us!');
        // Fetch updated userOrderHistory data and update the state
        fetchUserOrderHistory();
      } catch (error) {
        console.log(error);
      }
    }
  };


  // Function to fetch updated userOrderHistory data
  const fetchUserOrderHistory = async () => {
    try {
      const getDataUserOrderHistory = await getDocs(collection(db, 'ikoneUsers', user.uid, 'userPurchases'));
      const updatedUserOrderHistory = [];
      getDataUserOrderHistory.forEach((doc) => {
        updatedUserOrderHistory.push({ id: doc.id, data: doc.data() });
      });
      setUserOrderHistory(updatedUserOrderHistory);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to calculate the total quantity for each size in the productSize array
  const calculateTotalQuantityForSize = (productSize) => {
    const sizes = JSON.parse(productSize);
    const sizeQuantityMap = {};

    // Iterate through the array of sizes
    sizes.forEach((item) => {
      const { size, quantity } = item;
      sizeQuantityMap[size] = (sizeQuantityMap[size] || 0) + quantity;
    });

    // Calculate the total sum
    const totalQuantity = Object.values(sizeQuantityMap).reduce((acc, curr) => acc + curr, 0);

    return totalQuantity;
  };


  // copy product id
  const habdleCopyOrderId = (orderId) => {
    toast.success("Order id coppied!")
    navigator.clipboard.writeText(orderId);
  }

  return (
    <div className='my-order-container'>
      <div className="my-orders-wrapper">
        { userOrderHistory && userOrderHistory?.map((userSingleOrder)=>(

          <div className="my-order-card" key={userSingleOrder.id}>
            {/* order img */}
            <div className="my-order-image">
              <img src={urlFor(userSingleOrder.data.productImages)} alt="productimg" />
            </div>
            {/* order desc */}
            <div className="my-order-desc">
              {/* order title */}
              <div className="my-order-title">{userSingleOrder.data.productName}</div>
              {/* order price */}

              <div className="my-order-quntities-and-price">
                {`LKR${userSingleOrder.data.productPrice}.00 X ${calculateTotalQuantityForSize(userSingleOrder.data.productSize)}
                `}
                
              </div>

              {/* order shipped */}
              <div
                className={
                  (userSingleOrder.data.isOrderCompleted)? "my-order-confirmed" :
                  (!userSingleOrder.data.isOrderShipped)? "my-order-pending" : "my-order-shipped"
                }>
                { 
                  (userSingleOrder.data.isOrderCompleted)? "order confirmed" :
                  (!userSingleOrder.data.isOrderShipped)? "order pending" :"order shipped" 
                }
              </div>
              {/* order btns */}
              <div className="my-order-btns">
                <div className="conform-my-order">
                  {
                    (userSingleOrder.data.isOrderShipped)? (
                      (!userSingleOrder.data.isOrderCompleted)? 
                      (
                        <button onClick={()=>handleConfirmOrder(userSingleOrder.id)}>Confirm order</button>
                      ) : ""
                     ) : "" 
                  }
                </div>
                <div className="copy-my-order-id">
                  <button onClick={()=>{habdleCopyOrderId(userSingleOrder.id)}}>Copy order Id</button>
                </div>
              </div>
            </div>
          </div>
        )) }
      </div>
    </div>
  )
}

export default PersonalOrders