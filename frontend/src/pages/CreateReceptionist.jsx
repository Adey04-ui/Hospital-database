import React, {useState, useEffect} from 'react'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Unauthorized from "../components/Unauthorized"
import Autocomplete from "@mui/material/Autocomplete"
import { apiFetch } from '../services/api'

function CreateReceptionist({user}) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
  })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(JSON.stringify(form))

    try {
      const res = await apiFetch("/receptionists/create.php", {
        method: "POST",
        body: JSON.stringify(form),
      })

      setMessage(res.message || "Receptionist registered successfully")
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
      console.log(err.message || "Failed to create receptionist")
    }
  }

  if(user.role !== "admin") {
    return <Unauthorized />
  }
  return (
    <div className="full-container" style={{maxHeight: 'calc(100vh)', paddingTop: '90px'}}>
      <form onSubmit={handleSubmit} className="book-appointment">
        <h2>Register Receptionist</h2>

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

        <TextField
          label="Password"
          value={form.password}
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          fullWidth
        />

        <button type="submit" className="bookSubmit">
          Create Receptionist
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

export default CreateReceptionist