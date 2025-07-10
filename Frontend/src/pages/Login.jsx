import React, { useContext, useState } from 'react'
import { Context } from '../main.jsx'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role: "Patient" },
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
    <div className='container form-component login-form'>
      <h2>Sign In</h2>
      <p>Please Login to Continue</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quae quaerat dolor, porro excepturi obcaecati!</p>

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

        <div style={{
          gap: "10px",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}>
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link to={"/register"} style={{ textDecoration: "none", alignItems: "center" }}>Register Now</Link>
        </div>

        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type='submit' style={{ cursor: "pointer" }}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
