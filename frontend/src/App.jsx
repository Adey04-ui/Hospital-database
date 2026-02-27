import { Routes, Route} from 'react-router-dom'
import { useState } from 'react'

import BookAppointment from './pages/BookApointement'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Topbar from './components/Topbar'
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
import RelativeLoader from './components/RelativeLoader'
import EditDoctor from './pages/EditDoctor'
import EditReceptionist from './pages/EditReceptionist'
import EditPatient from './pages/EditPatients'
import Reviews from './pages/Reviews'
import { ToastContainer } from 'react-toastify'

function App() {
  const [loading, setLoading] = useState(true)
  const [user1, setUser1] = useState(null)


  if (loading) return <Loader />

  return (
    <>
      {/* <Topbar user={user1} /> */}
      
      <Sidebar user={user1} />
      <Routes>
        <Route path="/login" element={<Login user={user1} />} />
        <Route path="/" element={<Dashboard user={user1} setUser={setUser1} setLoading={setLoading} />} />
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
        <Route path="/reviews" element={<Reviews user={user1} />} />
        <Route path="/edit-doctor/:id" element={<EditDoctor user={user1} />} />
        <Route path="/edit-receptionist/:id" element={<EditReceptionist user={user1} />} />
        <Route path="/edit-patient/:id" element={<EditPatient user={user1} />} />
        <Route path="/book-appointment" element={<BookAppointment user={user1} />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored" 
      />
    </>
  )
}

export default App
