import React, { useEffect, useState } from 'react';

import { auth } from '../../config/firebase';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function SignUp() {
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const [loginEmail,setLoginEmail] = useState("");
  const [loginPass,setLoginPass] = useState("");


  const signInWItEmail = async (e) => {
    e.preventDefault()
    try{
      await createUserWithEmailAndPassword(auth, loginEmail, loginPass)
      .then((userCredential) => {
        toast.success("login successful")
        console.log(userCredential)
      })
      .catch((error) => {
        toast.error("error with signed up")
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
          <input type="submit" value="SIGN UP" onClick={signInWItEmail}/>
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
