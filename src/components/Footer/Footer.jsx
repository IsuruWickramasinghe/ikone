import React from 'react'

import './footer.css'

import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      {/* footer memu */}
      <div className="footer-nav-menu">
        <div className="footer-title">
          MENU
        </div>
        <div className="footer-links">
          <ul>
            <li>
              <Link to='/'>HOME</Link>
            </li>
            <li>
              <Link to='/collections/men'>MEN</Link>
            </li>
            <li>
              <Link to='/collections/women'>WOMEN</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* footer support */}
      <div className="footer-support">
        <div className="footer-title">
          SUPPORT
        </div>
        <div className="footer-links">
          <ul>
            <li>
              <Link to='/shipping-policy'>SHIPPING POLICY</Link>
            </li>
            <li>
              <Link to='/privacy-policy'>PRIVACY POLICY</Link>
            </li>
            <li>
              <Link to='/terms-and-conditions'>TERMS AND CONDITIONS</Link>
            </li>
            <li>
              <a href="https://instagram.com/__ikone__?igshid=OGQ5ZDc2ODk2ZA==" target="_blank" rel="noopener noreferrer">CONTACT US</a>
            </li>
          </ul>
        </div>
      </div>
      {/* FAQ */}
      <div className="foooter-faq">
        FAQ
      </div>
      {/* copyrights */}
    </ >
  )
}

export default Footer