import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Doctors from './pages/Doctors.jsx'
import Messages from './pages/Messages.jsx'
import AddNewDoctor from './pages/AddNewDoctor.jsx'
import AddNewAdmin from './pages/AddNewAdmin.jsx'
import Login from './pages/Login.jsx'
import Sidebar from './components/sidebar.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App = () => {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={Dashboard} />
          <Route path='/login' element={Login} />
          <Route path='/doctor/addnew' element={AddNewDoctor} />
          <Route path='/admin/addnew' element={AddNewAdmin} />
          <Route path='/messages' element={Messages} />
          <Route path='/doctors' element={Doctors} />
        </Routes>
      </Router>
    </>
  )
}

export default App
