import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (<div className='page-error'>
    <h2 > Oops, Page Not Found :(</h2>
    <Link to='/' className='btn err-btn'>Back To Movies</Link>
  </div>
  )
}

export default NotFound