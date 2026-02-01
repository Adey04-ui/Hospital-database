import React from 'react'
import { FaHospitalAlt } from 'react-icons/fa'

function DepartmentsComponent() {
  return (
    <div style={{height: '700px', background: '#40BA8E', opacity: '0.85', display: 'flex', justifyContent: 'center'}}>
      <div style={{width: '55%', padding: '70px 0px', display: 'flex', placeItems: 'center', color: '#3d3d3d', flexDirection: 'column', zIndex: '999'}}>
        <div>
          <span style={{fontSize: '1.6em', color: '#3d3d3d', fontWeight: '600'}} className='spandepartment'>
            OUR DEPARTMENTS
          </span>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '35px', gap: '14px', placeItems: 'center'}}>
          <hr style={{width: '200px', borderTop: '1px solid #3d3d3d'}} />
          <FaHospitalAlt size={23} />
          <hr style={{width: '200px', borderTop: '1px solid #3d3d3d'}} />
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default DepartmentsComponent