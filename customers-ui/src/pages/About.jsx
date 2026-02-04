import React from 'react'
import Header from '../components/Header'
import AboutWelcome from '../components/AboutWelcome'
import History from '../components/History'
import Why from '../components/Why'

function About() {
  return (
    <section className='about'>
      <Header />
      <AboutWelcome />
      <History />
      <Why />
    </section>
  )
}

export default About