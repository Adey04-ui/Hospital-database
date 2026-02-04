import { Ambulance, BiochemistryLaboratory, ChildCare, FamilyPlanning, FemaleReproductiveSystem, HeartOrgan, IntensiveCareUnit, Nutrition, Opthalmology, Pregnant, SurgicalSterilization, UltrasoundScanner } from 'healthicons-react/filled'
import React from 'react'
import Service from './Service'

function ServicesComponent({service, setService}) {
  return (
    <div style={{display: 'flex', justifyContent: 'center', background: '#fff', padding: '70px 0'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: '25px'}} className='container-7'>
        <div style={{display: 'flex', flexDirection: 'column', placeItems: 'center'}}>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', placeItems: 'center', gap: '20px', maxWidth: '700px', color: '#7a7a7a', fontSize: '14px'}}>
            <span style={{display: 'flex', textAlign: 'center', fontSize: '27px', fontWeight: '600', color: '#6ec1e4'}}>
              Our Services
            </span>
            <span style={{display: 'flex', textAlign: 'center', lineHeight: '22px'}}>
              Our medical personnel and caregivers take into consideration the biological, psychological and social factors relevant to the care of people with illness and diseases.
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', placeItems: 'center', gap: '20px', maxWidth: '700px', color: '#7a7a7a', fontSize: '14px'}}>
            <span style={{display: 'flex', textAlign: 'center', fontSize: '27px', fontWeight: '600', color: '#6ec1e4'}}>
              What We Do
            </span>
            <span style={{display: 'flex', textAlign: 'center', lineHeight: '22px'}}>
              We are a fully integrated healthcare institution that caters to the medical needs of the entire family. Our paramedical and administrative staff are committed to the fear of God in all our operations.
            </span>
          </div>
        </div>
        <div style={{display: 'flex', gap: '25px'}} className='container-12'>
          <div style={{minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <div className={`service-states ${service == 'gynaecology' && 'active'}`} onClick={()=> setService('gynaecology')} style={{display: 'flex', placeItems: 'center', padding: '15px 15px', borderRadius: '8px', gap: '9px'}}>
              <Pregnant />
              <span>
                Obstetrics and Gynecology
              </span>
            </div>
            <div className={`service-states ${service == 'icu' && 'active'}`} onClick={()=> setService('icu')} style={{display: 'flex', placeItems: 'center', padding: '15px 15px', borderRadius: '8px', gap: '9px'}}>
              <IntensiveCareUnit />
              <span>
                Adult Intensive Care
              </span>
            </div>
            <div className={`service-states ${service == 'child-health' && 'active'}`} onClick={()=> setService('child-health')} style={{display: 'flex', placeItems: 'center', padding: '15px 15px', borderRadius: '8px', gap: '9px'}}>
              <ChildCare />
              <span>
                Child Health
              </span>
            </div>
            <div className={`service-states ${service == 'family' && 'active'}`} onClick={()=> setService('family')} style={{display: 'flex', placeItems: 'center', padding: '15px 15px', borderRadius: '8px', gap: '9px'}}>
              <FamilyPlanning />
              <span>
                Family Planning
              </span>
            </div>
            <div className={`service-states ${service == 'nutrition' && 'active'}`} onClick={()=> setService('nutrition')} style={{display: 'flex', placeItems: 'center', padding: '15px 15px', borderRadius: '8px', gap: '9px'}}>
              <Nutrition />
              <span>
                Nutrition Care
              </span>
            </div>
            <div className={`service-states ${service == 'ultrasound' && 'active'}`} onClick={()=> setService('ultrasound')} style={{display: 'flex', placeItems: 'center', padding: '15px 15px', borderRadius: '8px', gap: '9px'}}>
              <UltrasoundScanner />
              <span>
                Ultrasonography
              </span>
            </div>
            <div className={`service-states ${service == 'biochem' && 'active'}`} onClick={()=> setService('biochem')} style={{display: 'flex', placeItems: 'center', padding: '15px 15px', borderRadius: '8px', gap: '9px'}}>
              <BiochemistryLaboratory />
              <span>
                Laboratory Services
              </span>
            </div>
            <div className={`service-states ${service == 'surgical' && 'active'}`} onClick={()=> setService('surgical')} style={{display: 'flex', placeItems: 'center', padding: '15px 15px', borderRadius: '8px', gap: '9px'}}>
              <SurgicalSterilization />
              <span>
                Surgical Services
              </span>
            </div>
            <div className={`service-states ${service == 'heart' && 'active'}`} onClick={()=> setService('heart')} style={{display: 'flex', placeItems: 'center', padding: '15px 15px', borderRadius: '8px', gap: '9px'}}>
              <HeartOrgan />
              <span>
                Heart and Wellness Package
              </span>
            </div>
            <div className={`service-states ${service == 'ambulance' && 'active'}`} onClick={()=> setService('ambulance')} style={{display: 'flex', placeItems: 'center', padding: '15px 15px', borderRadius: '8px', gap: '9px'}}>
              <Ambulance />
              <span>
                Ambulance services
              </span>
            </div>
            <div className={`service-states ${service == 'reproduction' && 'active'}`} onClick={()=> setService('reproduction')} style={{display: 'flex', placeItems: 'center', padding: '15px 15px', borderRadius: '8px', gap: '9px'}}>
              <FemaleReproductiveSystem />
              <span>
                Assisted Reproductive Clinic
              </span>
            </div>
            <div className={`service-states ${service == 'opthamology' && 'active'}`} onClick={()=> setService('opthamology')} style={{display: 'flex', placeItems: 'center', padding: '15px 15px', borderRadius: '8px', gap: '9px'}}>
              <Opthalmology />
              <span>
                Opthamology
              </span>
            </div>
          </div>
          <Service service={service} />
        </div>
      </div>
    </div>
  )
}

export default ServicesComponent