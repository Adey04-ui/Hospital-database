import React, {useState, useEffect} from 'react'
import { apiFetch } from '../services/api'
import { Search } from 'react-feather'
import RelativeLoader from '../components/RelativeLoader'
import Loader from '../components/Loader'
import Unauthorized from '../components/Unauthorized'

function Receptionists({user}) {
  const [loading, setLoading] = useState(true)
  const [receptionists, setReceptionists] = useState([])
  const [search, setSearch] = useState("")

  useEffect(()=> {
    const fetchDoctors = async () => {
      try {
        const res = await apiFetch('/receptionists/list.php')
        setReceptionists(res)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  const filteredReceptionists = receptionists.filter(doctor => {
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
          All Receptionists
        </span>
        <div>
          <input
            type="text"
            placeholder="Search by receptionist name or receptionist ID"
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
        <div style={{display: 'flex', placeItems: 'center', background: '#030390', color: '#fff', padding: '7px 14px'}}>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Receptionist id</span>
          <span style={{width: '16%', fontSize: '17px', fontWeight: 500,}}>Receptionist name</span>
        </div>
        <div  style={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto', height: 'calc(100vh - 70px - 80px)',}} className='table-container'>
          {filteredReceptionists.map((receptionist, index) => (
            <div key={index} className={`row ${index % 2 == 0 ? 'odd' : 'even'}`} style={{justifyContent: 'inherit'}}>
              <span style={{width: '16%', fontSize: '16px',}}>
                {receptionist.id}
              </span>
              <span style={{width: '16%', fontSize: '16px',}}>
                {receptionist.full_name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Receptionists