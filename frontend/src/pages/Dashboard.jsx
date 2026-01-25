import React from 'react'
import { useSelector } from 'react-redux'
import Greeting from '../components/Greeting'
import AllStaffs from '../components/AllStaffs'

function Dashboard() {
    const {user} = useSelector((state)=> state.user)
  

  return (
    <div className="full-container" style={{padding: '30px 40px'}}>
      <Greeting user={user} />
      {user.role == 'admin' && (
        <AllStaffs />
      )}
    </div>
  )
}

export default Dashboard