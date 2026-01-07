import React, { useState } from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
export const Create = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const back =()=>{
    window.location.href = '/'; 
  }
  const checkPasswordMatch = () => {
    if (password === confirmPassword) {
      alert("Passwords match!");
      return true;
    } else {
      alert("Passwords do not match!");
      return false;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    checkPasswordMatch(); // Validate the passwords
  };
  return (
    <>
    <div  className='register'>
      <IoArrowBackSharp onClick={back}/> &nbsp;&nbsp;
     <span> <b>REGISTRATION</b>
     </span>
     <h2>Create a free account</h2>
    </div>
     <form  className='form' action="" onSubmit={handleSubmit} >
        <label>
          <b>NAME:-</b>

          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </label>
        <br />
        <br />
        <label>
          <b>PASSWORD:-</b>

          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
          <input
            type="password"
            id="password"
            value={password}
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
           
          />
        </label>
        <br></br>
        <br/>
        <label> <b>VERIFY PASSWORD:-</b></label>
        &nbsp; &nbsp;
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            placeholder='Re-Enter your password'
            onChange={(e) => setConfirmPassword(e.target.value)}
           
          />
        <br />
        <br />
        <button  type="submit" className='btn'> <h2>SUBMIT</h2> </button>
        </form>
    </>
  )
}
