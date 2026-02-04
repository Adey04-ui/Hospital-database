import React from 'react'
import Header from '../components/Header'
import ServicesComponent from '../components/ServicesComponent'

function Services({service, setService}) {
  return (
    <>
      <Header />
      <ServicesComponent service={service} setService={setService} />
    </>
  )
}

export default Services