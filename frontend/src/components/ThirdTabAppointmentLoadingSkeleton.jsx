import React from 'react'
import Skeleton from './Skeleton'

function ThirdTabAppointmentLoadingSkeleton() {
  return (
    <div className={`row`} style={{ background: '#fff', justifyContent: 'inherit', borderRadius: '5px', padding: '25px 10px' }}>
      <span style={{ width: '33%', fontSize: '14px', }}>
        <Skeleton
          height="15px"
          width='80%'
          borderRadius="10px"
        />
      </span>
      <span style={{ width: '33%', fontSize: '14px', }}>
        <Skeleton
          height="15px"
          width='80%'
          borderRadius="10px"
        />
      </span>
      <span className={`status`} style={{ width: '33%', fontSize: '14px', padding: '3px', fonstSize: '10px' }}>
        <Skeleton
          height="15px"
          width='80%'
          borderRadius="10px"
        />
      </span>
    </div>
  )
}

export default ThirdTabAppointmentLoadingSkeleton