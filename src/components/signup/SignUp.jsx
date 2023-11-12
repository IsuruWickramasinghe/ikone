import React, { useEffect, useState } from 'react';

import { auth } from '../../config/firebase';
import { Link, Navigate } from 'react-router-dom';
import { useStateContext } from '../../context/StateContext';



function SignUp() {

  const {loginHandler} = useStateContext()

  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setShouldNavigate(true);
      }
    });
    return () => unsubscribe();
  }, []);

  if (shouldNavigate) {
    return <Navigate to="/account/profile" />;
  }

  return (
    <div className="sign-in">
      <h1>SIGN UP</h1>
      <div className="sign-in-btn-wrapper">
        <form className="email-pass" onSubmit={loginHandler} id="loginDocForm">
          <input type="text" name="userName" placeholder='name' required />
          <input type="email" name="userEmail"  placeholder='email' required />
          <input
            type="password"
            name="userPassword"
            placeholder="Password"
            required
            onInput={(e) => {
              if (e.target.value.length < 6) {
                e.target.setCustomValidity('Password must be at least 6 characters');
              } else {
                e.target.setCustomValidity('');
              }
            }}
          />
          <input type="number" name="userPhone" placeholder='phone' required />
          <button className="btn-buy-black">SIGN UP</button>
        </form>
      </div>
      <div className="hr-tag"></div>
      <div className="policies">
        <Link to="/privacy-policy" className="login-policy-link">
          PRIVACY POLICY
        </Link>
        <Link to="/terms-and-conditions" className="login-policy-link">
          TERMS AND CONDITIONS
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
