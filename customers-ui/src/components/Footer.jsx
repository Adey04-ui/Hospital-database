import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()
  return (
    <>
    <footer>
      <div className="footer">
        <div className="footer1" style={{display: 'flex', flexDirection: 'column',  marginRight: '70px'}}>
          <span style={{fontWeight: 700, fontSize: '19px', marginBottom: '40px'}}>
            About Us
          </span>
          <span style={{fontWeight: 700, fontSize: '17px', marginBottom: '20px'}}>
            We are a one-stop family Hospital providing outstanding healthcare services for every member of the family.
          </span>
          <span style={{marginBottom: '20px'}}>
            Lagos, Nigeria
          </span>
          <span>
            info@hospital.com
          </span>
        </div>
        <div className="footer2" style={{}}>
          <span style={{fontWeight: 700, fontSize: '19px',}}>
            Navigation
          </span>
          <ul className='footer-links'>
            <li onClick={() => navigate('/about')}>Why Choose Us</li>
            <li onClick={() => navigate('/faqs')}>FAQs</li>
            <li onClick={() => navigate('/services')}>Our services </li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer3" style={{}}>
          <span style={{fontWeight: 700, fontSize: '19px',}}>
            Follow Us Via 
          </span>
          <div style={{display: 'flex', marginTop: '30px', gap: '30px'}}>
            <FaFacebook size={19} style={{cursor: 'pointer'}} />
            <FaYoutube size={19} style={{cursor: 'pointer'}} />
            <FaLinkedin size={19} style={{cursor: 'pointer'}} />
            <FaInstagram size={19} style={{cursor: 'pointer'}} />
          </div>
        </div>
      </div>
    </footer>
    <div style={{background: '#fff', padding: '30px 0', display: 'flex', justifyContent: 'center'}}>
      <span style={{fontSize: '12px', width: '75%', color: '#907f90'}}>
        Copyright ©2026 · All Rights Reserved.
      </span>
    </div>
    </>
  )
}

export default Footer