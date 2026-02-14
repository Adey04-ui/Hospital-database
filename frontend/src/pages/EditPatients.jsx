import { useState, useEffect } from "react"
import { apiFetch } from "../services/api"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Unauthorized from "../components/Unauthorized"
import Autocomplete from "@mui/material/Autocomplete"
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useParams } from "react-router-dom"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

export default function EditPatient({ user }) {
  const [patient, setPatient] = useState({})
  const {id} = useParams()
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    gender: "",
    date_of_birth: "",
    phone: "",
    address: "",
    patient_user_id: "",
  })


  useEffect(() => {
    apiFetch(`/patients/edit.php?id=${id}`)
      .then((data) => {
        setPatient(data);

        const updatedForm = {
          full_name: data?.full_name || "",   
          email: data?.email || "",
          phone: data?.phone || "",
          gender: data.gender || "",
          date_of_birth: data.date_of_birth || "",
          address: data.address || "",
        };

        setForm(updatedForm);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
      });
  }, [id]);

  const [dialogOpen, setDialogOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()


    try {
      const res = await apiFetch(`/patients/edit.php?id=${id}`, {
        method: "POST",
        body: JSON.stringify(form),
      })

      setMessage(res.message || "Patient updated successfully")
      setDialogOpen(true)

      // reset form
      setForm({
        full_name: patient?.full_name || "",
        email: patient?.email || "",
        password: "",
        phone: patient?.phone || "",
        shift_start: patient?.shift_start || "",
        shift_end: patient?.shift_end || ""
      })
    } catch (err) {
      console.log(err.message || "Failed to update patient")
    }
  }

  if (!["admin"].includes(user.role)) {
    return <Unauthorized />
  }

  return (
    <div className="full-container" style={{maxHeight: 'calc(100vh)'}}>
      <form onSubmit={handleSubmit} className="book-appointment">
        <h2>Edit Patient</h2>

        <TextField
          label={form.full_name === "" ? "Full Name" : ""}
          value={form.full_name == "" ? patient?.full_name : form.full_name}
          onChange={(e) => {
            setForm({ ...form, full_name: e.target.value })
          }}
          required
          fullWidth
        />

        <FormControl fullWidth required>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            value={form.gender == "" ? patient?.gender : form.gender}
            label={form.gender === "" ? "Gender" : ""}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <MenuItem value=""><em>Select Gender</em></MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        <DatePicker
          label={form.date_of_birth === "" ? "Date of birth" : ""}
          value={form.date_of_birth == "" ? dayjs(patient?.date_of_birth) : dayjs(form.date_of_birth)}
          onChange={(newValue) => {
            if (!newValue) return
            setForm({ ...form, date_of_birth: newValue.format("YYYY-MM-DD") })
          }}
          maxDate={dayjs()}
          renderInput={(params) => <TextField {...params} required fullWidth />}
        />

        <TextField
          label={form.email === "" ? "Email" : ""}
          value={form.email == "" ? patient?.email : form.email}
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          fullWidth
        />

        <TextField
          label={form.phone === "" ? "Phone Number" : ""}
          value={form.phone == "" ? patient?.phone : form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          fullWidth
        />

        <TextField
          label={form.address === "" ? "Address" : ""}
          value={form.address == "" ? patient?.address : form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          multiline
          rows={3}
          fullWidth
        />

        <button type="submit" className="bookSubmit">
          Edit Patient
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
