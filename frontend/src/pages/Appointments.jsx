import React, { useEffect, useState } from 'react'
import { apiFetch } from '../services/api'
import { Check, Search, X } from 'react-feather'
import Loader from '../components/Loader'

function Appointments({user}) {
  const [appointments, setAppointments] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const statusPriority = {
    scheduled: 1,
    completed: 2,
    cancelled: 3,
  }

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const data = await apiFetch('/appointments/list.php')
      setAppointments(data)
    } catch (err) {
      console.error("Failed to load appointments", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const updateStatus = async (appointmentId, status) => {
    try {
      await apiFetch("/appointments/update_status.php", {
        method: "POST",
        body: JSON.stringify({
          appointment_id: appointmentId,
          status
        })
      })

      setAppointments(prev =>
        prev.map(a =>
          a.id === appointmentId ? { ...a, status } : a
        )
      )
    } catch (err) {
      console.error("Failed to update status", err)
    }
  }

  const filteredAppointments = appointments
  .filter(app => {
    const query = search.toLowerCase()

    return (
      app.patient_name.toLowerCase().includes(query) ||
      app.patient_id.toString().includes(query)
    )
  })
  .sort((a, b) => {
    return statusPriority[a.status] - statusPriority[b.status]
  })

  if(loading) {
    return <Loader />
  }
  
  return (
    <div className="full-container"  style={{maxHeight: 'calc(100vh - 70px)', paddingTop: '0px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', placeItems: 'center', marginBottom: '20px', position: 'fixed', width: 'calc(100% - 80px)', background: '#fff', paddingTop: '30px', marginTop: '5px'}}>
        <div style={{fontSize: '19px', padding: '20px 0', fontWeight: 500}}>
          {user.role == "doctor" && "Today's Appointments"}
          {user.role == "admin" && "All Appointments"}
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by patient name or patient ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <label htmlFor="search" style={{position: 'absolute', marginTop: '-33px', marginLeft: '7px'}}>
            <Search size={22} color='#8c8c8c' />
          </label>
        </div>
      </div>

      <div style={{marginTop: '120px', padding: '0 15px', display: 'flex', gap: '23px', flexDirection: 'column'}}>
        {filteredAppointments.map(app => (
          <div key={app.id} className="queue-card">
            <div>
              <span style={{fontSize: '18px', fontWeight: 500}}>
                {app.patient_name}
              </span>
            </div>
            <div>{app.appointment_date}</div>
            <div>
              <span className={`status ${app.status}`}>
                {app.status}
              </span>
            </div>
            {user.role == "admin" && (
              <div style={{minWidth: '170px', maxWidth: '180px'}}>
                <span style={{fontSize: '18px', fontWeight: 500}}>
                  {app.doctor_name}
                </span>
              </div>
            )}
              {app.status === "scheduled" && (
                <div className="actions">
                  <button onClick={() => updateStatus(app.id, "completed")} style={{padding: '5px', width: '100px', display: 'flex', justifyContent: 'center', fontSize: '14px', color: '#fff', borderRadius: '5px', border: 0, background: '#0b963bfa', placeItems: 'center', gap: '4px', cursor: 'pointer'}}>
                    <Check size={16} /> Complete
                  </button>
                  <button onClick={() => updateStatus(app.id, "cancelled")} style={{padding: '5px', width: '100px', display: 'flex', justifyContent: 'center', fontSize: '14px', color: '#fff', borderRadius: '5px', border: 0, background: '#960b0bfa', placeItems: 'center', gap: '4px', cursor: 'pointer'}}>
                    <X size={16} /> Cancel
                  </button>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Appointments