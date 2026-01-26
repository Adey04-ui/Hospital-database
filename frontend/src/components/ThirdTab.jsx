import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../services/api'

function ThirdTab() {
  const [records, setRecords] = useState([])
  const [appointments, setAppointments] = useState([])
  useEffect(()=> {
    const fetchRecords = async () => {
      try {
        const res = await apiFetch('/records/list.php')
        setRecords(res)
      } catch (err) {
        console.error(err)
      }
    }
    const fetchAppointments = async () => {
      try {
        const res = await apiFetch('/appointments/list.php?day=today')
        setAppointments(res)
      } catch (err) {
        console.error(err)
      }
    }
    fetchRecords()
    fetchAppointments()
  }, [])
  console.log(appointments)
  const splicedRecords = records.slice(0, 5)
  const splicedappointments = appointments.slice(0, 5)
  const navigate = useNavigate()
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div style={{marginTop: '25px', height: 'auto', background: '#fff', padding: '30px', borderRadius: '6px', boxShadow: '0px 5px 30px #dadadabe', width: '48.5%'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
          <span style={{fontSize: '18px', fontWeight: 500, color: '#666666'}}>
            Recent records
          </span>
          <span style={{color: '#030390', cursor: 'pointer'}} onClick={()=> navigate('/records')}>
            view all
          </span>
        </div>
        <div style={{width: '100%', marginTop: '10px', padding: '12px', background: '#f6f6f6'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', placeItems: 'center', background: '#030390', color: '#fff', padding: '7px 14px'}}>
            <span style={{width: '20%', fontSize: '14px', fontWeight: 500,}}>Patient name</span>
            <span style={{width: '20%', fontSize: '14px', fontWeight: 500,}}>Diagnosis</span>
            <span style={{width: '26%', fontSize: '14px', fontWeight: 500,}}>Doctor name</span>
            <span style={{width: '16%', fontSize: '14px', fontWeight: 500,}}>Action</span>
          </div>
          <div  style={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto', height: 'auto',}} className='table-container'>
            {splicedRecords.map((record, index) => (
              <div key={index} className={`row`} style={{background: '#fff'}}>
                <span style={{width: '23%', fontSize: '16px',}}>
                  {record.patient_name}
                </span>
                <span style={{width: '23%', fontSize: '16px',}}>
                  {record.diagnosis}
                </span>
                <span style={{width: '31%', fontSize: '16px',}}>
                  {record.doctor_name}
                </span>
                <span style={{width: '19%', fontSize: '16px', textWrap: 'wrap', wordWrap: 'break-word', color: '#030390', cursor: 'pointer'}} onClick={()=> navigate(`/records/${record.record_id}`)}>
                  see more
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{marginTop: '25px', height: 'auto', background: '#fff', padding: '30px', borderRadius: '6px', boxShadow: '0px 5px 30px #dadadabe', width: '48.5%'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
          <span style={{fontSize: '18px', fontWeight: 500, color: '#666666'}}>
            Today's appointments
          </span>
          <span style={{color: '#030390', cursor: 'pointer'}} onClick={()=> navigate('/appointment-today')}>
            view all
          </span>
        </div>
        <div style={{width: '100%', marginTop: '10px', padding: '12px', background: '#f6f6f6'}}>
          <div  style={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto', height: 'auto',}} className='table-container'>
            {splicedappointments.length > 0 ? splicedappointments.map((app, index) => (
              <div key={index} className={`row`} style={{background: '#fff', justifyContent: 'inherit', borderRadius: '5px'}}>
                <span style={{width: '28%', fontSize: '16px',}}>
                  {app.patient_name}
                </span>
                <span style={{width: '23%', fontSize: '16px',}}>
                  {app.diagnosis}
                </span>
                <span style={{width: '31%', fontSize: '16px',}}>
                  {app.doctor_name}
                </span>
                <span className={`status ${app.status}`} style={{width: '19%', fontSize: '16px', padding: '3px', fonstSize: '10px'}}>
                  {app.status}
                </span>
              </div>
            )) : (
                <span style={{display: 'flex', justifyContent: 'center', placeItems: 'center'}}>
                  No appointments yet
                </span>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThirdTab