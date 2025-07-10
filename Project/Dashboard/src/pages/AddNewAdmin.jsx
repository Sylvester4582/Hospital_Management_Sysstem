import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddNewAdmin = () => {
  const { isAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/admin/addnew",
        { firstName, lastName, email, phone, dob, gender, password, confirmPassword },
        {
          withCredentials: true, headers: { 'Content-Type': 'application/json' }
        });
      toast.success(response.data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  if(!isAuthenticated) {  
      return navigateTo("/login");
  }

  return (
    <>
      <section className="page">
        <div className='container form-component add-admin-form'>
          <img src="/logo.png" alt="logo" className='logo' />
          <h1 className='form-title'>ADD NEW ADMIN</h1>
          <form onSubmit={handleAddNewAdmin}>
            <div>
              <input
                type="text"
                placeholder='First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                placeholder='Phone Number'
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
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <button type='submit' style={{ cursor: "pointer" }}>Add New Admin</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default AddNewAdmin
