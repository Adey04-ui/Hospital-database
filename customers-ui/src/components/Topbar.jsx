import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'

function Topbar() {
  return (
    <div style={{width: '100%', background: '#dddddd', position: 'relative', height: '35px', display: 'flex', placeItems: 'center', justifyContent: 'center'}}>
      <div style={{width: '75%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
        <span style={{fontSize: '13px', padding: '12px 10px', fontWeight: '400', color: '#575757'}}>
          Healthy Family, our Mission | Contact us on +2348069926679 or +2347054034139
        </span>
        <div className="topbar-socials">
          <div className="socials-track">
            <a href="#" style={{display: 'flex', flexDirection: 'column', height: '70px', width: '30px', gap: '0px', placeItems: 'center', overflow: 'hidden', padding: '0px 18px'}} className='topbar-socials1'>
              <div style={{height: '35px', display: 'flex', placeItems: 'center'}}><FaFacebook color='#3b5998' size={17} style={{marginTop: '5px'}} /></div>
              <div style={{height: '35px', display: 'flex', placeItems: 'center'}}><FaFacebook color='#fff' size={17} /></div>
            </a>
          </div>
          <div className="socials-track">
            <a href="#" style={{display: 'flex', flexDirection: 'column', height: '70px', width: '30px', gap: '0px', placeItems: 'center', overflow: 'hidden', padding: '0px 18px'}} className='topbar-socials2'>
              <div style={{height: '35px', display: 'flex', placeItems: 'center'}}><FaYoutube color='#bb0000' size={17} style={{marginTop: '5px'}} /></div>
              <div style={{height: '35px', display: 'flex', placeItems: 'center'}}><FaYoutube color='#fff' size={17} /></div>
            </a>
          </div>
          <div className="socials-track">
            <a href="#" style={{display: 'flex', flexDirection: 'column', height: '70px', width: '30px', gap: '0px', placeItems: 'center', overflow: 'hidden', padding: '0px 18px'}} className='topbar-socials3'>
              <div style={{height: '35px', display: 'flex', placeItems: 'center'}}><FaLinkedin color='#007bb6' size={17} style={{marginTop: '5px'}} /></div>
              <div style={{height: '35px', display: 'flex', placeItems: 'center'}}><FaLinkedin color='#fff' size={17} /></div>
            </a>
          </div>
          <div className="socials-track">
            <a href="#" style={{display: 'flex', flexDirection: 'column', height: '70px', width: '30px', gap: '0px', placeItems: 'center', overflow: 'hidden', padding: '0px 18px'}} className='topbar-socials4'>
              <div style={{height: '35px', display: 'flex', placeItems: 'center'}}><FaInstagram color='#517fa4' size={17} style={{marginTop: '5px'}} /></div>
              <div style={{height: '35px', display: 'flex', placeItems: 'center'}}><FaInstagram color='#fff' size={17} /></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar