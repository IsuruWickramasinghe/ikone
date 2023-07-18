import React from 'react'
import { Link } from 'react-router-dom'

function Page404() {
  return (
    <div className='page-404'>
      <h3> 404 | this page could not be found.</h3>
      <br />
        <Link to='/' style={{color:'blue',textDecoration:'underline'}}>go back</Link>
    </div>
  )
}

export default Page404