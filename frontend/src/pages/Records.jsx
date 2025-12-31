import React from 'react'
import Unauthorized from '../components/Unauthorized'

function Records({user}) {
  if (user.role !== 'admin') {
    return <Unauthorized />
  }
  return (
    <div className="full-container">
      <div>Records</div>
    </div>
  )
}

export default Records