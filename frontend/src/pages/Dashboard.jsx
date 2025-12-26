import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Greeting from '../components/Greeting'

function Dashboard() {
    const {user} = useSelector((state)=> state.user)
  

  return (
    <div className="full-container" style={{padding: '30px 40px'}}>
      <Greeting user={user} />
    </div>
  )
}

export default Dashboard