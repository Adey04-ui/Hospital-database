import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Greeting from '../components/Greeting'
import AllStaffs from '../components/AllStaffs'
import AppointmentComponent from '../components/AppointmentComponent'
import { apiFetch } from '../services/api'
import ThirdTab from '../components/ThirdTab'

function Dashboard() {
    const {user} = useSelector((state)=> state.user)

      const [doctors, setDoctors] = useState([])
      const [receptionists, setReceptionists] = useState([])
      const [patients, setPatients] = useState([])
      const [appointments, setAppointments] = useState([])
      const [loading, setLoading] = useState(true)


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
  

  return (
    <div className="full-container" style={{padding: '30px 40px'}}>
      <Greeting user={user} />
      {user.role == 'admin' && (
        <>
          <AllStaffs doctors={doctors} receptionists={receptionists} appointments={appointments} patients={patients} />
          <AppointmentComponent appointments={appointments} />
          <ThirdTab />
        </>
      )}
    </div>
  )
}

export default Dashboard