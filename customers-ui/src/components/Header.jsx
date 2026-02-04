import React from 'react'
import { ChevronRight } from 'react-feather'
import { useLocation, Link } from 'react-router-dom'
import { bedWard2, one, stageRoom2 } from '../assets/assets'

function Header() {
  const location = useLocation()
  const path = location.pathname
  if (path == '/about') {
    return (
      <div style={{display: 'flex', justifyContent: 'center',}} className='header1'>
        <div style={{width: '75%', display: 'flex', justifyContent: 'space-between', placeItems: 'center'}} className='container-11'>
          <div>
            <span style={{fontSize: '2.1em', fontWeight: '600', color: '#fff', textAlign: 'center', display: 'flex', marginBottom: '10px'}}>
              ABOUT US
            </span>
          </div>
          <div>
            <span style={{display: 'flex', placeItems: 'center', gap: '5px', fontSize: '13px', color: '#fff'}}>
              <Link to="" style={{textDecoration: 'none'}} className='header-link'>
                Hospital Name
              </Link>
              <ChevronRight size={14} /> About
            </span>
          </div>
        </div>
      </div>
    )
  }
  if (path == '/services') {
    return (
      <div style={{display: 'flex', justifyContent: 'center', background: `linear-gradient(rgba(0, 0, 0, 0.31), rgba(0, 0, 0, 0.31)), url(${bedWard2}) no-repeat center center`, backgroundSize: 'cover'}} className='header1'>
        <div style={{width: '75%', display: 'flex', justifyContent: 'space-between', placeItems: 'center'}} className='container-11'>
          <div>
            <span style={{fontSize: '2.1em', fontWeight: '600', color: '#fff', textAlign: 'center', display: 'flex', marginBottom: '10px'}}>
              SERVICES
            </span>
          </div>
          <div>
            <span style={{display: 'flex', placeItems: 'center', gap: '5px', fontSize: '13px', color: '#fff'}}>
              <Link to="" style={{textDecoration: 'none'}} className='header-link'>
                Hospital Name
              </Link>
              <ChevronRight size={14} /> Services
            </span>
          </div>
        </div>
      </div>
    )
  }
  if (path == '/faqs') {
    return (
      <div style={{display: 'flex', justifyContent: 'center', background: `linear-gradient(#ff252878, #ff252978), url(${one}) no-repeat center center`, backgroundSize: 'cover'}} className='header1'>
        <div style={{width: '75%', display: 'flex', justifyContent: 'space-between', placeItems: 'center'}} className='container-11'>
          <div>
            <span style={{fontSize: '2.1em', fontWeight: '600', color: '#fff', textAlign: 'center', display: 'flex', marginBottom: '10px'}}>
              Frequently Asked Questions
            </span>
          </div>
          <div>
            <span style={{display: 'flex', placeItems: 'center', gap: '5px', fontSize: '13px', color: '#fff'}}>
              <Link to="" style={{textDecoration: 'none'}} className='header-link'>
                Hospital Name
              </Link>
              <ChevronRight size={14} /> FAQs
            </span>
          </div>
        </div>
      </div>
    )
  }
  if (path == '/resources') {
    return (
      <div style={{display: 'flex', justifyContent: 'center', background: `linear-gradient(#61ce70bc, #61ce70bc), url(${stageRoom2}) no-repeat center center`, backgroundSize: 'cover'}} className='header1'>
        <div style={{width: '75%', display: 'flex', justifyContent: 'space-between', placeItems: 'center'}} className='container-11'>
          <div>
            <span style={{fontSize: '2.1em', fontWeight: '600', color: '#fff', textAlign: 'center', display: 'flex', marginBottom: '10px'}}>
              Hospital Bag List
            </span>
          </div>
          <div>
            <span style={{display: 'flex', placeItems: 'center', gap: '5px', fontSize: '13px', color: '#fff'}}>
              <Link to="" style={{textDecoration: 'none'}} className='header-link'>
                Hospital Name
              </Link>
              <ChevronRight size={14} /> Resources
            </span>
          </div>
        </div>
      </div>
    )
  }
  if (path == '/contact') {
    return (
      <div style={{display: 'flex', justifyContent: 'center', background: `linear-gradient(#ff252878, #ff252978), url(${stageRoom2}) no-repeat center center`, backgroundSize: 'cover'}} className='header1'>
        <div style={{width: '75%', display: 'flex', justifyContent: 'space-between', placeItems: 'center'}} className='container-11'>
          <div>
            <span style={{fontSize: '2.1em', fontWeight: '600', color: '#fff', textAlign: 'center', display: 'flex', marginBottom: '10px'}}>
              Contact-Us
            </span>
          </div>
          <div>
            <span style={{display: 'flex', placeItems: 'center', gap: '5px', fontSize: '13px', color: '#fff'}}>
              <Link to="" style={{textDecoration: 'none'}} className='header-link'>
                Hospital Name
              </Link>
              <ChevronRight size={14} /> Contact us
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header