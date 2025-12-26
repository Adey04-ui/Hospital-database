import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { apiFetch } from './services/api'

import BookAppointment from './pages/BookApointement'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Topbar from './components/Topbar'
import { setUser } from './features/userSlice'
import Loader from './components/Loader'

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const res = await apiFetch('/auth/me.php')
        dispatch(setUser(res.user))
      } catch {
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    handleAuth()
  }, [dispatch, navigate])

  if (loading) return <Loader />

  return (
    <>
      <Topbar />
      {loading && <Loader />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
      </Routes>
    </>
  )
}

export default App
