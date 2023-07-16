import React, { useEffect, useState } from 'react';

import './profile.css';

import { auth } from '../../config/firebase';

import { signOut } from 'firebase/auth';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useStateContext } from '../../context/StateContext';


function Profile() {

  const navigate = useNavigate();
  
  const { user, userFormData, userAddressForm, handleUserData, handleUserAddress} = useStateContext()

  // sign out
  const signOutUser = async () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Check again');
      });
  };

  // check user
  if (!user) {
    return null; // Render a loading state or redirect to a login page
  }

  return (
    <div className="profile-page">
      

      {/* user details */}
      <div className="profile-details">
        <div className="profile-title">User Details</div>
        {/* user profile */}
        {user ? (
          <div className="user-profile-img">
            <img className="user-pro-pic" src={user.photoURL} alt="profile photo"/>
          </div>
        ) : null}

        <form action="submit" onSubmit={handleUserData} id="userDocForm">
          {/* user name */}
          <div className="profile-data-field">
            <input
              required
              type="text"
              name="userName"
              id="userName"
              placeholder="User Name"
              defaultValue={userFormData?.userName || ''}
            />
          </div>
          {/* email */}
          <div className="profile-data-field">
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              placeholder="Email"
              disabled
              defaultValue={user?.email}
            />
          </div>
          {/* mobile number */}
          <div className="profile-data-field">
            <input
              required
              type="number"
              name="userPhone"
              id="userPhone"
              placeholder="Phone"
              defaultValue={userFormData?.userPhone || ''}
            />
          </div>
          {/* submit btn */}
          <div className="user-details-submit-btn">
            <button className="btn-buy-black">Save Changes</button>
          </div>
        </form>
        <div className="sign-out-btn-wrapper">
          <button onClick={signOutUser} className="sign-out-btn btn-buy-white">
            SIGN OUT
          </button>
        </div>
      </div>


      {/* address */}
      <div className="shipping-address">
        <div className="profile-title">
            User Address
        </div>
        <form action="submit" onSubmit={handleUserAddress} id='userAddressForm'>
          {/* country */}
          <div className="profile-data-field">
            <input required type="text" name='userCountry' id='userCountry' placeholder='Country' defaultValue={userAddressForm?.userCountry || ''}/>
          </div>
          {/* full name */}
          <div className="profile-data-field">
            <input required type="text" name='userFullName' id='userFullName' placeholder='Full Name' defaultValue={userAddressForm?.userFullName || ''}/>
          </div>
          {/* Address */}
          <div className="profile-data-field">
            <input required type="text" name='userAddress' id='userAddress' placeholder='Address' defaultValue={userAddressForm?.userAddress || ''}/>
          </div>
          {/* city */}
          <div className="profile-data-field">
            <input required type="text" name='userCity' id='userCity' placeholder='City' defaultValue={userAddressForm?.userCity || ''}/>
          </div>
          {/* postal code */}
          <div className="profile-data-field">
            <input required type="text" name='userPostalCode' id='userPostalCode' placeholder='Postal Code' defaultValue={userAddressForm?.userPostalCode || ''}/>
          </div>
          {/* phone */}
          <div className="profile-data-field">
            <input required type="number" name='userPhone' id='userPhone' placeholder='Phone' defaultValue={userAddressForm?.userPhone || ''}/>
          </div>
          {/* submit btn */}
          <div className="user-details-submit-btn">
            <button className='btn-buy-black'>save changes</button>
          </div>
        </form>
      </div>

    </div>
  );
}

export default Profile;
