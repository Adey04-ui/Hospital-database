import React from 'react'
import { FaFacebook } from 'react-icons/fa'

function Topbar() {
  return (
    <div style={{width: '100%', background: '#dddddd', position: 'relative', height: '35px', display: 'flex', placeItems: 'center'}}>
      <div style={{padding: '0px 12%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
        <span style={{fontSize: '13px', padding: '12px 10px', fontWeight: '400', color: '#6e6e6e'}}>
          Healthy Family, our Mission | Contact us on +2348069926679 or +2347054034139
        </span>
        <div className="topbar-socials">
      <div className="socials-track">
        <a href="#">FB</a>
        <a href="#">TW</a>
        <a href="#">IG</a>
        <a href="#">LN</a>
      </div>
    </div>
      </div>
    </div>
  )
}

export default Topbar