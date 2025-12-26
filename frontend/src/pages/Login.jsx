import React, { useEffect, useState } from 'react'
import { apiFetch } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../features/userSlice'
import { useDispatch } from 'react-redux'

function Login() {
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

    try {
      const res = await apiFetch('/auth/login.php', {
        method: "POST",
        body: JSON.stringify({ email, password })
      })

      console.log("Logged in user:", res.user)
      localStorage.setItem("user", JSON.stringify(res.user))
      dispatch(setUser(res.user))
      
      navigate("/")

    } catch (err) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Submit"}
      </button>
    </form>
  )
}

export default Login
