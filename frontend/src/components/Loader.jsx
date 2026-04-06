import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { ThreeDots } from 'react-loader-spinner'

function Loader() {
  return (
    <div className='loader2'>
      <ThreeDots
        visible={true}
        height="100"
        width="100"
        color="#030390"
        radius="9"
        ariaLabel="loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}

export default Loader