import React from 'react'
import ReactLoading from 'react-loading';
import ikone from '../../assets/logo.svg'


function LoadingScreen() {
  return (
    <>
      <ReactLoading type={'spinningBubbles'} color={'#000000'} height={64} width={64} />
    </>
  )
}

export default LoadingScreen