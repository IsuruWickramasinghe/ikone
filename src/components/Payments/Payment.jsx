import React from 'react';
import { useStateContext } from '../../context/StateContext';
import getStripe from '../../lib/getStripe';
import toast from 'react-hot-toast';
import axios from 'axios';

function Payment({button_name}) {
  const { cartItems, user } = useStateContext();

  const handleCheckout = async () => {

    if(user){

      const stripe = await getStripe();

      try {
        const response = await axios.post('/create-checkout-session', {
          mode: 'no-cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          cartItems,
          user
        });
  
        if (!response.data || !response.data.id) {
          console.error('Invalid response:', response.data);
          toast.error("Invalid response")
          return;
        }
        toast.loading('Redirecting...');
        await stripe.redirectToCheckout({ sessionId: response.data.id });
        
      } catch (error) {
        console.error('Error creating checkout session:', error);
        toast.error("Error creating checkout session")
      }
    }
    else{
      toast(
        "Please sign up before making payments. ",
        {
          duration: 6000,
        }
      );
    }

  };



  return (
    <>
        <button className='btn-buy-black' onClick={handleCheckout}>{button_name}</button>
    </>
  );
}

export default Payment;