import React, { useEffect, useState } from 'react'

import { NavLink, Outlet  } from 'react-router-dom'

import { useStateContext } from '../context/StateContext'

import LoadingScreenInside from '../components/LoadingScreen/LoadingScreenInside'

function ProfilePage() {

  const { userFormData, userAddressForm, userOrderHistory, user } = useStateContext()
  
  const [ isProfileLoad,setIsProfileLoad ] = useState(true)

  useEffect(() => {

    setIsProfileLoad(true);
  
    if (Object.keys(userFormData).length !== 0 && Object.keys(userAddressForm).length !== 0 && userOrderHistory.length) {
      setIsProfileLoad(false);
    }

  }, [userFormData, userAddressForm, userOrderHistory]);
  


  if(isProfileLoad){
    return (
      <div className='account-page'>
        <div className='account-page-links-wrapper'>
          <NavLink to={'/account/profile'} className='account-page-link' >Profile</NavLink>
          <NavLink to={'/account/orders'} className='account-page-link' >My orders</NavLink>
        </div>
        <div className="loading-screen-1">
          <LoadingScreenInside />
        </div>
      </div>
    )
  }

  return (
    <div className='account-page'>
      <div className='account-page-links-wrapper'>
        <NavLink to={'/account/profile'} className='account-page-link' >Profile</NavLink>
        <NavLink to={'/account/orders'} className='account-page-link' >My orders</NavLink>
      </div>
      <div className='account-page-outlet-wrapper'>
        <Outlet />
      </div>
    </div>
  )
}

export default ProfilePage