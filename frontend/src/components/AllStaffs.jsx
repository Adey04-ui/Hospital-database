import React from 'react'
import { useNavigate } from 'react-router-dom'

function AllStaffs({counts, loading}) {
  const navigate = useNavigate()
  return (
    <div style={{marginTop: '40px', height: '200px', background: '#fff', padding: '20px', borderRadius: '6px', boxShadow: '0px 5px 30px #dadadabe'}}>
      <span>

      </span>
      <div style={{display: 'flex', height: '100%', gap: '10px', justifyContent: 'space-between',}}>
        <div onClick={()=> navigate('/all-doctors')} style={{width: '25%', background: '#f6f6f6', borderRadius: '8px', display: "flex", height: '100%', flexDirection: 'column', justifyContent: 'center', placeItems: 'center', cursor: 'pointer'}}>
          <span style={{fontWeight: 500, fontSize: '1.1em', marginBottom: '10px', color: '#666666'}}>
            Total Doctors
          </span>
          <span style={{fontWeight: 500, fontSize: '1.4em', color: '#030390'}}>
            {loading ? "..." : counts.total_doctors}
          </span>
        </div>
        <div onClick={()=> navigate('/all-receptionists')} style={{width: '25%', background: '#f6f6f6', borderRadius: '8px', display: "flex", height: '100%', flexDirection: 'column', justifyContent: 'center', placeItems: 'center', cursor: 'pointer'}}>
          <span style={{fontWeight: 500, fontSize: '1.1em', marginBottom: '10px', color: '#666666'}}>
            Total receptionists
          </span>
          <span style={{fontWeight: 500, fontSize: '1.4em', color: '#030390'}}>
            {loading ? "..." : counts.total_receptionists}
          </span>
        </div>
        <div onClick={()=> navigate('/all-patients')} style={{width: '25%', background: '#f6f6f6', borderRadius: '8px', display: "flex", height: '100%', flexDirection: 'column', justifyContent: 'center', placeItems: 'center', cursor: 'pointer'}}>
          <span style={{fontWeight: 500, fontSize: '1.1em', marginBottom: '10px', color: '#666666'}}>
            Total Patients
          </span>
          <span style={{fontWeight: 500, fontSize: '1.4em', color: '#030390'}}>
            {loading ? "..." : counts.total_patients}
          </span>
        </div>
        <div onClick={()=> navigate('/appointments')} style={{width: '25%', background: '#f6f6f6', borderRadius: '8px', display: "flex", height: '100%', flexDirection: 'column', justifyContent: 'center', placeItems: 'center', cursor: 'pointer'}}>
          <span style={{fontWeight: 500, fontSize: '1.1em', marginBottom: '10px', color: '#666666'}}>
            Total Appointments
          </span>
          <span style={{fontWeight: 500, fontSize: '1.4em', color: '#030390'}}>
            {loading ? "..." : counts.total_appointments}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AllStaffs