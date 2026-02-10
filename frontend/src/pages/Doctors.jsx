import React, { useEffect, useState } from 'react'
import { cachedFetch } from '../services/api'
import { Search } from 'react-feather'
import RelativeLoader from '../components/RelativeLoader'
import Loader from '../components/Loader'
import Unauthorized from '../components/Unauthorized'

function Doctors({user}) {
  const [loading, setLoading] = useState(true)
  const [doctors, setDoctors] = useState([])
  const [search, setSearch] = useState("")

  useEffect(()=> {
    const fetchDoctors = async () => {
      try {
        const res = await cachedFetch('/doctors/list.php')
        setDoctors(res)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  const filteredDoctors = doctors.filter(doctor => {
    const query = search.toLowerCase()

    return (
      doctor.full_name.toLowerCase().includes(query) ||
      doctor.id.toString().includes(query)
    )
  })

  if (loading) return <Loader />
  if(user.role !== "admin") return <Unauthorized message={"Only admin can enter this page"} />
  return (
    <div className="full-container">
      <div style={{display: 'flex', justifyContent: 'space-between', placeItems: 'center', margin: '12px 0'}}>
        <span style={{fontSize: '19px', fontWeight: 500,}}>
          All Doctors
        </span>
        <div>
          <input
            type="text"
            placeholder="Search by doctor name or doctor ID"
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
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Doctor id</span>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Doctor name</span>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Department</span>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Specialization</span>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Shift starts</span>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Shift ends</span>
        </div>
        <div  style={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto', height: 'calc(100vh - 70px - 80px)',}} className='table-container'>
          {filteredDoctors.map((doctor, index) => (
            <div key={index} className={`row ${index % 2 == 0 ? 'odd' : 'even'}`}>
              <span style={{width: '16%', fontSize: '16px',}}>
                {doctor.id}
              </span>
              <span style={{width: '16%', fontSize: '16px',}}>
                {doctor.full_name}
              </span>
              <span style={{width: '16%', fontSize: '16px',}}>
                {doctor.department}
              </span>
              <span style={{width: '16%', fontSize: '16px',}}>
                {doctor.specialization}
              </span>
              <span style={{width: '16%', fontSize: '16px',}}>
                {doctor.shift_start}
              </span>
              <span style={{width: '16%', fontSize: '16px',}}>
                {doctor.shift_end}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors