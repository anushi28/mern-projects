import React from 'react'

import './log.css'
import { useNavigate } from 'react-router-dom'

export const Log = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/form"); // Redirect to the form page
  };
  return (
    <>
   
   <h1 style={{ textAlign: 'center', fontSize: '70px' }}> Welcome To Student Management Database</h1>
   <div class="container">
      <div class="row">
   
        <div class="col m5" className='imgbox'>
        
        </div>

        {/* Button Column */}
        <div class="col m3">
            <h5 style={{ textAlign: 'justify' , fontSize: '21px'}}>Student management is the process of managing student data, including personal information, grades, attendance, and health information, for a school or educational institution. Student management systems, also known as student information systems (SIS). <br></br>
            Student management systems can help with a variety of tasks, including:- <br></br>
1. Tracking student data-
Student management systems can track a student's workload, grades, attendance, health information,and more.  <br></br>
2. Streamlining administrative work-
Student management systems can help streamline administrative tasks for teachers. <br></br>
3. Improving communication-
Student management systems can help improve communication between administrators, teachers, and the school community. <br></br>


            </h5>
      
           

        </div>
      </div>
    </div>

    <button 
       onClick={handleLoginClick}
     
    >
      LOGIN
    </button>

    <p>Don't have an account! <a href='/user'  style={{color:'rgb(0, 153, 144)'}}> <b>Sign Up </b></a></p>

  
    </>
  )
}