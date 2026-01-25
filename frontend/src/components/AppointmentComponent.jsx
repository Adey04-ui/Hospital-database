import React from 'react'
import { useNavigate } from 'react-router-dom'

function AppointmentComponent({appointments}) {
  // const [appointments, setAppointments] = useState([])
  // const [loading, setLoading] = useState(true)
  // useEffect(()=> {
  //   const fetchAppointments = async () => {
  //     try {
  //       const res = await apiFetch('/appointments/list.php?day=today')
  //       setAppointments(res)
  //     } catch (error) {
  //       console.error(error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchAppointments()
  // }, [])

  const navigate = useNavigate()

  const date = new Date()
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // January is 0!
  const year = date.getFullYear()
  const today = year + '-' + month + '-' + day
  console.log(typeof(today))

  const completedAppointments = appointments.filter(appointment => {
    const query = 'completed'

    return (
      appointment.status.includes(query)
    )
  }).slice(0, 5)

  const cancelledAppointments = appointments.filter(appointment => {
    const query = 'cancelled'

    return (
      appointment.status.includes(query)
    )
  }).slice(0, 5)

  return (
    <div style={{marginTop: '25px', height: 'auto', background: '#fff', padding: '30px', borderRadius: '6px', boxShadow: '0px 5px 30px #dadadabe'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
        <span style={{fontSize: '18px', fontWeight: 500, color: '#666666'}}>
          Appointments
        </span>
        <span style={{color: '#030390', cursor: 'pointer'}} onClick={()=> navigate('/appointments')}>
          view all
        </span>
      </div>
      <div style={{display: 'flex', height: '100%', gap: '10px', justifyContent: 'space-between',}}>
        <div style={{width: '48%'}}>
          <span style={{fontWeight: '500', color: '#b2b2b2ff'}}>
            Completed Appointments
          </span>
          <div style={{width: '100%', marginTop: '10px', padding: '12px', background: '#f6f6f6'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', placeItems: 'center', background: '#030390', color: '#fff', padding: '7px 14px'}}>
              <span style={{width: '20%', fontSize: '14px', fontWeight: 500,}}>Appointment id</span>
              <span style={{width: '20%', fontSize: '14px', fontWeight: 500,}}>Doctor name</span>
              <span style={{width: '26%', fontSize: '14px', fontWeight: 500,}}>Patient name</span>
              <span style={{width: '16%', fontSize: '14px', fontWeight: 500,}}>Date</span>
            </div>
            <div  style={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto', height: 'auto',}} className='table-container'>
              {completedAppointments.map((app, index) => (
                <div key={index} className={`row`} style={{background: '#fff'}}>
                  <span style={{width: '23%', fontSize: '16px',}}>
                    {app.id}
                  </span>
                  <span style={{width: '23%', fontSize: '16px',}}>
                    {app.doctor_name}
                  </span>
                  <span style={{width: '31%', fontSize: '16px',}}>
                    {app.patient_name}
                  </span>
                  <span style={{width: '19%', fontSize: '16px', textWrap: 'wrap', wordWrap: 'break-word'}}>
                    {app.appointment_date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{width: '49%'}}>
          <span style={{fontWeight: '500', color: '#b2b2b2ff'}}>
            Cancelled Appointments
          </span>
          <div style={{width: '100%', marginTop: '10px', padding: '12px', background: '#f6f6f6'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', placeItems: 'center', background: '#030390', color: '#fff', padding: '7px 14px'}}>
              <span style={{width: '20%', fontSize: '14px', fontWeight: 500,}}>Appointment id</span>
              <span style={{width: '20%', fontSize: '14px', fontWeight: 500,}}>Doctor name</span>
              <span style={{width: '26%', fontSize: '14px', fontWeight: 500,}}>Patient name</span>
              <span style={{width: '16%', fontSize: '14px', fontWeight: 500,}}>Date</span>
            </div>
            <div  style={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto', height: 'auto',}} className='table-container'>
              {cancelledAppointments.map((app, index) => (
                <div key={index} className={`row`} style={{background: '#fff'}}>
                  <span style={{width: '23%', fontSize: '16px',}}>
                    {app.id}
                  </span>
                  <span style={{width: '23%', fontSize: '16px',}}>
                    {app.doctor_name}
                  </span>
                  <span style={{width: '31%', fontSize: '16px',}}>
                    {app.patient_name}
                  </span>
                  <span style={{width: '19%', fontSize: '16px', textWrap: 'wrap', wordWrap: 'break-word'}}>
                    {app.appointment_date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentComponent