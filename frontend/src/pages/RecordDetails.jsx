import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { apiFetch } from '../services/api'
import RelativeLoader from '../components/RelativeLoader'
import Unauthorized from '../components/Unauthorized'
import { ArrowLeft } from 'react-feather'

function RecordDetails({user}) {
  const { id } = useParams()
  const [record, setRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await apiFetch(`/records/single.php?id=${id}`)
        setRecord(data)
      } catch (err) {
        console.error("Failed to load record", err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecord()
  }, [id])

  if (loading) return <RelativeLoader />
  if (user.id !== record.doctor_user_id && user.role !== 'admin') return <Unauthorized message={'You didnt create this record'} />
  if (!record) return <div>Record not found</div>
  return (
    <div className="full-container" style={{maxHeight: 'calc(100vh - 70px)'}}>
      <div style={{padding: '20px', }}>
        
        <div style={{boxShadow: '0px 0px 6px #4d4d4d4a', borderRadius: '14px', padding: '25px', display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex', placeItems: 'center', gap: '8px'}}>
          <span style={{padding: '0 5px', display: 'flex', cursor: 'pointer'}} onClick={()=> history.back()}>
            <ArrowLeft />
          </span>
          <span style={{fontSize: '19px',}}>
            Record Details for {record.patient_name}
          </span>
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '20px'}}>
            <div style={{display: 'flex', width: '48%', flexDirection: 'column'}}>
              <span style={{fontWeight: 500, padding: '12px 0'}}>
                Patient Name: 
              </span>
              <div style={{padding: '16px 17px', border: '2px solid #d3d3d3', borderRadius: '8px', background: '#e7e7e7', color: '#666666', fontSize: '.95em'}}>
                <span>
                  {record.patient_name}
                </span>
              </div>
            </div>
            <div style={{display: 'flex', width: '48%', flexDirection: 'column'}}>
              <span style={{fontWeight: 500, padding: '12px 0'}}>
                Diagnosis: 
              </span>
              <div style={{padding: '16px 17px', border: '2px solid #d3d3d3', borderRadius: '8px', background: '#e7e7e7', color: '#666666', fontSize: '.95em'}}>
                <span>
                  {record.diagnosis}
                </span>
              </div>
            </div>
            <div style={{display: 'flex', width: '48%', flexDirection: 'column'}}>
              <span style={{fontWeight: 500, padding: '12px 0'}}>
                Symptoms: 
              </span>
              <div style={{padding: '16px 17px', border: '2px solid #d3d3d3', borderRadius: '8px', background: '#e7e7e7', color: '#666666', fontSize: '.95em'}}>
                <span>
                  {record.symptoms}
                </span>
              </div>
            </div>
            <div style={{display: 'flex', width: '48%', flexDirection: 'column'}}>
              <span style={{fontWeight: 500, padding: '12px 0'}}>
                Treatment: 
              </span>
              <div style={{padding: '16px 17px', border: '2px solid #d3d3d3', borderRadius: '8px', background: '#e7e7e7', color: '#666666', fontSize: '.95em'}}>
                <span>
                  {record.treatment}
                </span>
              </div>
            </div>
            <div style={{display: 'flex', width: '48%', flexDirection: 'column'}}>
              <span style={{fontWeight: 500, padding: '12px 0'}}>
                Prescription: 
              </span>
              <div style={{padding: '16px 17px', border: '2px solid #d3d3d3', borderRadius: '8px', background: '#e7e7e7', color: '#666666', fontSize: '.95em'}}>
                <span>
                  {record.prescription}
                </span>
              </div>
            </div>
            <div style={{display: 'flex', width: '48%', flexDirection: 'column'}}>
              <span style={{fontWeight: 500, padding: '12px 0'}}>
                Notes: 
              </span>
              <div style={{padding: '16px 17px', border: '2px solid #d3d3d3', borderRadius: '8px', background: '#e7e7e7', color: '#666666', fontSize: '.95em'}}>
                <span>
                  {record.notes}
                </span>
              </div>
            </div>
            <div style={{display: 'flex', width: '48%', flexDirection: 'column'}}>
              <span style={{fontWeight: 500, padding: '12px 0'}}>
                Time details: 
              </span>
              <div style={{padding: '16px 17px', border: '2px solid #d3d3d3', borderRadius: '8px', background: '#e7e7e7', color: '#666666', fontSize: '.95em'}}>
                <span>
                  {record.created_at}
                </span>
              </div>
            </div>
            {user.role == "admin" && (
              <div style={{display: 'flex', width: '48%', flexDirection: 'column'}}>
                <span style={{fontWeight: 500, padding: '12px 0'}}>
                  Doctor's Name: 
                </span>
                <div style={{padding: '16px 17px', border: '2px solid #d3d3d3', borderRadius: '8px', background: '#e7e7e7', color: '#666666', fontSize: '.95em'}}>
                  <span>
                    {record.doctor_name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecordDetails