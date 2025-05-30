import React from 'react'
import "./App.css"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Appointment from './pages/Appointment.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/appointment" element={<Appointment/>} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
