import {  } from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Topbar from './components/Topbar'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Topbar />
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
    </>
  )
}

export default App
