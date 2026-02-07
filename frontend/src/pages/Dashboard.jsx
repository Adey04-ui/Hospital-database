import React, { useState, useEffect } from 'react'
import AdminDashboard from '../components/AdminDashboard'
import DoctorDashboard from '../components/DoctorDashboard'


function Dashboard({user}) {
 if (user.role === 'admin') {
    return <AdminDashboard user={user} />
  }
  if (user.role === 'doctor') {
    return <DoctorDashboard user={user} />
  }
}

export default Dashboard