import React, { useState } from 'react'
import Header from '../components/Header'
import { FaMinus, FaPlus } from 'react-icons/fa'

function Faqs() {
  const [question, setQuestion] = useState(null)
  const qanda = [
    {
      id: 1,
      q: 'What are your services ?',
      a: 'We offer services in Obstetrics and Gynaecology, Infertility Care, Neo-Natal Care, General Medical Practice, Child Health, Surgery, Adult & Neonatal Intensive Care, Opthamology, Cardiology, Urology, Dietetics, Laboratory Tests & Ultrasonography. We also run Pre-employment Tests, Executive Medical Scheme, Annual Physical Examination and offer HMO Services.'
    },
    {
      id: 2,
      q: 'Do you ECG test, for tracing of the heart?',
      a: 'Yes we do ECG testing.'
    },
    {
      id: 3,
      q: 'When can I come in for Antenatal?',
      a: 'Antenatal days are all weekdays except Tuesdays.'
    },
    {
      id: 4,
      q: 'What are your delivery charges?',
      a: 'Delivery cost depends on the treatment or procedures required. It will also cover procedures, accommodation, drugs and other exigencies that are peculiar to every delivery.'
    },
    {
      id: 5,
      q: 'When can I come in for my baby to be immunized?',
      a: 'We administer vaccines for children between 8am and 12 noon every Saturday except the last Saturday of the month at our center.'
    },
    {
      id: 6,
      q: 'Information on applying for a job',
      a: 'Thank you for your interest, vacancy will be advertised if any.'
    }
  ]
  return (
    <>
      <Header />
      <div style={{background: '#fff', display: 'flex', justifyContent: 'center', padding: '70px 0', color: '#7a7a7aa0'}}>
        <div style={{ border: '.5px solid #7a7a7a', fontSize: '15px', borderBottom: '0px'}} className='container-8'>
          {qanda.map((qanda) => (
          <div key={qanda.id}>
            <div onClick={()=> question !== qanda.id ? setQuestion(qanda.id) : setQuestion(null)} style={{display: 'flex', justifyContent: 'space-between', padding: '14px 17px', cursor: 'pointer', color: '#6ec1e4'}} className='question'>
              <span style={{fontWeight: 600, color: '#6ec1e4'}}>
                {qanda.q}
              </span>
              {question == qanda.id ? <FaMinus /> : <FaPlus />}
            </div>
            <div className={`hidden-answer ${question == qanda.id && 'show'}`}>
              {qanda.a}
            </div>
          </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Faqs