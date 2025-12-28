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
import Unauthorized from './components/Unauthorized'
import CreatePatient from './pages/CreatePatient'
import Appointments from './pages/Appointments'
import CreateDoctor from './pages/CreateDoctor'

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [user1, setUser1] = useState(null)

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const res = await apiFetch('/auth/me.php')
        setUser1(res.user)
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
      <Topbar user={user1} />
      {loading && <Loader />}
      <Routes>
        <Route path="/login" element={<Login user={user1} />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/new-patient" element={<CreatePatient user={user1} />} />
        <Route path="/appointments" element={<Appointments user={user1} />} />
        <Route path="/doctors" element={<CreateDoctor user={user1} />} />
        <Route path="/loader" element={<Unauthorized />} />
        <Route path="/book-appointment" element={<BookAppointment user={user1} />} />
      </Routes>
    </>
  )
}

export default App
