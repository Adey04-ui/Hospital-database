import React, { useState } from 'react'
import Header from '../components/Header'
import { toast } from "sonner";
import { apiFetch } from '../services/api';

function Contact() {
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: "",
    message: "",
    phone: "",
    email: "",
    patient_id: "",
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    if (form.name.trim() === "") {
      toast.error("Please add a name")
      return
    }
    if (form.message.trim() === "") {
      toast.error("Please add a message")
      return
    }
    if (form.phone.trim() === "") {
      toast.error("Please add a phone number")
      return
    }
    if (form.email.trim() === "") {
      toast.error("Please add an email")
      return
    }
    try {
      await apiFetch("/mail/contactUsMail.php", {
        method: "POST",
        body: JSON.stringify(form),
      })
      setForm({
        name: "",
        message: "",
        phone: "",
        email: "",
        patient_id: "",
      })
      toast.success("message submitted successfully!")
    } catch (error) {
      toast.error("Failed to submit message. Please try again.", error.message)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <>
      <Header />
      <div style={{ background: '#fff', padding: '100px 0' }}>
        <div className="contact-container">
          <span style={{ fontSize: '18px', fontWeight: '600', textTransform: 'capitalize', color: '#61ce70' }}>
            send us a message
          </span>
          <div className="contact-us">
            <span style={{ fontSize: '28px', color: '#fff', display: 'flex', justifySelf: 'center' }}>
              Contact-Us
            </span>
            <div className="inputs">
              <div className="input-container">
                <input type='text' className='input' placeholder='Name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="input-container">
                <input type='tel' className='input' placeholder='Phone Number' value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>
              <div className="input-container">
                <input type='email' className='input' placeholder='Email' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="input-container">
                <input type='number' className='input' placeholder='Patient Id' value={form.patient_id} onChange={(e) => setForm({ ...form, patient_id: e.target.value })} />
              </div>
              <div className="input-container">
                <textarea name="message" className='input' placeholder='Message' id="message" rows='4' value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required >

                </textarea>
              </div>
              <div className="input-container">
                <input type='submit' className='submit' value={`${submitting ? 'Submitting...' : 'Submit Form'}`} onClick={handleSubmit} disabled={submitting} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact