import React from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../services/api'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../features/userSlice'
import { Activity, Book, Home, List, LogOut, MessageCircle, UserPlus } from 'react-feather'
import { useLocation } from 'react-router-dom'

function Sidebar({user}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const path = location.pathname

  function handleLogout() {
      apiFetch("/auth/logout.php")
      dispatch(logoutUser())
      navigate("/login")
    }

  return (
    <div className="sidebar">
      <div className="hospitaldetails">
        <img src="/" alt="hospital_logo" />
        <span>hospital name</span>
      </div>
      <div className="navlinks">
        <ul>
          <li className={path === "/" ? "active" : ""} onClick={()=> path !== "/" && navigate('/')}><Home size={20} /> home</li>
          <li className={path === "/book-appointment" ? "active" : ""} onClick={()=> path !== "/book-appointment" && navigate('/book-appointment')}><List size={20} /> book apointment</li>
          <li className={path === "/services" ? "active" : ""}><Activity size={20} /> services</li>
          <li className={path === "/new-patient" ? "active" : ""} onClick={()=> path !== "/new-patient" && navigate('/new-patient')}><UserPlus size={20} /> new patient</li>
          <li className={path === "/doctors" ? "active" : ""} onClick={()=> path !== "/doctors" &&  navigate('/doctors')}><UserPlus size={20} />new doctors</li>
          <li className={path === "/new-receptionist" ? "active" : ""} onClick={()=> path !== "/new-receptionist" &&  navigate('/new-receptionist')}><UserPlus size={20} />new receptionist</li>
        </ul>
      </div>
      <div className="logout">
        <button onClick={handleLogout}><LogOut size={20} /> {user && 'log out'}</button>
      </div>
    </div>
  )
}

export default Sidebar