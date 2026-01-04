import React, { useState } from "react"
import { apiFetch } from "../services/api"
import TextField from "@mui/material/TextField"
import { ThreeDots } from 'react-loader-spinner'

function RecordsForm({
  patientDetails,
  appId,
  setAppId,
  setdisplayDetails,
  setPatientDetails,
  setSelectedAppointment,
  setAppointments,
  mail
}) {
  const [form, setForm] = useState({
    diagnosis: "",
    symptoms: "",
    treatment: "",
    prescription: "",
    notes: ""
  })
  const [loading, setLoading] = useState(false)

  if (!patientDetails || !appId) return null


  const updateAppointmentStatus = async (appointmentId) => {
    return apiFetch("/appointments/update_status.php", {
      method: "POST",
      body: JSON.stringify({
        appointment_id: appointmentId,
        status: "completed"
      })
    })
  }

  const submitRecord = async () => {
    console.log(form.prescription)
    try {
      if (loading) return

      setLoading(true)

      await apiFetch("/records/create.php", {
        method: "POST",
        body: JSON.stringify({
          appointment_id: appId,
          patient_id: patientDetails.id,
          ...form
        })
      })

      await updateAppointmentStatus(appId)

      const mailRes = await apiFetch("/mail/appointmentStatusChange.php", {
        method: "POST",
        body: JSON.stringify({
          ...mail,
          prescription: form.prescription,
        }),
      })

      console.log(mailRes?.message)

      setAppointments(prev =>
        prev.map(a =>
          a.id === appId ? { ...a, status: 'completed' } : a
        )
      )

      setAppId(null)
      setdisplayDetails(false)
      setPatientDetails(null)
      setSelectedAppointment("")

    } catch (err) {
      console.error("Failed to save record:", err)
      alert("Failed to save medical record")
    } finally {
      setLoading(false)
    }
  }

  const cancel = () => {
    setAppId(null)
    setdisplayDetails(false)
    setPatientDetails(null)
    setSelectedAppointment("")
  }

  return (
    <div style={{ padding: "30px 25px", height: "calc(100vh - 70px - 80px - 70px)" }}>
      <span style={{ fontSize: "18px", fontWeight: 500 }}>
        Records form for {patientDetails.full_name}
      </span>

      <div
        className="recordsForm"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          marginTop: "20px",
          height: "calc(100% - 50px)",
          overflow: "auto",
          paddingTop: '10px'
        }}
      >
        <TextField
          label="Symptoms"
          value={form.symptoms}
          onChange={e => setForm({ ...form, symptoms: e.target.value })}
          required
          multiline
          rows={3}
          fullWidth
        />

        <TextField
          label="Diagnosis"
          value={form.diagnosis}
          onChange={e => setForm({ ...form, diagnosis: e.target.value })}
          required
          fullWidth
        />

        <TextField
          label="Treatment"
          value={form.treatment}
          onChange={e => setForm({ ...form, treatment: e.target.value })}
          required
          fullWidth
        />

        <TextField
          label="Prescription"
          value={form.prescription}
          onChange={e => setForm({ ...form, prescription: e.target.value })}
          multiline
          rows={3}
          fullWidth
        />

        <TextField
          label="Notes"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          multiline
          rows={4}
          fullWidth
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="cancel" onClick={cancel}>
            Close
          </button>
          <button onClick={submitRecord} className="bookSubmit" style={{ width: "49%" }} disabled={loading}>
            {loading ? <ThreeDots
              height="20"
              width="40"
              radius="9"
              ariaLabel="three-dots-loading"
              visible={true}
            /> : 'Save Record'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecordsForm
