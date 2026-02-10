import React, { useEffect, useState } from 'react'
import { cachedFetch } from '../services/api'
import { Search } from 'react-feather'
import RelativeLoader from '../components/RelativeLoader'
import Loader from '../components/Loader'
import Unauthorized from '../components/Unauthorized'

function Patients({user}) {
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState([])
  const [search, setSearch] = useState("")

  useEffect(()=> {
    const fetchDoctors = async () => {
      try {
        const res = await cachedFetch('/patients/list.php')
        setPatients(res)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  const filteredPatients = patients.filter(patient => {
    const query = search.toLowerCase()

    return (
      patient.full_name.toLowerCase().includes(query) ||
      patient.id.toString().includes(query)
    )
  })
  if (loading) return <Loader />
  if (user.role !== "admin" && user.role !== "receptionist") return <Unauthorized />
  return (
    <div className="full-container">
      <div style={{display: 'flex', justifyContent: 'space-between', placeItems: 'center', margin: '12px 0'}}>
        <span style={{fontSize: '19px', fontWeight: 500,}}>
          All Patients
        </span>
        <div>
          <input
            type="text"
            placeholder="Search by patient name or patient ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <label htmlFor="search" style={{position: 'absolute', marginTop: '-33px', marginLeft: '7px'}}>
            <Search size={22} color='#8c8c8c' />
          </label>
        </div>
      </div>
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', placeItems: 'center', background: '#030390', color: '#fff', padding: '7px 14px'}}>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Patient id</span>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Patient name</span>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Gender</span>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Email</span>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Phone Number</span>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Date of Birth</span>
        </div>
        <div  style={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto', height: 'calc(100vh - 70px - 80px)',}} className='table-container'>
          {filteredPatients.map((patient, index) => (
            <div key={index} className={`row ${index % 2 == 0 ? 'odd' : 'even'}`}>
              <span style={{width: '16%', fontSize: '16px',}}>
                {patient.id}
              </span>
              <span style={{width: '16%', fontSize: '16px',}}>
                {patient.full_name}
              </span>
              <span style={{width: '16%', fontSize: '16px',}}>
                {patient.gender}
              </span>
              <span style={{width: '16%', fontSize: '16px', textWrap: 'wrap', wordWrap: 'break-word'}}>
                {patient.email}
              </span>
              <span style={{width: '16%', fontSize: '16px',}}>
                {patient.phone}
              </span>
              <span style={{width: '16%', fontSize: '16px',}}>
                {patient.date_of_birth}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Patients