import React from 'react'
import './countdown.css'
import TempCountDown from './tempCountDown'

import logo from '../assets/logo.svg'

export default function Countdown({setEndDate}) {
  return (
    <div className='main-countdown-timer'>
      <div className="ikone-temp-logo">
        <img src={logo} alt="ikone_logo" />
      </div>
      <div className="ikone-temp-countdown">
        <TempCountDown setEndDate={setEndDate} targetDate={new Date('2023-11-04 13:32')}/>
      </div>
    </div>
  )
}
