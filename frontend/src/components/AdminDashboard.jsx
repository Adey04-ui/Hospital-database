import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Greeting from '../components/Greeting'
import AllStaffs from '../components/AllStaffs'
import AppointmentComponent from '../components/AppointmentComponent'
import { apiFetch, cachedFetch } from '../services/api'
import ThirdTab from '../components/ThirdTab'
import AllAppointmentDetails from '../components/AllAppointmentDetails'

function AdminDashboard({ user }) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [counts, setCounts] = useState({})
  const [appointmentsLoading, setAppointmentsLoading] = useState(false)


  useEffect(() => {
    const fetchAppointments = async () => {
      setAppointmentsLoading(true)
      try {
        const res = await cachedFetch('/appointments/list.php')
        setAppointments(res)
      } catch (error) {
        console.error(error)
      } finally {
        setAppointmentsLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  useEffect(() => {
    const fetchcounts = async () => {
      setLoading(true)
      try {
        const res = await apiFetch('/appointments/counts.php?for=admin')
        setCounts(res)
      } catch (error) {
        console.error("Error fetching admin counts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchcounts()
  }, [])


  return (
    <div className="full-container" style={{ padding: '30px 40px' }}>
      <Greeting user={user} />
      <AllStaffs counts={counts} loading={loading} />
      <AppointmentComponent appointments={appointments} loading={appointmentsLoading} />
      <ThirdTab />
    </div>
  )
}

export default AdminDashboard