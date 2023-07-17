import React from 'react'
import ReactLoading from 'react-loading';


function LoadingScreen() {
  return (
    <div>
      <ReactLoading type={'spinningBubbles'} color={'#000'} height={64} width={64} />
    </div>
  )
}

export default LoadingScreen