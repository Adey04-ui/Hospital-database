import React, { useEffect, useState } from 'react'
import { apiFetch } from '../services/api'
import { Check, Search, X } from 'react-feather'
import Loader from '../components/Loader'
import RecordsForm from '../components/RecordsForm'
import { useNavigate } from 'react-router-dom'

function Appointments({user}) {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState("")
  const [displayDetails, setdisplayDetails] = useState(false)
  const [patientDetails, setPatientDetails] = useState(null)
  const [records, setRecords] = useState([])
  const [recordsLoading, setRecordsLoading] = useState(false)
  const [appId, setAppId] = useState(null)
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

  const updateStatus = async (appointmentId, status, patient_name, doctor_name, appointment_date, patient_email) => {
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

      const mailRes = await apiFetch("/mail/appointmentStatusChange.php", {
        method: "POST",
        body: JSON.stringify({
          full_name: patient_name,
          email: patient_email,
          appointment_id: Number(appointmentId),
          doctor_name,
          date: appointment_date,
          status
        }),
      })

      console.log(mailRes?.message)

    } catch (err) {
      console.error("Failed to update status", err)
    }
  }

  useEffect(() => {
    if (!selectedAppointment) return

    const appointment = appointments.find(a => a.id === selectedAppointment)
    if (!appointment) return

    const fetchPatient = async () => {
      try {
        const data = await apiFetch(
          `/patients/single.php?patient_id=${appointment.patient_id}`
        )
        setPatientDetails(data)
      } catch (err) {
        console.error("Failed to get patient details", err)
      }
    }

    fetchPatient()
  }, [selectedAppointment, appointments])

  useEffect(() => {
    if (!selectedAppointment) return
    const appointment = appointments.find(a => a.id === selectedAppointment)
    if (!appointment) return

    const fetchRecords = async () => {
      setRecordsLoading(true)
      try {
        const data = await apiFetch(
          `/records/by-patient.php?patient_id=${appointment.patient_id}`
        )
        setRecords(data)
      } catch (err) {
        console.error("Failed to load records", err)
      } finally {
        setRecordsLoading(false)
      }
    }

    fetchRecords()
  }, [selectedAppointment])



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



  const visibleAppointments = selectedAppointment
  ? filteredAppointments.filter(a => a.id === selectedAppointment)
  : filteredAppointments



  if(loading) {
    return <Loader />
  }
  
  return (
    <div className="full-container"  style={{maxHeight: 'calc(100vh - 70px)', paddingTop: '0px',}}>
      
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
      <div style={{ display: 'flex'}}>
        <div style={{ width: selectedAppointment && '50%'}} className={`container2 ${!selectedAppointment && "full"}`}>
          <div style={{}} className={`appointment-container ${selectedAppointment && "active"}`}>
            {visibleAppointments.length === 0 && (
              <div style={{display: 'flex', justifyContent: 'center'}}>
                No appointments yet
              </div>
            )}
            {visibleAppointments.map(app => (
              <div key={app.id} className="queue-card" onClick={()=> {
                if(user.role == "doctor" && app.status == "scheduled") {
                  setSelectedAppointment(app.id)
                  setAppId(app.id)
                  setdisplayDetails(true)
                }
              }}>
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
                    <div className={`actions ${selectedAppointment && "remove"}`} style={{display: selectedAppointment && selectedAppointment !== app.patient_id && "none"}}>
                      <button onClick={(e) => {
                        e.stopPropagation()
                        updateStatus(app.id, "completed", app.patient_name, app.doctor_name, app.appointment_date, app.patient_email)
                      }} style={{padding: '5px', width: '100px', display: "flex", justifyContent: 'center', fontSize: '14px', color: '#fff', borderRadius: '5px', border: 0, background: '#0b963bfa', placeItems: 'center', gap: '4px', cursor: 'pointer',}}>
                        <Check size={16} /> Complete
                      </button>
                      <button onClick={(e) => {
                        e.stopPropagation()
                        updateStatus(app.id, "cancelled", app.patient_name, app.doctor_name, app.appointment_date, app.patient_email)
                      }
                      } style={{padding: '5px', width: '100px', display: 'flex', justifyContent: 'center', fontSize: '14px', color: '#fff', borderRadius: '5px', border: 0, background: '#960b0bfa', placeItems: 'center', gap: '4px', cursor: 'pointer'}}>
                        <X size={16} /> Cancel
                      </button>
                    </div>
                  )}
              </div>
            ))}
          </div>
          <div style={{ width: '100%', marginTop: '30px', flex: 1,}}>
            <div style={{padding: '0 15px',}}>
              <div className={`patientDetails ${displayDetails && "active"}`}>
                {displayDetails && patientDetails && (
                  <div style={{padding: '20px 25px',}}>
                    <span style={{fontSize: '15px', fontWeight: 500, textTransform: 'capitalize'}}>patient details</span>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '5px', marginBottom: '15px'}}>
                      <span>
                        Patient Id: {patientDetails.id}
                      </span>
                      <span>
                        Patient Name: {patientDetails.full_name}
                      </span>
                      <span>
                        Date of Birth: {patientDetails.date_of_birth}
                      </span>
                      <span>
                        Gender: {patientDetails.gender}
                      </span>
                    </div>
                    <div className="patientRecords">
                      <span style={{fontSize: '15px', fontWeight: 500, textTransform: 'capitalize'}}>
                        previuous records
                      </span>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '7px'}}>
                        {recordsLoading && (
                          <div style={{display: 'flex', justifyContent: 'center'}}>
                            Loading records ...
                          </div>
                        )}
                        {records.length === 0 && !recordsLoading && (
                          <span>No previous records with you yet</span>
                        )}
                        {records.map((record, index) => (
                          <div key={index} style={{marginTop: '7px', display: 'flex', justifyContent: 'space-between', placeItems: 'center', alignI: 'center'}}>
                            <span>
                              <b>Diagnosis:</b> {" "} {record.diagnosis}
                            </span>
                            <span style={{fontSize: '13px'}}>
                              {record.created_at}
                            </span>
                            <span style={{cursor: 'pointer', textDecoration: 'underline', fontSize: '14px', color: '#030390'}} onClick={()=> navigate(`/records/${record.id}`)}>
                              See more details
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
        <div className={`recordsform ${selectedAppointment && 'active'}`}>
          <div style={{ boxShadow: '0px 0px 6px #4d4d4d4a',width: '100%', borderRadius: '14px'}}>
            {selectedAppointment && patientDetails && (
              <RecordsForm patientDetails={patientDetails} appId={appId} setSelectedAppointment={setSelectedAppointment} setPatientDetails={setPatientDetails} setdisplayDetails={setdisplayDetails} setAppId={setAppId} setAppointments={setAppointments} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointments