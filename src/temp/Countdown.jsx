import React from 'react'
import './countdown.css'
import TempCountDown from './tempCountDown'

import logo from '../assets/logo.svg'
import hero from '../assets/hero-icon.svg'

export default function Countdown({setEndDate}) {
  return (
    <div className='main-countdown-timer'>
      <div className="ikone-temp-logo">
        <img src={logo} alt="ikone_logo" />
        <img src={hero} alt="ikpne_hero" />
      </div>
      <div className="ikone-temp-countdown">
        <TempCountDown setEndDate={setEndDate} targetDate={new Date("2023-11-12T04:30:00.000Z")}/>
      </div>
    </div>
  )
}
