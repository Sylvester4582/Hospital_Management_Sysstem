import React from 'react'
import AppointmentForm from '../components/AmpointmentForm.jsx'
import Hero from '../components/Hero.jsx'


const Appointment = () => {
  return (
    <>
      <Hero title={"Schedule your Appointment | ZeeCare Medical Institute"} imageUrl={"signin.png"} />
      <AppointmentForm />
    </>
  )
}

export default Appointment
