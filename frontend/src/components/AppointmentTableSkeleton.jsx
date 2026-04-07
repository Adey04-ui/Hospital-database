import React from 'react'
import Skeleton from './Skeleton'

function AppointmentTableSkeleton() {
  return (
    <div className={`row`} style={{ background: '#fff', padding: '15px 10px' }}>
      <span style={{ width: '23%', fontSize: '13px', }}>
        <Skeleton
          height="14px"
          borderRadius="10px"
          width='18px'
        />
      </span>
      <span style={{ width: '23%', fontSize: '13px', }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
          width='80%'
        />
      </span>
      <span style={{ width: '31%', fontSize: '13px', }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
        />
      </span>
      <span style={{ width: '19%', fontSize: '13px', textWrap: 'wrap', wordWrap: 'break-word' }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
        />
      </span>
    </div>
  )
}

export default AppointmentTableSkeleton