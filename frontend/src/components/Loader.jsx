import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

function Loader() {
  return (
    <div className="full-container">
      <div className='loader2'>
        <ClipLoader color="#030390" size={90} speedMultiplier={1.0} />
      </div>
    </div>
  )
}

export default Loader