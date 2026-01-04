import React, { useEffect, useState } from 'react'
import { apiFetch } from '../services/api'
import { Search } from 'react-feather'
import RelativeLoader from '../components/RelativeLoader'
import Loader from '../components/Loader'
import Unauthorized from '../components/Unauthorized'

function Records({user}) {
  const [loading, setLoading] = useState(true)
  const [records, setRecords] = useState([])
  const [search, setSearch] = useState("")

  useEffect(()=> {
    const fetchRecords = async () => {
      try {
        const res = await apiFetch('/records/list.php')
        setRecords(res)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecords()
  }, [])

  const filteredRecords = records.filter(record => {
    const query = search.toLowerCase()

    return (
      record.patient_name.toLowerCase().includes(query) ||
      record.patient_id.toString().includes(query)
    )
  })

  if (loading) return <Loader />
  if(user.role !== "admin") return <Unauthorized message={"Only admin can enter this page"} />
  return (
    <div className="full-container">
      <div style={{display: 'flex', justifyContent: 'space-between', placeItems: 'center', margin: '12px 0'}}>
        <span style={{fontSize: '19px', fontWeight: 500,}}>
          All Records
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
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Record id</span>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Patient's name</span>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Doctor's name</span>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>diagnosis</span>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Date</span>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Status</span>
        </div>
        <div  style={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto', height: 'calc(100vh - 70px - 80px - 100px)',}} className='table-container'>
          {filteredRecords.map((record, index) => (
            <div key={index} className={`row ${index % 2 == 0 ? 'odd' : 'even'}`}>
              <span style={{width: '16%', fontSize: '16px',}}>
                {record.record_id}
              </span>
              <span style={{width: '16%', fontSize: '16px',}}>
                {record.patient_name}
              </span>
              <span style={{width: '16%', fontSize: '16px',}}>
                {record.doctor_name}
              </span>
              <span style={{width: '16%', fontSize: '16px',}}>
                {record.diagnosis}
              </span>
              <span style={{width: '16%', fontSize: '16px',}}>
                {record.created_at}
              </span>
              <span style={{width: '16%', fontSize: '16px',}}>
                {record.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Records