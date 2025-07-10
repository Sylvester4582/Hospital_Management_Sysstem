import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Doctors from './pages/Doctors.jsx'
import Messages from './pages/Messages.jsx'
import AddNewDoctor from './pages/AddNewDoctor.jsx'
import AddNewAdmin from './pages/AddNewAdmin.jsx'
import Login from './pages/Login.jsx'
import Sidebar from './components/Sidebar.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main.jsx'
import axios from 'axios'
import './App.css'

const App = () => {

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/admin/me", {withCredentials: true});
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    } 
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/doctor/addnew' element={<AddNewDoctor />} />
          <Route path='/admin/addnew' element={<AddNewAdmin />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/doctors' element={<Doctors />} />
        </Routes>
        <ToastContainer position='top-center'/>
      </Router>
    </>
  )
}

export default App
