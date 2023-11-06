import React from 'react'
import logo from '../assets/hero-icon.svg'
import ikone from  '../assets/logo.svg'
import MainCountDownTimer from './MainCountDownTimer'
import './maincountdown.css'

import gif from '../assets/clip.gif'

export default function MainCountDown({setTimerEnd}) {
  return (
    <>
    <div className="down-layer">
      <img src={gif} alt="" />
    </div>

    <div className="top-layer">
      <div className="main-countdown">
        <MainCountDownTimer setTimerEnd={setTimerEnd} targetDate={new Date("2023-11-12T04:30:00.000Z")} />
      </div>
      <div className="main-count-logo">
        <img src={ikone} alt="ikone" />
        <img src={logo} alt="logo" />
      </div>
    </div>
    </>
  )
}
