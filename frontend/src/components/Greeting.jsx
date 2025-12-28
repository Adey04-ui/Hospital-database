import React from 'react'
import { useNavigate } from 'react-router-dom'

function Greeting({user}) {
  const navigate = useNavigate()
  return (
    <div style={{width: '100%', fontSize: '24px', fontWeight: 500, display: 'flex', justifyContent: 'space-between'}}>
      <div>
        <span style={{color: '#b2b2b2ff'}}>
          Welcome,
        </span> 
        <span style={{color: '#636363ff'}}>
          {" "}{user.name}
        </span>
      </div>
      <div>
        {user.role == "doctor" && (
          <button className="viewAppointment" onClick={()=> navigate("/appointments")}>
            View Today's appointments
          </button>
        )}
        {user.role == "admin" && (
          <button className="viewAppointment" onClick={()=> navigate("/appointments")}>
            View all appointments
          </button>
        )}
      </div>
    </div>
  )
}

export default Greeting