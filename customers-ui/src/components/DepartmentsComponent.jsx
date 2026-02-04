import React from 'react'
import { FaHospitalAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { Ambulance, BiochemistryLaboratory, ChildCare, FamilyPlanning, FemaleReproductiveSystem, Gynecology, Heart, HeartCardiogram, HeartOrgan, IntensiveCareUnit, Nutrition, Opthalmology, Pregnant, SurgicalSterilization, UltrasoundScanner } from 'healthicons-react/filled';

function DepartmentsComponent() {
  const navigate = useNavigate()
  return (
    <div style={{ display: 'flex', justifyContent: 'center'}} className='departmentss'>
      <div style={{background: '#40ba8dcc', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 0}}>
        <div className='container-1' style={{ padding: '70px 0px', display: 'flex', placeItems: 'center', color: '#54595f', flexDirection: 'column', zIndex: '999'}}>
          <div>
            <span style={{fontSize: '1.6em', color: '#54595f', fontWeight: '600'}} className='spandepartment'>
              OUR DEPARTMENTS
            </span>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '35px', gap: '14px', placeItems: 'center'}}>
            <hr style={{ borderTop: '1px solid #54595f'}} className='horizontal' />
            <FaHospitalAlt size={23} />
            <hr style={{ borderTop: '1px solid #54595f'}} className='horizontal' />
          </div>
          <div style={{ position: 'relative'}} className='departments-container'>
            <div className="each-departments" style={{display: 'flex', justifyContent: 'space-between', background: '#54595f', width: '215px', height: '155px', flexDirection: 'column', placeItems: 'center', color: '#61ce70', padding: '20px 40px'}} onClick={()=> navigate('/services')}>
              <div>
                <Pregnant style={{width: '70px', height: '65px'}} className='health-icons' />
              </div>
              <div style={{fontWeight: '600', fontSize: '15px', display: 'flex', justifyContent: 'center', textAlign: 'center', cursor: 'pointer'}}>
                Obstetrics and Gynaecology
              </div>
            </div>
            <div className="each-departments" style={{display: 'flex', justifyContent: 'space-between', background: '#54595f', width: '215px', height: '155px', flexDirection: 'column', placeItems: 'center', color: '#61ce70', padding: '20px 40px'}} onClick={()=> navigate('/services')}>
              <div>
                <IntensiveCareUnit style={{width: '70px', height: '65px'}} className='health-icons' />
              </div>
              <div style={{fontWeight: '600', fontSize: '15px', display: 'flex', justifyContent: 'center', textAlign: 'center', cursor: 'pointer'}}>
                Adult Intensive Care
              </div>
            </div>
            <div className="each-departments" style={{display: 'flex', justifyContent: 'space-between', background: '#54595f', width: '215px', height: '155px', flexDirection: 'column', placeItems: 'center', color: '#61ce70', padding: '20px 40px'}} onClick={()=> navigate('/services')}>
              <div>
                <ChildCare style={{width: '70px', height: '65px'}} className='health-icons' />
              </div>
              <div style={{fontWeight: '600', fontSize: '15px', display: 'flex', justifyContent: 'center', textAlign: 'center', cursor: 'pointer'}}>
                Child Health
              </div>
            </div>
            <div className="each-departments" style={{display: 'flex', justifyContent: 'space-between', background: '#54595f', width: '215px', height: '155px', flexDirection: 'column', placeItems: 'center', color: '#61ce70', padding: '20px 40px'}} onClick={()=> navigate('/services')}>
              <div>
                <FamilyPlanning style={{width: '70px', height: '65px'}} className='health-icons' />
              </div>
              <div style={{fontWeight: '600', fontSize: '15px', display: 'flex', justifyContent: 'center', textAlign: 'center', cursor: 'pointer'}}>
                Family Planning
              </div>
            </div>
            <div className="each-departments" style={{display: 'flex', justifyContent: 'space-between', background: '#54595f', width: '215px', height: '155px', flexDirection: 'column', placeItems: 'center', color: '#61ce70', padding: '20px 40px'}} onClick={()=> navigate('/services')}>
              <div>
                <Nutrition style={{width: '70px', height: '65px'}} className='health-icons' />
              </div>
              <div style={{fontWeight: '600', fontSize: '15px', display: 'flex', justifyContent: 'center', textAlign: 'center', cursor: 'pointer'}}>
                Nutrition Care
              </div>
            </div>
            <div className="each-departments" style={{display: 'flex', justifyContent: 'space-between', background: '#54595f', width: '215px', height: '155px', flexDirection: 'column', placeItems: 'center', color: '#61ce70', padding: '20px 40px'}} onClick={()=> navigate('/services')}>
              <div>
                <UltrasoundScanner style={{width: '70px', height: '65px'}} className='health-icons' />
              </div>
              <div style={{fontWeight: '600', fontSize: '15px', display: 'flex', justifyContent: 'center', textAlign: 'center', cursor: 'pointer'}}>
                Ultrasonography
              </div>
            </div>
            <div className="each-departments" style={{display: 'flex', justifyContent: 'space-between', background: '#54595f', width: '215px', height: '155px', flexDirection: 'column', placeItems: 'center', color: '#61ce70', padding: '20px 40px'}} onClick={()=> navigate('/services')}>
              <div>
                <BiochemistryLaboratory style={{width: '70px', height: '65px'}} className='health-icons' />
              </div>
              <div style={{fontWeight: '600', fontSize: '15px', display: 'flex', justifyContent: 'center', textAlign: 'center', cursor: 'pointer'}}>
                Laboratory Services
              </div>
            </div>
            <div className="each-departments" style={{display: 'flex', justifyContent: 'space-between', background: '#54595f', width: '215px', height: '155px', flexDirection: 'column', placeItems: 'center', color: '#61ce70', padding: '20px 40px'}} onClick={()=> navigate('/services')}>
              <div>
                <SurgicalSterilization style={{width: '70px', height: '65px'}} className='health-icons' />
              </div>
              <div style={{fontWeight: '600', fontSize: '15px', display: 'flex', justifyContent: 'center', textAlign: 'center', cursor: 'pointer'}}>
                Surgical Services
              </div>
            </div>
            <div className="each-departments" style={{display: 'flex', justifyContent: 'space-between', background: '#54595f', width: '215px', height: '155px', flexDirection: 'column', placeItems: 'center', color: '#61ce70', padding: '20px 40px'}} onClick={()=> navigate('/services')}>
              <div>
                <HeartOrgan style={{width: '70px', height: '65px'}} className='health-icons' />
              </div>
              <div style={{fontWeight: '600', fontSize: '15px', display: 'flex', justifyContent: 'center', textAlign: 'center', cursor: 'pointer'}}>
                Heart and Wellness Package
              </div>
            </div>
            <div className="each-departments" style={{display: 'flex', justifyContent: 'space-between', background: '#54595f', width: '215px', height: '155px', flexDirection: 'column', placeItems: 'center', color: '#61ce70', padding: '20px 40px'}} onClick={()=> navigate('/services')}>
              <div>
                <Ambulance style={{width: '70px', height: '65px'}} className='health-icons' />
              </div>
              <div style={{fontWeight: '600', fontSize: '15px', display: 'flex', justifyContent: 'center', textAlign: 'center', cursor: 'pointer'}}>
                Ambulance services
              </div>
            </div>
            <div className="each-departments" style={{display: 'flex', justifyContent: 'space-between', background: '#54595f', width: '215px', height: '155px', flexDirection: 'column', placeItems: 'center', color: '#61ce70', padding: '20px 40px'}} onClick={()=> navigate('/services')}>
              <div>
                <FemaleReproductiveSystem style={{width: '70px', height: '65px'}} className='health-icons' />
              </div>
              <div style={{fontWeight: '600', fontSize: '15px', display: 'flex', justifyContent: 'center', textAlign: 'center', cursor: 'pointer'}}>
                Assisted Reproductive Clinic
              </div>
            </div>
            <div className="each-departments" style={{display: 'flex', justifyContent: 'space-between', background: '#54595f', width: '215px', height: '155px', flexDirection: 'column', placeItems: 'center', color: '#61ce70', padding: '20px 40px'}} onClick={()=> navigate('/services')}>
              <div>
                <Opthalmology style={{width: '70px', height: '65px'}} className='health-icons' />
              </div>
              <div style={{fontWeight: '600', fontSize: '15px', display: 'flex', justifyContent: 'center', textAlign: 'center', cursor: 'pointer'}}>
                Opthamology
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepartmentsComponent