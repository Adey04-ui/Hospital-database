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
import Records from './pages/Records'
import RecordDetails from './pages/RecordDetails'
import Doctors from './pages/Doctors'
import Patients from './pages/Patients'
import Sidebar from './components/Sidebar'
import CreateReceptionist from './pages/CreateReceptionist'
import Receptionists from './pages/Receptionists'
import Today from './pages/Today'
import Upcoming from './pages/Upcoming'

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
      {/* <Topbar user={user1} /> */}
      <Sidebar user={user1} />
      {loading && <Loader />}
      <Routes>
        <Route path="/login" element={<Login user={user1} />} />
        <Route path="/" element={<Dashboard user={user1} />} />
        <Route path="/new-patient" element={<CreatePatient user={user1} />} />
        <Route path="/new-receptionist" element={<CreateReceptionist user={user1} />} />
        <Route path="/records" element={<Records user={user1} />} />
        <Route path="/records/:id" element={<RecordDetails user={user1} />} />
        <Route path="/all-doctors" element={<Doctors user={user1} />} />
        <Route path="/all-patients" element={<Patients user={user1} />} />
        <Route path="/all-receptionists" element={<Receptionists user={user1} />} />
        <Route path="/appointments" element={<Appointments user={user1} />} />
        <Route path="/appointment-today" element={<Today user={user1} />} />
        <Route path="/doctors" element={<CreateDoctor user={user1} />} />
        <Route path="/loader" element={<Unauthorized />} />
        <Route path="/sidebar" element={<Sidebar user={user1} />} />
        <Route path="/upcoming" element={<Upcoming user={user1} />} />
        <Route path="/book-appointment" element={<BookAppointment user={user1} />} />
      </Routes>
    </>
  )
}

export default App
