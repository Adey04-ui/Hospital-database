import React from 'react'
import {useNavigate} from 'react-router-dom'
import { apiFetch } from '../services/api'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../features/userSlice'

function Topbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function handleLogout() {
    apiFetch("/auth/logout.php")
    dispatch(logoutUser())
    navigate("/login")
  }
  return (
    <nav className='topbar'>
      <div className="logo">
        <img src="/" alt="hospital_logo" />
        <span>hospital name</span>
      </div>
      <div className="navlinks">
        <ul>
          <li onClick={()=> navigate('/book-apoinment')}>book apointment</li>
          <li>services</li>
          <li>about</li>
          <li>doctors</li>
          <li>contact</li>
        </ul>
      </div>
      <div className="logout">
        <button onClick={handleLogout}>log out</button>
      </div>
    </nav>
  )
}

export default Topbar