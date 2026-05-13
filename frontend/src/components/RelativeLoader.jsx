import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { ThreeDots } from 'react-loader-spinner'

function RelativeLoader() {
  return (
      <div className='loader3'>
        <ThreeDots
          visible={true}
          height="70"
          width="70"
          color="#030390"
          radius="9"
          ariaLabel="loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
    </div>
  )
}

export default RelativeLoader