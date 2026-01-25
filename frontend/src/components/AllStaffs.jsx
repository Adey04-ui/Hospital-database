import React, {useState, useEffect} from 'react'
import { apiFetch } from '../services/api'
import { useNavigate } from 'react-router-dom'

function AllStaffs() {
  const [doctors, setDoctors] = useState([])
  const [receptionists, setReceptionists] = useState([])
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(()=> {
    const fetchDoctors = async () => {
      try {
        const res = await apiFetch('/doctors/list.php')
        setDoctors(res)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    const fetchReceptionists = async () => {
      try {
        const res = await apiFetch('/receptionists/list.php')
        setReceptionists(res)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    const fetchPatients = async () => {
      try {
        const res = await apiFetch('/patients/list.php')
        setPatients(res)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    const fetchAppointments = async () => {
      try {
        const res = await apiFetch('/appointments/list.php')
        setAppointments(res)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
    fetchReceptionists()
    fetchPatients()
    fetchAppointments()
  }, [])

  console.log(doctors.length)

  return (
    <div style={{marginTop: '20px', height: '170px'}}>
      <span>

      </span>
      <div style={{display: 'flex', height: '100%', gap: '10px', justifyContent: 'space-between', background: '#fff', padding: '20px', borderRadius: '6px', boxShadow: '0px 5px 30px #dadadabe'}}>
        <div onClick={()=> navigate('/all-doctors')} style={{width: '25%', background: '#f6f6f6', borderRadius: '8px', display: "flex", height: '100%', flexDirection: 'column', justifyContent: 'center', placeItems: 'center', cursor: 'pointer'}}>
          <span style={{fontWeight: 500, fontSize: '1.1em', marginBottom: '10px', color: '#666666'}}>
            Total Doctors
          </span>
          <span style={{fontWeight: 500, fontSize: '1.4em', color: '#030390'}}>
            {doctors.length}
          </span>
        </div>
        <div onClick={()=> navigate('/all-receptionists')} style={{width: '25%', background: '#f6f6f6', borderRadius: '8px', display: "flex", height: '100%', flexDirection: 'column', justifyContent: 'center', placeItems: 'center', cursor: 'pointer'}}>
          <span style={{fontWeight: 500, fontSize: '1.1em', marginBottom: '10px', color: '#666666'}}>
            Total receptionists
          </span>
          <span style={{fontWeight: 500, fontSize: '1.4em', color: '#030390'}}>
            {receptionists.length}
          </span>
        </div>
        <div onClick={()=> navigate('/all-patients')} style={{width: '25%', background: '#f6f6f6', borderRadius: '8px', display: "flex", height: '100%', flexDirection: 'column', justifyContent: 'center', placeItems: 'center', cursor: 'pointer'}}>
          <span style={{fontWeight: 500, fontSize: '1.1em', marginBottom: '10px', color: '#666666'}}>
            Total Patients
          </span>
          <span style={{fontWeight: 500, fontSize: '1.4em', color: '#030390'}}>
            {patients.length}
          </span>
        </div>
        <div onClick={()=> navigate('/appointments')} style={{width: '25%', background: '#f6f6f6', borderRadius: '8px', display: "flex", height: '100%', flexDirection: 'column', justifyContent: 'center', placeItems: 'center', cursor: 'pointer'}}>
          <span style={{fontWeight: 500, fontSize: '1.1em', marginBottom: '10px', color: '#666666'}}>
            Total Appointments
          </span>
          <span style={{fontWeight: 500, fontSize: '1.4em', color: '#030390'}}>
            {appointments.length}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AllStaffs