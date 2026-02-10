import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

function RelativeLoader() {
  return (
    <div className="full-container">
      <div className='loader2' style={{height: '100%'}}>
        <ClipLoader color="#030390" size={90} speedMultiplier={1.0} />
      </div>
    </div>
  )
}

export default RelativeLoader