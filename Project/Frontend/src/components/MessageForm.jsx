import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';

const MessageForm = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/api/v1/message/send",
        {
          firstName,
          lastName,
          email,
          phone,
          message
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then(res=>{
        toast.success(res.data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setMessage("");
      });
    } catch(error) {
      toast.error(error.response.data.message);
    };
  }
  return (
    <div className='container form-component message-form'>
      <h2>Send Us a Message</h2>
      <form onSubmit={handleMessage}>
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
            type="text" 
            placeholder='Phone Number' 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
          />
        </div>
        
        <textarea 
          rows={7} 
          placeholder='Message' 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <div style={{justifyContent: "center", alignItems: "center"}}>
          <button type='submit' style={{cursor: "pointer"}}>Send</button>
        </div>

      </form>
    </div>
  )
}

export default MessageForm
