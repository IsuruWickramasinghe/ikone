import React from 'react'
import { auth } from '../../config/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import toast from 'react-hot-toast'
import './passwordReset.css'

export default function PasswordReset() {


  const resetPassword = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    try {
      await sendPasswordResetEmail(auth, email)
      toast("password reset email sent successfully.\n\n check your email address for reset password",{duration: 10000})
    } catch (error) {
      toast.error("User not found")
    }
  }


  return (
    <div className='password-reset-wrapper'>
      <h3>Password Reset</h3>
      <form action="submit" onSubmit={resetPassword}>
        <input type="email" name='email' placeholder='Enter your email' required />
        <button>SEND EMAIL</button>
      </form>
    </div>
  )
}
