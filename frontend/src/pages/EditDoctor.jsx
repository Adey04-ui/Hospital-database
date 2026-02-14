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

export default function EditDoctor({ user }) {
  const [doctor, setDoctor] = useState({})
  const {id} = useParams()
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    shift_start: "",
    shift_end: "",
    doctor_user_id: "",
  })


  useEffect(() => {
    apiFetch(`/doctors/edit.php?id=${id}`)
      .then((data) => {
        setDoctor(data);

        const updatedForm = {
          full_name: data?.doctor?.full_name || "",   
          email: data?.doctor?.email || "",
          password: "",
          phone: data?.doctor?.phone || "",
          shift_start: data?.doctor?.shift_start || "",
          shift_end: data?.doctor?.shift_end || "",
          doctor_user_id: data?.doctor?.user_id
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
      const res = await apiFetch(`/doctors/edit.php?id=${id}`, {
        method: "POST",
        body: JSON.stringify(form),
      })

      setMessage(res.message || "Doctor updated successfully")
      setDialogOpen(true)

      // reset form
      setForm({
        full_name: doctor?.doctor?.full_name || "",
        email: doctor?.doctor?.email || "",
        password: "",
        phone: doctor?.doctor?.phone || "",
        shift_start: doctor?.doctor?.shift_start || "",
        shift_end: doctor?.doctor?.shift_end || ""
      })
    } catch (err) {
      console.log(err.message || "Failed to update doctor")
    }
  }

  if (!["admin"].includes(user.role)) {
    return <Unauthorized />
  }

  return (
    <div className="full-container" style={{maxHeight: 'calc(100vh)'}}>
      <form onSubmit={handleSubmit} className="book-appointment">
        <h2>Edit Doctor</h2>

        <TextField
          label={form.full_name === "" ? "FullName" : ""}
          value={form.full_name == "" ? doctor?.doctor?.full_name : form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          required
          fullWidth
        />

        <TextField
          label={form.email === "" ? "Email" : ""}
          value={form.email == "" ? doctor?.doctor?.email : form.email}
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          fullWidth
        />

        <TextField
          label={form.phone === "" ? "Phone number" : ""}
          value={form.phone == "" ? doctor?.doctor?.phone : form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          fullWidth
        />

        <TextField
          value={doctor?.doctor?.department}
          type="text"
          required
          fullWidth
          disabled
        />

        <TextField
          label="Password"
          value={form.password}
          type="password"
          fullWidth
        />

        <TimePicker
          label={form.shift_start === "" ? "Shift starts" : ""}
          ampm={false}
          value={form.shift_start == "" ? dayjs(doctor?.doctor?.shift_start, "HH:mm") : dayjs(form.shift_start, "HH:mm")}
          onChange={(newValue) =>
            setForm({
              ...form,
              shift_start: newValue ? newValue.format("HH:mm") : doctor?.doctor?.shift_start
            })
          }
          slotProps={{
            textField: {
              fullWidth: true,
              required: true
            }
          }}
        />

        <TimePicker
          label={form.shift_end === "" ? "Shift ends" : ""}
          ampm={false}
          value={form.shift_end == "" ? dayjs(doctor?.doctor?.shift_end, "HH:mm") : dayjs(form.shift_end, "HH:mm")}
          onChange={(newValue) =>
            setForm({
              ...form,
              shift_end: newValue ? newValue.format("HH:mm") : ""
            })
          }
          slotProps={{
            textField: {
              fullWidth: true,
              required: true
            }
          }}
        />

        <button type="submit" className="bookSubmit">
          Edit Doctor
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
