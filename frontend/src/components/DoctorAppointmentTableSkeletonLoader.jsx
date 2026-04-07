import React from 'react'
import Skeleton from './Skeleton'

function DoctorAppointmentTableSkeletonLoader() {
  return (
    <div className={`row`} style={{ background: '#fff', padding: '15px 10px' }}>
      <span style={{ width: '23%', fontSize: '16px', }}>
        <Skeleton
          height="15px"
          borderRadius="10px"
          width='20px'
        />
      </span>
      <span style={{ width: '40%', fontSize: '16px', }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
          width='80%'
        />
      </span>
      <span style={{ width: '25%', fontSize: '16px', textWrap: 'wrap', wordWrap: 'break-word' }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
          width='80%'
        />
      </span>
    </div>
  )
}

export default DoctorAppointmentTableSkeletonLoader