import React, { useContext, useState } from 'react'
import { Context } from '../main.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigateTo = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role: "Admin" },
        {
          withCredentials: true, headers: { 'Content-Type': 'application/json' }
        });
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  if (isAuthenticated) {
    return navigateTo("/");
  }

  return (
     <div className='container form-component'>
      <img src="logo.png" alt="logo" className='logo' />
      <h1 className="form-title">Welcome to ZeeCare</h1>
      <p>Only admins are allowed to access these resources</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)}
          placeholder='Password'
        />

        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type='submit' style={{ cursor: "pointer" }}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
