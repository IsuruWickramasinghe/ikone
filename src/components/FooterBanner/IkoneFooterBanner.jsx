import React from 'react'

import './footerBanner.css'

import  Ikone  from '../../assets/logo.svg'
import  Logo  from '../../assets/hero-icon.svg'
 
function IkoneFooterBanner() {
  return (
    <>
      <div className="footer-main-banner">
        <img src={Ikone} alt="ikone" className="footer-banner-ikone" />
        <img src={Logo} alt="logo" className="footer-banner-logo" />
      </div>
      <div className="footer-banner-social">
        {/* tiktok */}
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <i className="ri-tiktok-fill"></i>
        </a>
        {/* insta */}
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <i className="ri-instagram-line"></i>
        </a>
        {/* facebook */}
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <i className="ri-facebook-fill"></i>
        </a>
      </div>
    </>
  )
}

export default IkoneFooterBanner