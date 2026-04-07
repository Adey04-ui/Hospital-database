import React from 'react'
import Skeleton from './Skeleton'

function DoctorSkeleton(key) {
  return (
    <div className={`row ${key % 2 == 0 ? 'odd' : 'even'}`}>
      <span style={{ width: '16%', fontSize: '14px', }}>
        <Skeleton
          height="13px"
          borderRadius="10px"
          width='15px'
        />
      </span>
      <span style={{ width: '17%', fontSize: '14px', }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
          width='80%'
        />
      </span>
      <span style={{ width: '16%', fontSize: '14px', }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
          width='80%'
        />
      </span>
      <span style={{ width: '18%', fontSize: '14px', }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
          width='80%'
        />
      </span>
      <span style={{ width: '16%', fontSize: '14px', }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
          width='80%'
        />
      </span>
      <span style={{ width: '16%', fontSize: '14px', }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
          width='80%'
        />
      </span>
      <span style={{ width: '10%', fontSize: '14px', cursor: 'pointer', color: '#030390' }}>
        Edit
      </span>
    </div>
  )
}

function ReceptionistSkeleton(key) {
  return (
    <div className={`row ${key % 2 == 0 ? 'odd' : 'even'}`} style={{ justifyContent: 'inherit' }}>
      <span style={{ width: '16%', fontSize: '16px', }}>
        <Skeleton
          height="13px"
          borderRadius="10px"
          width='15px'
        />
      </span>
      <span style={{ width: '25%', fontSize: '16px', }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
          width='80%'
        />
      </span>
      <span style={{ width: '25%', fontSize: '16px', cursor: 'pointer', color: '#030390' }} onClick={() => navigate(`/edit-receptionist/${receptionist.id}`)}>
        Edit
      </span>
    </div>
  )
}

function PatientSkeleton(key) {
  return (
    <div className={`row ${key % 2 == 0 ? 'odd' : 'even'}`}>
      <span style={{ width: '10%', fontSize: '14px', }}>
        <Skeleton
          height="13px"
          borderRadius="10px"
          width='15px'
        />
      </span>
      <span style={{ width: '16%', fontSize: '14px', }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
          width='80%'
        />
      </span>
      <span style={{ width: '11%', fontSize: '14px', }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
          width='80%'
        />
      </span>
      <span style={{ width: '21%', fontSize: '14px', textWrap: 'wrap', wordWrap: 'break-word' }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
          width='80%'
        />
      </span>
      <span style={{ width: '16%', fontSize: '14px', }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
          width='80%'
        />
      </span>
      <span style={{ width: '16%', fontSize: '14px', }}>
        <Skeleton
          height="10px"
          borderRadius="10px"
          width='80%'
        />
      </span>
      <span style={{ width: '5%', fontSize: '14px', cursor: 'pointer', color: '#030390' }} onClick={() => navigate(`/edit-patient/${patient.id}`)}>
        Edit
      </span>
    </div>
  )
}

export { DoctorSkeleton, ReceptionistSkeleton, PatientSkeleton }