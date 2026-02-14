import { useState, useEffect } from "react"
import { apiFetch } from "../services/api"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Unauthorized from "../components/Unauthorized"
import { useParams,useNavigate } from "react-router-dom"

export default function EditReceptionist({ user }) {
  const [receptionist, setReceptionist] = useState({})
  const {id} = useParams()
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    receptionist_user_id: "",
  })

  const navigate = useNavigate()


  useEffect(() => {
    apiFetch(`/receptionists/edit.php?id=${id}`)
      .then((data) => {
        console.log("Raw fetched data from backend:", data);  
        setReceptionist(data);

        const updatedForm = {
          full_name: data?.full_name || "",   
          email: data?.email || "",
          password: "",
          phone: data?.phone || "",
          receptionist_user_id: data?.user_id
        };

        console.log("About to set form to:", updatedForm);
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

    console.log(JSON.stringify(form))

    try {
      const res = await apiFetch(`/receptionists/edit.php?id=${id}`, {
        method: "POST",
        body: JSON.stringify(form),
      })

      setMessage(res.message || "Receptionist updated successfully")
      navigate('/all-receptionists')
      setDialogOpen(true)

      // reset form
      setForm({
        full_name: receptionist?.full_name || "",
        email: receptionist?.email || "",
        password: "",
        phone: receptionist?.phone || "",
      })
      console.log(form)
    } catch (err) {
      console.log(err.message || "Failed to update receptionist")
    }
  }

  if (!["admin"].includes(user.role)) {
    return <Unauthorized />
  }

  return (
    <div className="full-container" style={{maxHeight: 'calc(100vh)'}}>
      <form onSubmit={handleSubmit} className="book-appointment">
        <h2>Edit Receptionist</h2>

        <TextField
          label={form.full_name === "" ? "FullName" : ""}
          value={form.full_name == "" ? receptionist?.full_name : form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          required
          fullWidth
        />

        <TextField
          label={form.email === "" ? "Email" : ""}
          value={form.email == "" ? receptionist?.email : form.email}
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          fullWidth
        />

        <TextField
          label={form.phone === "" ? "Phone number" : ""}
          value={form.phone == "" ? receptionist?.phone : form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          fullWidth
        />

        <TextField
          label="Password"
          value={form.password}
          type="password"
          fullWidth
        />

        <button type="submit" className="bookSubmit">
          Edit Receptionist
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
