import React, { useState, useEffect } from 'react'

import './navBar.css'

import { NavLink } from "react-router-dom";
import { useStateContext } from '../../context/StateContext';

import Logo from '../../assets/logo.svg'


function NavBar() {

  const { totalQuantities } = useStateContext()

  const [isNavOpen, setIsNavOpen] = useState(false)
  const toggleNav = () => {
    isNavOpen ? setIsNavOpen(false) : setIsNavOpen(true)
  }

  useEffect(() => {
    if (isNavOpen) {
      // Add the scroll-blocking behavior
      document.body.style.overflow = 'hidden';
    } else {
      // Restore the default scroll behavior
      document.body.style.overflow = 'auto';
    }
  }, [isNavOpen]);
  
 
  return (
    <>
      {/* left section */}
      <div className="nav-bar-left-section">
          {/* nav tiggle button */}
          <div className="nav-toggle" onClick={toggleNav}>
            <i className="ri-menu-2-line"></i>
          </div>
          {/* logo */}
          <div className="logo-wrapper" onClick={()=>{setIsNavOpen(false)}}>
            <NavLink to='/' className='logo-link'>
              <img src={Logo} alt="logo" className='logo'/>
            </NavLink>
          </div>
          {/* links */}
          <div className={isNavOpen ? "nav-links-wrapper left-0" : "nav-links-wrapper"} onClick={()=>{setIsNavOpen(false)}} >
            <NavLink to='/collections/men' className='nav-link'>
              MEN
            </NavLink>
            <NavLink to='/collections/women' className='nav-link'>
              WOMEN
            </NavLink>
            <NavLink to='/collections/unisex' className='nav-link'>
              UNISEX
            </NavLink>
          </div>
        </div>
      {/* left section */}
      <div className="nav-bar-right-section">
        <NavLink to='/cart' className='nav-link-cart'>
          <i className="ri-shopping-cart-line"></i>
          <p>{ totalQuantities }</p>
        </NavLink>
        <NavLink to='/sign-in' className='nav-link-profile'>
          <i className="ri-user-4-line"></i>
        </NavLink>
      </div>
    </>
  )
}

export default NavBar