import React from 'react'
import { about2, one } from '../assets/assets'
import { FaClock } from 'react-icons/fa'

function AboutWelcome() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', padding: '70px 0', background: '#fff'}}>
      <div style={{display: 'flex'}} className='container-2'>
        <div style={{marginRight: '130px'}} className='container-3'>
          <div style={{height: '370px', width: '350px', background: '#ecfbf6'}}></div>
          <img src={about2} alt="Hallway" style={{height: '400px', width: '350px', objectFit: 'cover', position: 'absolute', marginTop: '30px', marginLeft: '60px'}} />
        </div>
        <div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{color: '#39507b', fontSize: '1em', fontWeight: 600, marginBottom: '25px'}}>
              Welcome to 
            </span>
            <span style={{color: '#61ce70', fontSize: '1.8em', fontWeight: 600, marginBottom: '40px'}}>
              HOSPITAL NAME
            </span>
            <span style={{color: '#7a7a7a', fontSize: '15px', marginBottom: '25px'}}>
              We are a one-stop family Hospital providing outstanding healthcare services for every member of the family.
            </span>
            <span style={{color: '#39507b', fontSize: '1em', fontWeight: 600, marginBottom: '25px'}}>
              What We Are About
            </span>
            <span style={{color: '#7a7a7a', fontSize: '15px', marginBottom: '25px'}}>
              We will consistently offer timely, comprehensive and outstanding healthcare services that would define experiences filled with love, care and happiness for all our clients.
            </span>
            <span style={{color: '#7a7a7a', fontSize: '1em', fontWeight: 600, marginBottom: '25px', }}>
              <i>Core Values</i>
            </span>
            <ul style={{display: 'flex', flexDirection: 'column', marginLeft: '35px', color: '#7a7a7a', fontSize: '14px', marginBottom: '25px', gap: '7px'}}>
              <li>Excellence </li>
              <li>Promptness </li>
              <li>Integrity </li>
              <li>Commitment </li>
              <li>Compassion </li>
            </ul>
          </div>
          <div style={{padding: '20px', background: '#e9f2f8', borderRadius: '7px', width: '330px', color: '#7a7a7a'}}>
            <span style={{display: 'flex', fontSize: '15px', gap: '5px', marginBottom: '20px', fontWeight: '600'}}>
              <FaClock />
              Opening Hours
            </span>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px'}}>
              <span style={{borderBottom: '.5px solid #7a7a7a2f', padding: '8px 0'}}>
                Monday - Friday - 24 Hours
              </span>
              <span style={{borderBottom: '.5px solid #7a7a7a2f', padding: '8px 0'}}>
                Saturday - 24 Hours
              </span>
              <span style={{padding: '8px 0'}}>
                Sunday - 24 Hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutWelcome