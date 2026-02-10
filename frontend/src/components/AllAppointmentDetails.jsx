import React from 'react'
import {useNavigate} from 'react-router-dom'

function AllAppointmentDetails({counts, loading}) {
  const navigate = useNavigate()
  
  return (
    <div style={{marginTop: '40px', height: '200px', background: '#fff', padding: '20px', borderRadius: '6px', boxShadow: '0px 5px 30px #dadadabe'}}>
      <span>

      </span>
      <div style={{display: 'flex', height: '100%', gap: '10px', justifyContent: 'space-between',}}>
        <div onClick={()=> navigate('/appointment-today')} style={{width: '25%', background: '#f6f6f6', borderRadius: '8px', display: "flex", height: '100%', flexDirection: 'column', justifyContent: 'center', placeItems: 'center', cursor: 'pointer'}}>
          <span style={{fontWeight: 500, fontSize: '1.1em', marginBottom: '10px', color: '#666666'}}>
            Today's Appointments
          </span>
          <span style={{fontWeight: 500, fontSize: '1.4em', color: '#030390'}}>
            {loading ? "..." : counts.today_appointments}
          </span>
        </div>
        <div onClick={()=> navigate('/upcoming')} style={{width: '25%', background: '#f6f6f6', borderRadius: '8px', display: "flex", height: '100%', flexDirection: 'column', justifyContent: 'center', placeItems: 'center', cursor: 'pointer'}}>
          <span style={{fontWeight: 500, fontSize: '1.1em', marginBottom: '10px', color: '#666666'}}>
            Upcoming Appointments
          </span>
          <span style={{fontWeight: 500, fontSize: '1.4em', color: '#030390'}}>
            {loading ? "..." : counts.upcoming_appointments}
          </span>
        </div>
        <div onClick={()=> navigate('/appointments')} style={{width: '25%', background: '#f6f6f6', borderRadius: '8px', display: "flex", height: '100%', flexDirection: 'column', justifyContent: 'center', placeItems: 'center', cursor: 'pointer'}}>
          <span style={{fontWeight: 500, fontSize: '1.1em', marginBottom: '10px', color: '#666666'}}>
            Completed appoitments
          </span>
          <span style={{fontWeight: 500, fontSize: '1.4em', color: '#030390'}}>
            {loading ? "..." : counts.completed_appointments}
          </span>
        </div>
        <div onClick={()=> navigate('/appointments')} style={{width: '25%', background: '#f6f6f6', borderRadius: '8px', display: "flex", height: '100%', flexDirection: 'column', justifyContent: 'center', placeItems: 'center', cursor: 'pointer'}}>
          <span style={{fontWeight: 500, fontSize: '1.1em', marginBottom: '10px', color: '#666666'}}>
            Cancelled Appointments
          </span>
          <span style={{fontWeight: 500, fontSize: '1.4em', color: '#030390'}}>
            {loading ? "..." : counts.cancelled_appointments}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AllAppointmentDetails