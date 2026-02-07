import React, {useEffect, useState} from 'react'
import AllAppointmentDetails from './AllAppointmentDetails'
import Greeting from './Greeting'
import { apiFetch } from '../services/api'
import AppointmentComponentDoctors from './AppointmentComponentDoctors'
import ThirdTabDoctors from './ThirdTabDoctors'

function DoctorDashboard({user}) {
  const [upcoming, setUpcoming] = useState([])
  const [todayAppointments, setTodayAppointments] = useState([])
  const [appointments, setAppointments] = useState([])

  useEffect(()=> {

    const fetchAppointments = async () => {
      try {
        const res = await apiFetch('/appointments/list.php?day=all')
        setAppointments(res)
      } catch (error) {
        console.error("Error fetching all appointments:", error)
      }
    }

    fetchAppointments()
  }, [])
  useEffect(()=> {

    const fetchTodayAppointments = async () => {
      try {
        const data = await apiFetch('/appointments/list.php')
        console.log(data)
        setTodayAppointments(data)
      } catch (error) {
        console.error("Error fetching today's appointments:", error)
      }
    }

    fetchTodayAppointments()
  }, [])
  useEffect(()=> {
    const fetchUpcomingAppointments = async () => {
      try {
        const res = await apiFetch('/appointments/upcoming.php')
        setUpcoming(res)
      } catch (error) {
        console.error("Error fetching upcoming appointments:", error)
      }
    }

    fetchUpcomingAppointments()
  }, [])


  const cancelelledAppointments = appointments.filter(appointment => appointment.status === 'cancelled')
  const completedAppointments = appointments.filter(appointment => appointment.status === 'completed')
  return (
    <>
      <div className="full-container">
        <Greeting user={user} />
        <AllAppointmentDetails upcoming={upcoming} todayAppointments={todayAppointments} cancelled={cancelelledAppointments} completed={completedAppointments} />
        <AppointmentComponentDoctors upcoming={upcoming} todayAppointments={todayAppointments} appointments={appointments} />
        <ThirdTabDoctors />
      </div>
    </>
  )
}

export default DoctorDashboard