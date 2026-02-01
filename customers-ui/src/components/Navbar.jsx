import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Search } from 'react-feather'

function Navbar() {
  return (
    <nav>
      <div className='main-navbar'>
        <div className="logo">
          <img src="/" alt="hospital_logo" />
        </div>
        <div className="nav-links">
          <ul>
            <li>home</li>
            <li>about</li>
            <li>services</li>
            <li>faq</li>
            <li>resources</li>
            <li>contact</li>
          </ul>
        </div>
        <div className="search-bar">
          <Search size={21} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar