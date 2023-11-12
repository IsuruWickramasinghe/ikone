import React, { useEffect, useState } from 'react';

import './signup.css';

import { auth } from '../../config/firebase';

import { signInWithRedirect, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import googleIcon from '../../assets/google-icon.png';

function SignUp() {
  const googleAuth = new GoogleAuthProvider();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const [loginEmail,setLoginEmail] = useState("");
  const [loginPass,setLoginPass] = useState("");

  const signin = async () => {
    
    try {
      await signInWithRedirect(auth, googleAuth)
      toast.loading("Redirecting!",{duration: 3000})
    } catch (error) {
      console.log(error.message);
      toast.error("error with redirecting!")
    }
  };


  const signInWItEmail = async (e) => {
    e.preventDefault()
    try{
      await createUserWithEmailAndPassword(auth, loginEmail, loginPass)
      .then((userCredential) => {
        toast.loading("Redirecting!",{duration: 3000})
        console.log(userCredential)
      })
      .catch((error) => {
        toast.error("error with Signed in !")
        console.log(error)
      });
    }
    catch(error){
      console.log(error)
    }
  }

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
        <form className="email-pass">
          <input type="email" name="email"  placeholder='email' required onChange={e => setLoginEmail(e.target.value)}/>
          <input type="password" name="password" placeholder='password' required onChange={e => setLoginPass(e.target.value)}/>
          <input type="submit" value="SIGNIN" onClick={signInWItEmail}/>
        </form>
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

export default SignUp;
