import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Topbar from './components/Topbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import About from './pages/About'
import Services from './pages/Services'
import Faqs from './pages/Faqs'
import Resources from './pages/Resources'
import Contact from './pages/Contact'
import ScrollToTop from './components/ScrollToTop'

function App() {
  
  const [service, setService] = useState('gynaecology')

  return (
    <>
      <ScrollToTop />
      <Topbar />
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/faqs' element={<Faqs />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/services' element={<Services service={service} setService={setService} />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
