import { useEffect, useState } from "react"
import { apiFetch } from "../services/api"

export default function BookAppointment() {
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_date: ""
  })

  useEffect(() => {
    apiFetch("/patients/list.php").then(setPatients)
    apiFetch("/doctors/list.php").then(setDoctors)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await apiFetch("/appointments/create.php", {
        method: "POST",
        body: JSON.stringify(form),
      })
      alert("Appointment booked")
    } catch (err) {
      alert(err.message || "Failed")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Book Appointment</h2>

        <select
          required
          onChange={e => setForm({ ...form, patient_id: e.target.value })}
        >
          <option value="">Select Patient</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.full_name}</option>
          ))}
        </select>

        <select
          required
          onChange={e => setForm({ ...form, doctor_id: e.target.value })}
        >
          <option value="">Select Doctor</option>
          {doctors.map(d => (
            <option key={d.id} value={d.id}>{d.full_name}</option>
          ))}
        </select>

        <input
          type="datetime-local"
          required
          onChange={e =>
            setForm({ ...form, appointment_date: e.target.value })
          }
        />

        <button type="submit">Book</button>
      </form>
    </>
  )
}
