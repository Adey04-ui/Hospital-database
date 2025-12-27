import React from 'react'
import {AlertTriangle} from 'react-feather'

function Unauthorized() {
  return (
    <div className="full-container">
      <div className="unauthorized">
        <AlertTriangle size={50} style={{marginBottom: '20px'}} color='#d8820aff' />
        <span>
          403: Forbidden
        </span>
      </div>
    </div>
  )
}

export default Unauthorized