import React from 'react'
import {useNavigate} from 'react-router-dom'

function AppointmentComponentDoctors({todayAppointments, appointments}) {
  const navigate = useNavigate()

  const splicedAppointemnts = appointments.splice(0, 5)
  const splicedTodayAppointments = todayAppointments.splice(0, 5)
  return (
    <div style={{marginTop: '25px', height: 'auto', background: '#fff', padding: '30px', borderRadius: '6px', boxShadow: '0px 5px 30px #dadadabe'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
        <span style={{fontSize: '18px', fontWeight: 500, color: '#666666'}}>
          Appointments
        </span>
        <span style={{color: '#030390', cursor: 'pointer'}} onClick={()=> navigate('/appointments')}>
          view all
        </span>
      </div>
      <div style={{display: 'flex', height: '100%', gap: '10px', justifyContent: 'space-between',}}>
        <div style={{width: '48%'}}>
          <span style={{fontWeight: '500', color: '#b2b2b2ff'}}>
            Today's Appointments
          </span>
          <div style={{width: '100%', marginTop: '10px', padding: '12px', background: '#f6f6f6'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', placeItems: 'center', background: '#030390', color: '#fff', padding: '7px 14px'}}>
              <span style={{width: '20%', fontSize: '14px', fontWeight: 500,}}>Appointment id</span>
              <span style={{width: '40%', fontSize: '14px', fontWeight: 500,}}>Patient name</span>
              <span style={{width: '20%', fontSize: '14px', fontWeight: 500,}}>Date</span>
            </div>
            <div  style={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto', height: 'auto',}} className='table-container'>
              {splicedTodayAppointments.length > 0 ? splicedTodayAppointments.map((app, index) => (
                <div key={index} className={`row`} style={{background: '#fff'}}>
                  <span style={{width: '23%', fontSize: '16px',}}>
                    {app.id}
                  </span>
                  <span style={{width: '40%', fontSize: '16px',}}>
                    {app.patient_name}
                  </span>
                  <span style={{width: '25%', fontSize: '16px', textWrap: 'wrap', wordWrap: 'break-word'}}>
                    {app.appointment_date}
                  </span>
                </div>
              )) : (
                <span>
                  No appointments today yet
                </span>
              )}
            </div>
          </div>
        </div>
        <div style={{width: '49%'}}>
          <span style={{fontWeight: '500', color: '#b2b2b2ff'}}>
            All Appointments
          </span>
          <div style={{width: '100%', marginTop: '10px', padding: '12px', background: '#f6f6f6'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', placeItems: 'center', background: '#030390', color: '#fff', padding: '7px 14px'}}>
              <span style={{width: '20%', fontSize: '14px', fontWeight: 500,}}>Appointment id</span>
              <span style={{width: '40%', fontSize: '14px', fontWeight: 500,}}>Patient name</span>
              <span style={{width: '20%', fontSize: '14px', fontWeight: 500,}}>Date</span>
            </div>
            <div  style={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto', height: 'auto',}} className='table-container'>
              {splicedAppointemnts.length > 0 ? splicedAppointemnts.map((app, index) => (
                <div key={index} className={`row`} style={{background: '#fff'}}>
                  <span style={{width: '23%', fontSize: '16px',}}>
                    {app.id}
                  </span>
                  <span style={{width: '40%', fontSize: '16px',}}>
                    {app.patient_name}
                  </span>
                  <span style={{width: '25%', fontSize: '16px', textWrap: 'wrap', wordWrap: 'break-word'}}>
                    {app.appointment_date}
                  </span>
                </div>
              )) : (
                <span>
                  No appointments yet
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentComponentDoctors