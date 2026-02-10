import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Greeting from '../components/Greeting'
import AllStaffs from '../components/AllStaffs'
import AppointmentComponent from '../components/AppointmentComponent'
import { apiFetch, cachedFetch } from '../services/api'
import ThirdTab from '../components/ThirdTab'
import AllAppointmentDetails from '../components/AllAppointmentDetails'

function AdminDashboard({user}) {

      const [doctors, setDoctors] = useState([])
      const [receptionists, setReceptionists] = useState([])
      const [patients, setPatients] = useState([])
      const [appointments, setAppointments] = useState([])
      const [loading, setLoading] = useState(true)
      const [counts, setCounts] = useState({})


      useEffect(()=> {
        const fetchDoctors = async () => {
          try {
            const res = await cachedFetch('/doctors/list.php')
            setDoctors(res)
          } catch (error) {
            console.error(error)
          } finally {
            setLoading(false)
          }
        }
        const fetchReceptionists = async () => {
          try {
            const res = await cachedFetch('/receptionists/list.php')
            setReceptionists(res)
          } catch (error) {
            console.error(error)
          } finally {
            setLoading(false)
          }
        }
        const fetchPatients = async () => {
          try {
            const res = await cachedFetch('/patients/list.php')
            setPatients(res)
          } catch (error) {
            console.error(error)
          } finally {
            setLoading(false)
          }
        }
        const fetchAppointments = async () => {
          try {
            const res = await cachedFetch('/appointments/list.php')
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

      useEffect(()=> {
        const fetchcounts = async () => {
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
    <div className="full-container" style={{padding: '30px 40px'}}>
      <Greeting user={user} />
          <AllStaffs counts={counts} loading={loading} doctors={doctors} receptionists={receptionists} appointments={appointments} patients={patients} />
          <AppointmentComponent appointments={appointments} />
          <ThirdTab />
    </div>
  )
}

export default AdminDashboard