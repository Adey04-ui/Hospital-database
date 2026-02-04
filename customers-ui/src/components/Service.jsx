import React from 'react'
import { health, opthamology, reproduction } from '../assets/assets'
import { FaCheckCircle } from 'react-icons/fa'
import { CheckCircle } from 'react-feather'
import { ambulance, biochem, family, gynaecology, nutrition, surgical, ultrasound, adulticu, childhealth } from '../assets/assets'

function Service({service}) {
  if (service == 'gynaecology') {
    return (
      <div>
        <img src={gynaecology} alt="gynaecology" style={{flex: 1, width: '100%', objectFit: 'cover', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)'}} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{color: '#6ec1e4', fontWeight: '600', fontSize: '18px', marginBottom: '25px', marginTop: '15px'}}>
            Obstetrics and Gynaecology
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '20px'}}>
            We have seasoned specialist consultants in this field and with remarkable success rating in all our services.
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '40px'}}>
            From the time that pregnancy is considered all through to delivery, we offer professional medical care for the mother and the baby.
          </span>
          <div style={{display: 'flex', gap: '40px'}} className='container-6'>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Care About Your Health
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Professional Doctors
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Fast and Flex Service
            </span>
          </div>
          <div style={{marginTop: '30px'}}>
            <button style={{padding: '12px 23px', borderRadius: '5px', color: '#fff', fontWeight: '600', cursor: 'pointer',}} className='contact-btn'>
              Contact us
            </button>
          </div>
        </div>
      </div>
    )
  }
  if (service == 'icu') {
    return (
      <div>
        <img src={adulticu} alt="icu" style={{flex: 1, width: '100%', objectFit: 'cover', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)'}} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{color: '#6ec1e4', fontWeight: '600', fontSize: '18px', marginBottom: '25px', marginTop: '15px'}}>
            Adult Intensive Care
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '40px'}}>
            Our adult intensive care unit (ICU) cares for adult patients who are critically ill, require ventilation support or require constant observation and care. We aim to provide high standards of care to our patients, such as meeting international best practices.
          </span>
          <div style={{display: 'flex', gap: '40px'}} className='container-6'>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Care About Your Health
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Professional Doctors
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Fast and Flex Service
            </span>
          </div>
          <div style={{marginTop: '30px'}}>
            <button style={{padding: '12px 23px', borderRadius: '5px', color: '#fff', fontWeight: '600', cursor: 'pointer',}} className='contact-btn'>
              Contact us
            </button>
          </div>
        </div>
      </div>
    )
  }
  if (service == 'child-health') {
    return (
      <div>
        <img src={childhealth} alt="child-health" style={{flex: 1, width: '100%', objectFit: 'cover', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)'}} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{color: '#6ec1e4', fontWeight: '600', fontSize: '18px', marginBottom: '25px', marginTop: '15px'}}>
            Child Health
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '20px'}}>
            Our in-house Paediatricians (doctor who specializes in child health) and specialist nurses have secured remarkable child health care services, making Mother and Child Hospital the first among equals.
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '40px'}}>
            The increasing demands have motivated further investment in equipment and personnel in our Pediatric unit. We are fully suited to take care of children on an in-patient (on admission at the hospitals) or out-patient basis.
          </span>
          <div style={{display: 'flex', gap: '40px'}} className='container-6'>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Care About Your Health
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Professional Doctors
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Fast and Flex Service
            </span>
          </div>
          <div style={{marginTop: '30px'}}>
            <button style={{padding: '12px 23px', borderRadius: '5px', color: '#fff', fontWeight: '600', cursor: 'pointer',}} className='contact-btn'>
              Contact us
            </button>
          </div>
        </div>
      </div>
    )
  }
  if (service == 'family') {
    return (
      <div>
        <img src={family} alt="family" style={{flex: 1, width: '100%', objectFit: 'cover', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)'}} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{color: '#6ec1e4', fontWeight: '600', fontSize: '18px', marginBottom: '25px', marginTop: '15px'}}>
            Family Planning
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '20px'}}>
            Pregnancy, especially when planned is a rewarding experience. <br /><br />

            When a woman however, gets pregnant when unplanned, a cascade of events and actions begins to happen which may lead to deleterious effects for her as a woman and or the fetus she is carrying.
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '40px'}}>
            The ability to decide if and when to get pregnant and how many children a woman will have is a very strong tenet of reproductive health. <br /><br />

            At Mother and Child Hospital , we create a platform upon which women are able to make informed reproductive health choices as regards Family planning and contraception.
          </span>
          <div style={{display: 'flex', gap: '40px'}} className='container-6'>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Care About Your Health
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Professional Doctors
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Fast and Flex Service
            </span>
          </div>
          <div style={{marginTop: '30px'}}>
            <button style={{padding: '12px 23px', borderRadius: '5px', color: '#fff', fontWeight: '600', cursor: 'pointer',}} className='contact-btn'>
              Contact us
            </button>
          </div>
        </div>
      </div>
    )
  }
  if (service == 'nutrition') {
    return (
      <div>
        <img src={nutrition} alt="nutrition" style={{flex: 1, width: '100%', objectFit: 'cover', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)'}} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{color: '#6ec1e4', fontWeight: '600', fontSize: '18px', marginBottom: '25px', marginTop: '15px'}}>
            Nutrition Care
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '20px'}}>
            Our dietitians are readily available to help in the management of all nutritional related diseases especially at the point of diagnosis. We believe in holistic management of disease conditions which helps to facilitate easy recovery or prevent complications of disease conditions.
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '40px'}}>
            Health conditions requiring nutritional managements are:
            <ul style={{listStyleType: 'square', marginTop: '20px', marginLeft: '25px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <li>Overweight/Obesity </li>
              <li>Polycystic Ovarian Syndrome </li>
              <li>Diabetes mellitus </li>
              <li>Hypertension and Cardiovascular diseases </li>
              <li>Gastrointestinal diseases </li>
              <li>Acute Hepatitis </li>
              <li>Renal Diseases </li>
              <li>Pulmonary Diseases </li>
              <li>Rheumatic Diseases </li>
              <li>HIV/AIDS </li>
              <li>Cancer</li>
            </ul>
          </span>
          <div style={{display: 'flex', gap: '40px'}} className='container-6'>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Care About Your Health
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Professional Doctors
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Fast and Flex Service
            </span>
          </div>
          <div style={{marginTop: '30px'}}>
            <button style={{padding: '12px 23px', borderRadius: '5px', color: '#fff', fontWeight: '600', cursor: 'pointer',}} className='contact-btn'>
              Contact us
            </button>
          </div>
        </div>
      </div>
    )
  }
  if (service == 'ultrasound') {
    return (
      <div>
        <img src={ultrasound} alt="ultrasound" style={{flex: 1, width: '100%', objectFit: 'cover', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)'}} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{color: '#6ec1e4', fontWeight: '600', fontSize: '18px', marginBottom: '25px', marginTop: '15px'}}>
            Ultrasonography
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '40px'}}>
            We offer this service not only in the management of women seeking to be pregnant but for the pregnant, children and to evaluate the abdomen, the thyroid, breasts, prostate, surface masses and specialized ultrasonography such as 3D/4D scan, Doppler and ultrasound of veins and arteries.
          </span>
          <div style={{display: 'flex', gap: '40px'}} className='container-6'>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Care About Your Health
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Professional Doctors
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Fast and Flex Service
            </span>
          </div>
          <div style={{marginTop: '30px'}}>
            <button style={{padding: '12px 23px', borderRadius: '5px', color: '#fff', fontWeight: '600', cursor: 'pointer',}} className='contact-btn'>
              Contact us
            </button>
          </div>
        </div>
      </div>
    )
  }
  if (service == 'biochem') {
    return (
      <div>
        <img src={biochem} alt="biochem" style={{flex: 1, width: '100%', objectFit: 'cover', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)'}} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{color: '#6ec1e4', fontWeight: '600', fontSize: '18px', marginBottom: '25px', marginTop: '15px'}}>
            Laboratory Services
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '40px'}}>
            We are equipped with a fully functional laboratory to cater for tests to aid diagnosis and treatment of our patient. Trained laboratory scientists are on ground to respond to requests round the clock.
          </span>
          <div style={{display: 'flex', gap: '40px'}} className='container-6'>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Care About Your Health
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Professional Doctors
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Fast and Flex Service
            </span>
          </div>
          <div style={{marginTop: '30px'}}>
            <button style={{padding: '12px 23px', borderRadius: '5px', color: '#fff', fontWeight: '600', cursor: 'pointer',}} className='contact-btn'>
              Contact us
            </button>
          </div>
        </div>
      </div>
    )
  }
  if (service == 'surgical') {
    return (
      <div>
        <img src={surgical} alt="surgical" style={{flex: 1, width: '100%', objectFit: 'cover', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)'}} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{color: '#6ec1e4', fontWeight: '600', fontSize: '18px', marginBottom: '25px', marginTop: '15px'}}>
            Surgical Services
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '40px'}}>
            We have experienced surgeons that handle surgical procedures at our premises employing modern technologies and equipment. Our operating suite is equipped for surgical operation across the surgical specialties.
          </span>
          <div style={{display: 'flex', gap: '40px'}} className='container-6'>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Care About Your Health
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Professional Doctors
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Fast and Flex Service
            </span>
          </div>
          <div style={{marginTop: '30px'}}>
            <button style={{padding: '12px 23px', borderRadius: '5px', color: '#fff', fontWeight: '600', cursor: 'pointer',}} className='contact-btn'>
              Contact us
            </button>
          </div>
        </div>
      </div>
    )
  }
  if (service == 'heart') {
    return (
      <div>
        <img src={health} alt="heart" style={{flex: 1, width: '100%', objectFit: 'cover', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)'}} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{color: '#6ec1e4', fontWeight: '600', fontSize: '18px', marginBottom: '25px', marginTop: '15px'}}>
            Heart and Wellness Package
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '20px'}}>
            Regular health-check helps identify any signs of health challenges. Finding problems early means that effective treatment can be sought early.
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '40px'}}>
            Take advantage of our basic, standard, standard plus and supreme plans today.
          </span>
          <div style={{display: 'flex', gap: '40px'}} className='container-6'>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Care About Your Health
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Professional Doctors
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Fast and Flex Service
            </span>
          </div>
          <div style={{marginTop: '30px'}}>
            <button style={{padding: '12px 23px', borderRadius: '5px', color: '#fff', fontWeight: '600', cursor: 'pointer',}} className='contact-btn'>
              Contact us
            </button>
          </div>
        </div>
      </div>
    )
  }
  if (service == 'ambulance') {
    return (
      <div>
        <img src={ambulance} alt="Ambulance" style={{flex: 1, width: '100%', objectFit: 'cover', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)'}} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{color: '#6ec1e4', fontWeight: '600', fontSize: '18px', marginBottom: '25px', marginTop: '15px'}}>
            Ambulance Services
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '20px'}}>
            Ambulance service is an important part of emergency medical care. At Mother and Child Hospital we use our ambulances both to provide emergency response and transfer patients to points of receiving more healthcare.<br /><br />

            We run a 24/7 emergency service, available for our customers and to other health organizations. Part of our emergency service operation is neonatal and adult intensive care, and surgery.
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '40px'}}>
            Our ambulance service is highly equipped with mobile ventilator, monitor, defibrillators and regular oxygen supply, to move patients from place to place. Professionals are attached to attend to patient needs within the right timeframe for their medical needs.<br /><br />

            We provide equipment and expertise in emergency intervention, management and transportation. To use our ambulance service, please email clientservice_hq@motherandchildhospital.com or call +234 703 620 2190.
          </span>
          <div style={{display: 'flex', gap: '40px'}} className='container-6'>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Care About Your Health
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Professional Doctors
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Fast and Flex Service
            </span>
          </div>
          <div style={{marginTop: '30px'}}>
            <button style={{padding: '12px 23px', borderRadius: '5px', color: '#fff', fontWeight: '600', cursor: 'pointer',}} className='contact-btn'>
              Contact us
            </button>
          </div>
        </div>
      </div>
    )
  }
  if (service == 'reproduction') {
    return (
      <div>
        <img src={reproduction} alt="reproduction" style={{flex: 1, width: '100%', objectFit: 'cover', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)'}} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{color: '#6ec1e4', fontWeight: '600', fontSize: '18px', marginBottom: '25px', marginTop: '15px'}}>
            Assisted Reproductive Clinic
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '20px', textWrap: 'wrap', wordWrap: 'break-word'}}>
            Under our Assisted Reproduction unit at Mother and Child Hospital, we offer fertility solutions to couples and individuals needing assistance to have a baby and to test for genetic abnormalities. We provide a range of fertility services and solutions to gynecological problems. These services include IVF treatment using Intracytoplasmic Sperm Injection (ICSI), Intrauterine Insemination (IUI), Pre-Implantation Genetic Testing and other related services. <br /><br />

            Assisted reproduction can be a primary infertility treatment for young and older couples. It also treats health conditions such as fallopian tube blockage, male reproductive tract blockage, tubal ligation, ovulation irregularities, endometriosis, uterine fibroids, or impaired sperm function (low sperm count, low sex hormones, low sperm motility). Your chances of having a healthy baby using assisted reproduction depend on many other factors.<br /><br />

            During an IVF procedure using ICSI, mature eggs are collected from the ovaries and fertilized in the IVF lab by injecting already prepared sperm cells into the cytoplasm of a mature egg. When fertilization occurs, the zygote (s) is cultured in the incubator for some days, and the resulting embryo (s) are transferred into the uterus.<br /><br />

            IUI procedure is carried out by directly inseminating prepared and concentrated sperm into a woman’s uterus when her ovary releases one or more eggs to be fertilized.<br /><br />

            Depending on the reasons for infertility, the results of a fertility test, your medical history, and other considerations will determine the best treatment method.<br /><br />
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '40px'}}>
            Under Pre-Implantation Genetic Testing (PGT), we offer the following services: <br /><br />

              1. Testing for Aneuploidy (PGT-A): Test on embryos created through IVF to screen for chromosomal abnormalities such as Down Syndrome. It will also benefit couples who desire family balancing (sex selection). <br /><br />

              2. Testing for Monogenic disease (PGT-M): Testing for single gene disorders such as Sickle cell anemia (SS genotype), Albinism, Cystic fibrosis, and other monogenic disorders. AS/AS couples would most benefit from this treatment.<br /><br />

              3. HLA matching (donor Sibling): Testing for Human Leukocyte antigens is a procedure that identifies a healthy and HLA-matched embryo compatible with the sick sibling. After a successful IVF PGT-HLA procedure, the resulting child becomes a sibling donor to the affected child.<br /><br />

              4. SR. Rearrangement (PGT-SR Structural): To screen for chromosomal structural rearrangements in couples and thus increase the chance of a successful pregnancy.<br /><br />

              We also offer Semen Freezing, Cryopreservation (Eggs & Embryos) services. In addition, we do Transport IVF, which is the shipment of Gametes and Embryos within and outside Nigeria.<br /><br />

              Assisted reproduction can be a stretching period. We will work closely with you throughout this journey, providing counselling and medical recommendations. Upon conception, our team of experienced Obstetricians & Gynecologists and midwives will attend to you regularly until birth and after delivery. Our Assisted Reproduction Clinic has a well-equipped lab and seasoned fertility experts to support a successful process.<br /><br />

              The Assisted Reproduction Clinic at Mother and Child Hospital runs from Monday to Friday, 9 am to 2 pm at 2, Omole Layout, Ogunnusi Road, Ojodu, Lagos State. Our doors are open for a fertility consultation. You can schedule an appointment by calling our phone line at +234 703 620 2190.<br /><br />
          </span>
          <div style={{display: 'flex', gap: '40px'}} className='container-6'>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Care About Your Health
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Professional Doctors
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Fast and Flex Service
            </span>
          </div>
          <div style={{marginTop: '30px'}}>
            <button style={{padding: '12px 23px', borderRadius: '5px', color: '#fff', fontWeight: '600', cursor: 'pointer',}} className='contact-btn'>
              Contact us
            </button>
          </div>
        </div>
      </div>
    )
  }
  if (service == 'opthamology') {
    return (
      <div>
        <img src={opthamology} alt="opthamology" style={{flex: 1, width: '100%', objectFit: 'cover', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)'}} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{color: '#6ec1e4', fontWeight: '600', fontSize: '18px', marginBottom: '25px', marginTop: '15px'}}>
            Opthamology
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '20px'}}>
            Ophthalmology is a specialty in medicine that provides medical care for eye conditions and preservation of sight which can be achieved with the use of medications, corrective glasses or surgery. The head of the team is the Ophthalmologist (Eye Surgeon) working together with the Optometrist, Opticians and Ophthalmic Nurses to deliver adequate health care to patients.
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '20px'}}>
            There is a wide range of patients, the majority of which are the elderly with poor vision caused by cataracts or glaucoma. The middle aged and young are managed for similar ailments especially those with a positive family history and risk factors for these common blinding conditions. Refractory errors are however more common amongst the younger age groups.
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '20px'}}>
            Ophthalmologists do not work in isolation from other specialties as various medical conditions like chronic headaches, migraine, thyroid disease, Hypertension and Diabetes also affect the eyes and may require urgent review by the ophthalmologist for expert care and for the comfort of the patients.
          </span>
          <span style={{fontSize: '15px', color: '#7a7a7a', marginBottom: '40px'}}>
            The eye is the only organ through which the body and mind are illuminated thereby giving every individual an outlook of the surrounding environment and world at large. Therefore, proper care and attention should be given to retain sight at all costs. Health is wealth!
          </span>
          <div style={{display: 'flex', gap: '40px'}} className='container-6'>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Care About Your Health
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Professional Doctors
            </span>
            <span style={{display: 'flex', placeItems: 'center', gap: '10px', fontSize: '15px', color: '#7a7a7a'}}>
              <CheckCircle size={16} color='#6ec1e4' />
              Fast and Flex Service
            </span>
          </div>
          <div style={{marginTop: '30px'}}>
            <button style={{padding: '12px 23px', borderRadius: '5px', color: '#fff', fontWeight: '600', cursor: 'pointer',}} className='contact-btn'>
              Contact us
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Service