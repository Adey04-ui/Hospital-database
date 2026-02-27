import React, { useState, useEffect } from 'react'
import AdminDashboard from '../components/AdminDashboard'
import DoctorDashboard from '../components/DoctorDashboard'
import { apiFetch } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/userSlice'


function Dashboard({user, setUser1, setLoading}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

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


 if (user?.role === 'admin' || user?.role == 'receptionist') {
    return <AdminDashboard user={user} />
  } else if (user?.role === 'doctor') {
    return <DoctorDashboard user={user} />
  }
}

export default Dashboard