import React, { useEffect, useState } from 'react';

import './signIn.css';

import { auth } from '../../config/firebase';

import { signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import googleIcon from '../../assets/google-icon.png';

function SignIn() {
  const googleAuth = new GoogleAuthProvider();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const signin = async () => {
    
    try {
      await signInWithRedirect(auth, googleAuth)
      toast.loading("Redirecting!",{duration: 3000})
    } catch (error) {
      console.log(error.message);
      toast.error("error with redirecting!")
    }
  };

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
      <h1>SIGN IN</h1>
      <div className="sign-in-btn-wrapper">
        <button className="login-btn" onClick={signin}>
          <img src={googleIcon} alt="google-icon" className="login-icon" />
          <div className="login-text">Continue with Google</div>
        </button>
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

export default SignIn;
