import React, {useEffect, useState} from 'react'
import AllAppointmentDetails from './AllAppointmentDetails'
import Greeting from './Greeting'
import { apiFetch, cachedFetch } from '../services/api'
import AppointmentComponentDoctors from './AppointmentComponentDoctors'
import ThirdTabDoctors from './ThirdTabDoctors'

function DoctorDashboard({user}) {
  const [appointments, setAppointments] = useState([])
  const [appointmentsLoading, setAppointmentsLoading] = useState(false)
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(()=> {

    const fetchAppointments = async () => {
      setAppointmentsLoading(true)
      try {
        const res = await cachedFetch('/appointments/list.php?day=all')
        setAppointments(res)
      } catch (error) {
        console.error("Error fetching all appointments:", error)
      } finally {
        setAppointmentsLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  useEffect(()=> {
    const fetchcounts = async () => {
      setLoading(true)
      try {
        const res = await apiFetch('/appointments/counts.php?for=doctor')
        setCounts(res)
      } catch (error) {
        console.error("Error fetching doctor counts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchcounts()
  }, [])

  return (
    <>
      <div className="full-container">
        <Greeting user={user} />
        <AllAppointmentDetails counts={counts} loading={loading} />
        <AppointmentComponentDoctors appointments={appointments} loading={appointmentsLoading} />
        <ThirdTabDoctors />
      </div>
    </>
  )
}

export default DoctorDashboard