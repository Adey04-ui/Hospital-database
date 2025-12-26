import React from 'react'

function Greeting({user}) {
  return (
    <div style={{width: '100%', fontSize: '24px', fontWeight: 500}}>
      <span style={{color: '#b2b2b2ff'}}>
        Welcome,
      </span> 
      <span style={{color: '#636363ff'}}>
        {" "}{user.name}
      </span>
    </div>
  )
}

export default Greeting