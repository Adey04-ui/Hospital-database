import React from 'react'

function History() {
  return (
    <div style={{background: '#6ec1e4cf', padding: '110px 0'}}>
      <div style={{display: 'flex', flexDirection: 'column', placeItems: 'center', gap: '30px', marginBottom: '30px'}}>
        <div>
          <span style={{fontSize: '1.6em', color: '#54595f', fontWeight: '600', marginBottom: '30px'}}>
            OUR HISTORY
          </span>
        </div>
        <div style={{display: 'flex',}} className='container-4'>
          <div>
            <span style={{color: '#54595f', fontSize: '29px', fontWeight: 600, }}>
              1996
            </span>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '25px'}}>
            <span style={{fontFamily: '"Poppins", Sans-serif', fontWeight: 400, color: '#54595f', fontSize: '19px'}}>
              Hospital_name Hospital Ltd was incorporated in Nigeria as a private limited liability company
            </span>
            <span style={{color: '#fff', fontSize: '15px'}}>
              Since 1996, we have been a fully integrated healthcare institution that caters to the medical needs of the entire family.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default History