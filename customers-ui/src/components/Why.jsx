import React from 'react'

function Why() {
  return (
    <div style={{background: '#fff', display: 'flex', justifyContent: 'center', flexDirection: 'column', placeItems: 'center', gap: '40px'}} className='container-5'>
      <div>
        <span style={{color: '#61ce70', fontSize: '1.2em', fontWeight: 600,}}>
          WHY SHOULD YOU CHOOSE US
        </span>
      </div>
      <div style={{maxWidth: '600px', color: '#7a7a7a', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <span style={{textAlign: ''}}>
          Hospital_name Hospital is a brand that has integrity in all her dealings, we stand for quality and compassionate care. We are strong on ethics and we have a proven track record of successful medical practice.
        </span>
        <span style={{color: '#61ce70', fontSize: '14px', fontWeight: 600,}}>
          Uniqueness of our Services
        </span>
        <ol style={{display: 'flex', flexDirection: 'column', marginLeft: '25px', color: '#7a7a7a', fontSize: '14px', marginBottom: '25px', gap: '7px'}}>
          <li>We are strong on ethics. </li>
          <li>We stand for standard care irrespective of costing. </li>
          <li>We are a family centred hospital. </li>
          <li>We have a proven track record of successful surgeries.</li>
        </ol>
      </div>
    </div>
  )
}

export default Why