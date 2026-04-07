import React from 'react'
import Skeleton from './Skeleton'

function ThirdTabRecordLoadingSkeleton() {
  return (
    <div className={`row`} style={{ background: '#fff' }}>
      <span style={{ width: '23%', fontSize: '14px', }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
        />
      </span>
      <span style={{ width: '23%', fontSize: '14px', }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
        />
      </span>
      <span style={{ width: '31%', fontSize: '14px', }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
        />
      </span>
      <span style={{ width: '19%', fontSize: '14px', textWrap: 'wrap', wordWrap: 'break-word', color: '#030390', cursor: 'pointer' }}>
        see more
      </span>
    </div>
  )
}

export default ThirdTabRecordLoadingSkeleton