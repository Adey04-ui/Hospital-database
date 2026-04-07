import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { cachedFetch } from '../services/api'
import PatientTableSkeletonLoader from './PatientTableSkeletonLoader'
import ThirdTabAppointmentLoadingSkeleton from './ThirdTabAppointmentLoadingSkeleton'

function ThirdTabDoctors() {
  const [records, setRecords] = useState([])
  const [recordsLoading, setRecordsLoading] = useState(false)
  const [appointmentsLoading, setAppointmentsLoading] = useState(false)
  const [appointments, setAppointments] = useState([])
  useEffect(()=> {
    const fetchRecords = async () => {
      setRecordsLoading(true)
      try {
        const res = await cachedFetch('/records/list.php')
          setRecords(res)
        } catch (err) {
          console.error(err)
        } finally {
          setRecordsLoading(false)
        }
      }
      const fetchAppointments = async () => {
        setAppointmentsLoading(true)
        try {
          const res = await cachedFetch('/appointments/upcoming.php')
          setAppointments(res)
        } catch (err) {
          console.error(err)
        } finally {
          setAppointmentsLoading(false)
        }
      }
      fetchRecords()
      fetchAppointments()
    }, [])
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
            <span style={{width: '26%', fontSize: '14px', fontWeight: 500,}}>Patient name</span>
            <span style={{width: '20%', fontSize: '14px', fontWeight: 500,}}>Diagnosis</span>
            <span style={{width: '21%', fontSize: '14px', fontWeight: 500,}}>Action</span>
          </div>
          <div  style={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto', height: 'auto',}} className='table-container'>
            {recordsLoading && (
              Array.from({ length: 5 }).map((_, i) => (
                <PatientTableSkeletonLoader key={i} />
              ))
            )}
            {splicedRecords.map((record, index) => (
              <div key={index} className={`row`} style={{background: '#fff'}}>
                <span style={{width: '28%', fontSize: '14px',}}>
                  {record.patient_name}
                </span>
                <span style={{width: '23%', fontSize: '14px',}}>
                  {record.diagnosis}
                </span>
                <span style={{width: '25%', fontSize: '14px', textWrap: 'wrap', wordWrap: 'break-word', color: '#030390', cursor: 'pointer'}} onClick={()=> navigate(`/records/${record.record_id}`)}>
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
            Upcoming's appointments
          </span>
          <span style={{color: '#030390', cursor: 'pointer'}} onClick={()=> navigate('/upcoming')}>
            view all
          </span>
        </div>
        <div style={{width: '100%', marginTop: '10px', padding: '12px', background: '#f6f6f6'}}>
          <div  style={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto', height: 'auto',}} className='table-container'>
            {recordsLoading && (
              Array.from({ length: 5 }).map((_, i) => (
                <ThirdTabAppointmentLoadingSkeleton key={i} />
              ))
            )}
            {splicedappointments.length > 0 ? splicedappointments.map((app, index) => (
              <div key={index} className={`row`} style={{background: '#fff', justifyContent: 'ispace-between', borderRadius: '5px'}}>
                <span style={{width: '30%', fontSize: '14px',}}>
                  {app.patient_name}
                </span>
                <span style={{width: '30%', fontSize: '14px',}}>
                  {app.date}
                </span>
                <span className={`status ${app.status}`} style={{width: '30%', fontSize: '14px', padding: '3px', fonstSize: '10px'}}>
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

export default ThirdTabDoctors