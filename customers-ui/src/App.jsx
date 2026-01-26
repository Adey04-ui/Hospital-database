import {  } from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Topbar from './components/Topbar'

function App() {

  return (
    <>
      <Topbar />
      <Navbar />
      <Routes>
        <Route path='/' element={<h1>Customer UI</h1>} />
      </Routes>
    </>
  )
}

export default App
