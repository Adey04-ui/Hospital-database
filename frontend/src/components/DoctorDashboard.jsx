import React, {useEffect, useState} from 'react'
import AllAppointmentDetails from './AllAppointmentDetails'
import Greeting from './Greeting'
import { apiFetch, cachedFetch } from '../services/api'
import AppointmentComponentDoctors from './AppointmentComponentDoctors'
import ThirdTabDoctors from './ThirdTabDoctors'

function DoctorDashboard({user}) {
  const [upcoming, setUpcoming] = useState([])
  const [appointments, setAppointments] = useState([])
  const [counts, setCounts] = useState({})

  useEffect(()=> {

    const fetchAppointments = async () => {
      try {
        const res = await cachedFetch('/appointments/list.php?day=all')
        setAppointments(res)
      } catch (error) {
        console.error("Error fetching all appointments:", error)
      }
    }

    fetchAppointments()
  }, [])
  
  useEffect(()=> {
    const fetchUpcomingAppointments = async () => {
      try {
        const res = await cachedFetch('/appointments/list.php?day=upcoming')
        setUpcoming(res)
      } catch (error) {
        console.error("Error fetching upcoming appointments:", error)
      }
    }

    fetchUpcomingAppointments()
  }, [])

  useEffect(()=> {
    const fetchcounts = async () => {
      try {
        const res = await apiFetch('/appointments/counts.php?for=doctor')
        setCounts(res)
      } catch (error) {
        console.error("Error fetching doctor counts:", error)
      }
    }

    fetchcounts()
  }, [])


  const cancelelledAppointments = appointments.filter(appointment => appointment.status === 'cancelled')
  const completedAppointments = appointments.filter(appointment => appointment.status === 'completed')
  return (
    <>
      <div className="full-container">
        <Greeting user={user} />
        <AllAppointmentDetails counts={counts} upcoming={upcoming} cancelled={cancelelledAppointments} completed={completedAppointments} />
        <AppointmentComponentDoctors upcoming={upcoming} appointments={appointments} />
        <ThirdTabDoctors />
      </div>
    </>
  )
}

export default DoctorDashboard