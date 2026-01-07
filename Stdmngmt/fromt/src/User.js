import React, { useState } from 'react'
import { PiStudentFill } from "react-icons/pi";
import { FaBookReader } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { TiArrowForward } from "react-icons/ti";
import { GiNotebook } from "react-icons/gi";
import { FaPenClip } from "react-icons/fa6";
export const User = () => {
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
     <h1 className='icon'>  
      <TiArrowBack onClick={back}/>
      <PiStudentFill/>
      <TiArrowForward/>
    </h1>

    <div >
      <h1 className="user">LOGIN </h1>
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
        <button  type="submit" className='done'> <b>SUBMIT</b> </button>
        </form>
</div>
<div>
    <h1 className='usericon'>
    <GiNotebook/>
      <FaBookReader/>
      <FaPenClip/>
     </h1> 
    </div>
    </>
   
  )
}
