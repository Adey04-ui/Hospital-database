import React from 'react'
import Header from '../components/Header'
import ServicesComponent from '../components/ServicesComponent'
import Reviews from '../components/Reviews'

function Services({service, setService}) {
  return (
    <>
      <Header />
      <ServicesComponent service={service} setService={setService} />
      <Reviews />
    </>
  )
}

export default Services