import React, { useContext, useState } from 'react'
import { Context } from '../main.jsx'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/patient/register",
        { firstName, lastName, email, phone, dob, gender, password, confirmPassword },
        {
          withCredentials: true, headers: { 'Content-Type': 'application/json' }
        });
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  if (isAuthenticated) {
    return navigateTo("/");
  }

  return (
    <div className='container form-component register-form'>
      <h2>Sign Up</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium totam quam impedit nisi vitae alias?</p>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            placeholder='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <input
            type="date"
            placeholder='Date of Birth'
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <select value={gender} onChange={(e) => setGender(e.target.value)} >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <input
            type="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div style={{
          gap: "10px",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}>
          <p style={{ marginBottom: 0 }}>Already Registered?</p>
          <Link to={"/login"} style={{ textDecoration: "none", alignItems: "center" }}>Login Now</Link>
        </div>

        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type='submit' style={{ cursor: "pointer" }}>Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register
