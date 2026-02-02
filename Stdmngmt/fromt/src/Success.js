import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PiStudentFill } from "react-icons/pi";
import { FaBookReader } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { TiArrowForward } from "react-icons/ti";
import { GiNotebook } from "react-icons/gi";
import { FaPenClip } from "react-icons/fa6";
export const Success = () => {
  const navigate = useNavigate()
  const click = ()=>{
navigate('/view')
  }
  const back =()=> {
    window.location.href = '/form'; 
  }
  return (
    <>
    <div className="success-page">
    <h1 className='icon'>  
      <TiArrowBack onClick={back}/>
      <PiStudentFill/>
      <TiArrowForward/>
    </h1>
    <div className='success'> <h1>Record Added Successfuly!!</h1> </div>
    <button onClick={click}>View Record</button>

    <div>
    <h1 className='successicon'>
    <GiNotebook/>
      <FaBookReader/>
      <FaPenClip/>
     </h1> 
    </div>
    </div>
    </>
  )
}
