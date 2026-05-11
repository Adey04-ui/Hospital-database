import React, { useEffect, useState } from 'react'
import { apiFetch } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../features/userSlice'
import { useDispatch } from 'react-redux'
import TextField from "@mui/material/TextField"
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'

function Login({ user }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (email.trim() == "" || password.trim() == "") {
      toast.error("Please fill in all fields")
      setLoading(false)
      return
    }

    try {
      const res = await apiFetch('/auth/login.php', {
        method: "POST",
        body: JSON.stringify({ email, password })
      })

      console.log("Login response:", res)

      localStorage.setItem("user", JSON.stringify(res.user))
      dispatch(setUser(res.user))
      
      navigate("/")

    } catch (err) {
      if (err.message == '{"message":"Invalid credentials, wrong password"}') {
        toast.error("Invalid credentials")
      } else {
        toast.error("login error", err.message)
      }
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="full-container" style={{height: 'calc(100vh - 70px)', display: 'flex', justifyContent: 'center', placeItems: 'center'}}>
      <form onSubmit={handleLogin} className="book-appointment" style={{width: '400px', paddingTop: '60px', paddingBottom: '60px'}}>
        <h2>Login</h2>

        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          type="password"
        />

        <button type="submit" className="bookSubmit">
          {loading ? <ThreeDots
            height="20"
            width="40"
            radius="9"
            ariaLabel="three-dots-loading"
            visible={true}
          /> : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
