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

export default function CreateDoctor({ user }) {
  const [departments, setDepartments] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
  })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    apiFetch("/departments/list.php")
      .then(setDepartments)
      .catch(console.error)
  }, [])

  if (!["admin"].includes(user.role)) {
    return <Unauthorized />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(JSON.stringify(form))

    try {
      const res = await apiFetch("/doctors/create.php", {
        method: "POST",
        body: JSON.stringify(form),
      })

      setMessage(res.message || "Patient registered successfully")
      setDialogOpen(true)

      // reset form
      setForm({
        full_name: "",
        email: "",
        password: "",
        phone: "",
      })
      console.log(form)
    } catch (err) {
      console.log(err.message || "Failed to create patient")
    }
  }

  return (
    <div className="full-container" style={{maxHeight: 'calc(100vh - 70px)'}}>
      <form onSubmit={handleSubmit} className="book-appointment">
        <h2>Register Doctor</h2>

        <TextField
          label="Full Name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          required
          fullWidth
        />

        <TextField
          label="Email"
          value={form.email}
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          fullWidth
        />

        <TextField
          label="Phone number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          fullWidth
        />

        <Autocomplete
          options={departments}
          getOptionLabel={(option) => option.name} // display department name
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={departments.find(dep => dep.id === selectedDepartment) || null}
          onChange={(e, value) => {
            if (!value) {
              setSelectedDepartment("")
              setForm({ ...form, department_id: null, specialization: "" })
              return
            }

            setSelectedDepartment(value.id)

            setForm(prev => ({
              ...prev,
              department_id: Number(value.id), // ensure INT
              specialization: value.name
            }))
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

        <TextField
          label="Password"
          value={form.password}
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          fullWidth
        />

        <button type="submit" className="bookSubmit">
          Create Doctor
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
