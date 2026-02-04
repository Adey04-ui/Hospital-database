import React, {useState} from 'react'
import { FaSearch } from 'react-icons/fa'
import { Menu, Search } from 'react-feather'
import { useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const [open, setOpen] = useState(false)
  return (
    <nav>
      <div className='main-navbar'>
        <div className="logo">
          <img src="/logo.jpg" alt="hospital_logo" style={{height: '60px', width: '60px', objectSize: 'fit', objectFit: 'cover', borderRadius: '50%'}} />
          <Menu size={23} className='menu' onClick={()=> setOpen(prev => (!prev))} />
        </div>
        <div className={`nav-links ${open && 'active'}`}>
          <ul>
            <li onClick={()=> {
              path !== '/' && navigate('/')
              setOpen(false)
              }}>home</li>
            <li onClick={()=> {
              path !== '/about' && navigate('/about')
              setOpen(false)
              }}>about</li>
            <li onClick={()=> {
              path !== '/services' && navigate('/services')
              setOpen(false)
              }}>services</li>
            <li onClick={()=> {
              path !== '/faqs' && navigate('/faqs')
              setOpen(false)
            }}>faq</li>
            <li onClick={()=> {
              path !== '/resources' && navigate('/resources')
              setOpen(false)
            }}>resources</li>
            <li onClick={()=> {
              path !== '/contact' && navigate('/contact')
              setOpen(false)
            }}>contact</li>
          </ul>
        </div>
        <div className={`search-bar ${open && 'active'}`}>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar