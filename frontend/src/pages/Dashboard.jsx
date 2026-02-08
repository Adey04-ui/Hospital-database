import React, { useState, useEffect } from 'react'
import AdminDashboard from '../components/AdminDashboard'
import DoctorDashboard from '../components/DoctorDashboard'


function Dashboard({user}) {
 if (user?.role === 'admin' || user?.role == 'receptionist') {
    return <AdminDashboard user={user} />
  } else if (user?.role === 'doctor') {
    return <DoctorDashboard user={user} />
  }
}

export default Dashboard