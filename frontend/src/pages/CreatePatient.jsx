import { useState } from "react"
import { apiFetch, cachedFetch } from "../services/api"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import Unauthorized from "../components/Unauthorized"
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function CreatePatient({ user }) {
  const [form, setForm] = useState({
    full_name: "",
    gender: "",
    date_of_birth: "",
    phone: "",
    address: "",
    email: "",
  })

  const [mail, setMail] = useState({
    full_name: "",
    email: "",
  })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [message, setMessage] = useState("")

  if (!["admin", "receptionist"].includes(user.role)) {
    return <Unauthorized />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(JSON.stringify(form))

    try {
      const res = await apiFetch("/patients/create.php", {
        method: "POST",
        body: JSON.stringify(form),
      })

      const patientId = res.patient_id

      const mailRes = await apiFetch("/mail/sendMail.php", {
        method: "POST",
        body: JSON.stringify({
          ...mail,
          patient_id: Number(patientId)
        }),
      })


      setMessage(res.message || "Patient registered successfully")
      setDialogOpen(true)

      console.log(mailRes.message)

      // reset form
      setForm({
        full_name: "",
        gender: "",
        date_of_birth: "",
        phone: "",
        address: "",
        email: "",
      })


      setMail({
        full_name: "",
        email: "",
      })
    } catch (err) {
      alert(err.message || "Failed to create patient")
    }
  }

  return (
    <div className="full-container" style={{maxHeight: 'calc(100vh)'}}>
      <form onSubmit={handleSubmit} className="book-appointment" style={{width: '500px'}}>
        <h2>Register New Patient</h2>

        <TextField
          label="Full Name"
          value={form.full_name}
          onChange={(e) => {
            setForm({ ...form, full_name: e.target.value })
            setMail({ ...mail, full_name: e.target.value })
          }}
          required
          fullWidth
        />

        <FormControl fullWidth required>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            value={form.gender}
            label="Gender"
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <MenuItem value=""><em>Select Gender</em></MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        <DatePicker
          label="Date of Birth"
          value={form.date_of_birth ? dayjs(form.date_of_birth) : null}
          onChange={(newValue) => {
            if (!newValue) return
            setForm({ ...form, date_of_birth: newValue.format("YYYY-MM-DD") })
          }}
          maxDate={dayjs()} // can't select future date
          renderInput={(params) => <TextField {...params} required fullWidth />}
        />

        <TextField
          label="Email"
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value })
            setMail({ ...mail, email: e.target.value })
          }}
          fullWidth
        />

        <TextField
          label="Phone number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          fullWidth
        />

        <TextField
          label="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          multiline
          rows={3}
          fullWidth
        />

        <button type="submit" className="bookSubmit">
          Create Patient
        </button>
      </form>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
