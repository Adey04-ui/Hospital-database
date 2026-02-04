import React from 'react'
import { childhealth } from '../assets/assets'

function Resource() {
  return (
    <div className='full-width' style={{background: '#fff', padding: '80px 0', color: '#7a7a7a'}}>
      <div className='inner-width' style={{padding: '0 20px', display: 'flex', gap: '15px',}}>
        <div style={{}} className='container-9'>
          <span style={{fontSize: '25px', color: '#6ec1e4', fontWeight: 600,}}>
            Items to bring to the Hospital for Delivery
          </span>
          <div style={{marginTop: '35px', marginLeft: '10px'}}>
            <span style={{fontSize: '15px', fontWeight: 600, color: '#7a7a7a'}}>
              Mother
            </span>
            <ol style={{marginTop: '20px', marginLeft: '25px', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <li>Nighties (2) </li>
              <li>Pants </li>
              <li>Lady's sept (4pks)</li>
              <li>Towel</li>
              <li>Underwear (3)</li>
              <li>Firm Maternity Bras (2) </li>
              <li>Wrappers (1) or Dressing Gown </li>
              <li>Toilet Bag </li>
              <li>Toothpaste & Brush </li>
              <li>Comb & Toilet Slippers </li>
              <li>Bathing Soap </li>
              <li>Purit Liquid Antiseptic</li>
            </ol>
          </div>
          <div style={{marginTop: '35px', marginLeft: '10px'}}>
            <span style={{fontSize: '15px', fontWeight: 600, color: '#7a7a7a'}}>
              Child
            </span>
            <ol style={{marginTop: '20px', marginLeft: '25px', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <li>Shawl (2) </li>
              <li>Big Bath Towel (1) </li>
              <li>Warm Clothing</li>
              <li>Socks</li>
              <li>Vests</li>
              <li>Olive oil </li>
              <li>Baby soap </li>
              <li>Comb </li>
              <li>Vaseline </li>
              <li>Diapers and wipes </li>
              <li>Methylated spirit </li>
              <li>Cotton wool</li>
              <li>Baby sponge</li>
              <li>Spoon and cup</li>
              <li>Hot water flask</li>
              <li>Face towel</li>
            </ol>
          </div>
        </div>
        <div style={{}} className='container-10'>
          <img src={childhealth} alt="" style={{height: '300px', width: '100%', objectFit: 'cover', borderRadius: '20px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)'}} />
        </div>
      </div>
    </div>
  )
}

export default Resource