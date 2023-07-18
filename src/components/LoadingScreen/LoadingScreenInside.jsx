import React from 'react'
import ReactLoading from 'react-loading';

function LoadingScreenInside() {
  return (
    <>
      <ReactLoading type={'spinningBubbles'} color={'#000000'} height={64} width={64} />
    </>
  )
}

export default LoadingScreenInside