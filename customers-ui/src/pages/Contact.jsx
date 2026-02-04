import React from 'react'
import Header from '../components/Header'

function Contact() {
  return (
    <>
      <Header />
      <div style={{background: '#fff', padding: '100px 0'}}>
        <div className="contact-container">
          <span style={{fontSize: '18px', fontWeight: '600', textTransform: 'capitalize', color: '#61ce70'}}>
            send us a message
          </span>
          <div className="contact-us">
            <span style={{fontSize: '28px', color: '#fff', display: 'flex', justifySelf: 'center'}}>
              Contact-Us
            </span>
            <div className="inputs">
              <div className="input-container">
                <input type='text' className='input' placeholder='Name' required />
              </div>
              <div className="input-container">
                <input type='tel' className='input' placeholder='Phone Number' required />
              </div>
              <div className="input-container">
                <input type='email' className='input' placeholder='Email' required />
              </div>
              <div className="input-container">
                <textarea name="message" className='input' placeholder='Message' id="message" rows='4'>

                </textarea>
              </div>
              <div className="input-container">
                <input type='submit' className='submit' value='submit form' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact