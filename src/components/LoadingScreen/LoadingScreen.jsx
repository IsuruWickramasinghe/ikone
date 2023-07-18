import React from 'react'
import ReactLoading from 'react-loading';
import ikone from '../../assets/logo.svg'


function LoadingScreenInside() {
  return (
    <>
      <ReactLoading type={'spinningBubbles'} color={'#fff'} height={32} width={32} />
      <img src={ikone} alt='logo' width={150}/>
    </>
  )
}

export default LoadingScreenInside