import { useEffect, useState } from "react"
import { apiFetch, cachedFetch } from "../services/api"
import Unauthorized from "../components/Unauthorized"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import { ThreeDots } from 'react-loader-spinner'

export default function BookAppointment({ user }) {
  const [departments, setDepartments] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmation, setConfirmation] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_date: ""
  })

  const [mail, setMail] = useState({
    full_name: "",
    email: "",
    doctor_name: "",
    date: form.appointment_date,
  })

  useEffect(()=> {
    setMail({
      ...mail,
      full_name: selectedPatient?.full_name,
      email: selectedPatient?.email,
    })
  }, [selectedPatient])

  useEffect(()=> {
    setMail({
      ...mail,
      doctor_name: selectedDoctor?.full_name,
    })
  }, [selectedDoctor])

  useEffect(() => {
  setMail(prev => ({
    ...prev,
    date: form.appointment_date,
  }))
}, [form.appointment_date])

  useEffect(() => {
    cachedFetch("/departments/list.php")
      .then(setDepartments)
      .catch(console.error)
  }, [])

  useEffect(() => {
    cachedFetch("/patients/list.php")
      .then(setPatients)
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (!selectedDepartment) return

    cachedFetch(`/doctors/by-department.php?department_id=${selectedDepartment}`)
      .then(setDoctors)
      .catch(console.error)
  }, [selectedDepartment])


  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      console.log(form)
      const res = await apiFetch("/appointments/create.php", {
        method: "POST",
        body: JSON.stringify(form)
      })
      const appointment_id = res.appointment_id

      const mailRes = await apiFetch("/mail/appointmentMail.php", {
        method: "POST",
        body: JSON.stringify({
          ...mail,
          appointment_id: Number(appointment_id)
        }),
      })

      setConfirmation(res.appointment)
      setDialogOpen(true)

      console.log(mailRes?.message)

      // reset form
      setForm({
        patient_id: "",
        doctor_id: "",
        appointment_date: ""
      })
      setSelectedDepartment("")
      setSelectedPatient(null)
      setSelectedDoctor(null)
      setDoctors([])

    } catch (err) {
      console.log(err.message || "Failed to book appointment")
    } finally {
      setSubmitting(false)
      setForm({
        patient_id: "",
        doctor_id: "",
        appointment_date: ""
      })
    }
  }

  if (user.role !== "admin" && user.role !== "receptionist") {
    return <Unauthorized />
  }


  return (
    <div className="full-container" style={{maxHeight: 'calc(100vh)'}}>
      <form onSubmit={handleSubmit} className="book-appointment">
        <h2>Book Appointment</h2>

        {/* Department */}
        <Autocomplete
          options={departments}
          getOptionLabel={(option) => option.name} // display department name
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={departments.find(dep => dep.id === selectedDepartment) || null}
          onChange={(event, value) => {
            setSelectedDepartment(value ? value.id : "")
            setForm({ ...form, doctor_id: "" }) // reset doctor selection
            setDoctors([]) // optional: clear doctors until new department loads
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Specialty"
              placeholder="Search by department"
              required
              fullWidth
            />
          )}
        />

        {/* Patient */}
        <Autocomplete
          options={patients}
          getOptionLabel={(option) =>
            `${option.full_name}`
          }
          isOptionEqualToValue={(option, value) =>
            option.id === value.id
          }
          onChange={(event, value) => {
            setForm({
              ...form,
              patient_id: value ? value.id : "",
            })
            setSelectedPatient(value)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Patient"
              placeholder="Search by name or ID"
              required
              fullWidth
            />
          )}
        />
        {selectedPatient && (
          <div className="info-box">
            <strong>Patient Info</strong>
            <p>Name: {selectedPatient.full_name}</p>
            <p>ID: {selectedPatient.id}</p>
            <p>Gender: {selectedPatient.gender}</p>
          </div>
        )}
        {/* Doctor */}
        {doctors.length > 0 && (
          <Autocomplete
            options={doctors}
            getOptionLabel={(option) =>
              `${option.full_name}`
            }
            isOptionEqualToValue={(option, value) =>
              option.doctor_id === value.doctor_id
            }
            onChange={(event, value) => {
              setForm({
                ...form,
                doctor_id: value ? value.doctor_id : "",
              })
              setSelectedDoctor(value)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Doctor"
                placeholder="Search doctor by name or ID"
                required
                fullWidth
              />
            )}
          />

        )}
          {selectedDoctor && (
            <div className="info-box">
              <strong>Doctor Availability</strong>
              <p>
                Available between {selectedDoctor.shift_start} – {selectedDoctor.shift_end}
              </p>
            </div>
          )}

        {/* Date */}
        <DatePicker
          label="Appointment Date"
          value={
            form.appointment_date
              ? dayjs(form.appointment_date)
              : null
          }
          onChange={(newValue) => {
            if (!newValue) return
            setForm({
              ...form,
              appointment_date: newValue.format("YYYY-MM-DD"),
            })
          }}
          minDate={dayjs()}
          renderInput={(params) => (
            <TextField {...params} required fullWidth />
          )}
        />

        <button type="submit" className="bookSubmit" disabled={submitting}>{submitting ? <ThreeDots
          height="20"
          width="40"
          radius="9"
          ariaLabel="three-dots-loading"
          visible={true}
        /> : 'Book Appointment'}</button>
      </form>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>Appointment Confirmed</DialogTitle>
      <DialogContent>
        <p>Date: {confirmation?.date}</p>
        <p>Time Window: {confirmation?.window}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>OK</Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}
