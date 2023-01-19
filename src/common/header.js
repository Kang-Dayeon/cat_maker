import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className="header">
      <Link to='/'><h1>Cat Maker</h1></Link>
    </div>
  )
}

export default Header