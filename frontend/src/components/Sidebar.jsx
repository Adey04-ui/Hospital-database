import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch, clearMemoryCache } from '../services/api'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../features/userSlice'
import { Activity, Book, ChevronRight, Clipboard, Home, List, LogOut, MessageCircle, UserCheck, UserPlus, Users, Zap } from 'react-feather'
import { useLocation } from 'react-router-dom'

function Sidebar({user}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const [quickLinks, setQuicklinks] = useState(false)

  const path = location.pathname

  function handleLogout() {
      apiFetch("/auth/logout.php")
      clearMemoryCache
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
          <li className={quickLinks ? "active" : ""} onClick={()=> setQuicklinks(prev => (!prev))} style={{display: 'flex', justifyContent: 'space-between'}}><span><Zap size={20} /> Quick Links</span><span className={`chevron ${quickLinks && 'turn'}`} style={{marginBottom: '-7px'}}><ChevronRight size={20} /></span></li>
        </ul>
        <ul className={`quick ${quickLinks && 'active'}`} style={{gap: '0px'}}>
          <li className="active" onClick={()=> path !== "/all-doctors" &&  navigate('/all-doctors')}><UserCheck size={20} /> doctors</li>
          <li className="active" onClick={()=> path !== "/all-receptionists" &&  navigate('/all-receptionists')}><Clipboard size={20} /> receptionists</li>
          <li className="active" onClick={()=> path !== "/all-patients" &&  navigate('/all-patients')}><Users size={20} /> patients</li>
        </ul>
      </div>
      <div className="logout">
        <button onClick={handleLogout}>{user && (<><LogOut size={20} /> <span>log out</span></>)}</button>
      </div>
    </div>
  )
}

export default Sidebar