import React, { useState } from 'react';
import './log.css'
import { PiStudentFill } from "react-icons/pi";
import { FaBookReader } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { TiArrowForward } from "react-icons/ti";
import { GiNotebook } from "react-icons/gi";
import { FaPenClip } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
export const Form = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const [course, setCourse] = useState('');

  const stform = async () => {
    console.log(name, age,  course);

    try {
      const result = await fetch('http://localhost:3010/form', {
        method: 'POST',
        body:JSON.stringify({ name, age, course }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await result.json();
      console.log(response);

      if (result.ok) {
        alert('Form submitted successfully!');
        resetForm(); // Reset the form fields after successful submission
      } else {
        alert('Failed to submit the form. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  const resetForm = () => {
    setName('');
    setAge('');
   
    setCourse('');
  };

  // used to go back home page 
const back =()=>{
  window.location.href = '/'; 
}


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !age.trim() ||  !course.trim()) {
      alert('Please fill in all the input fields.');
      return;
    }
    else{
      navigate('/success')
    }
// trim used to remove blank space
    stform()
  };


  return (
    <>
    <div>

   
    <h1 className='icon'>  
      <TiArrowBack onClick={back}/>
      <PiStudentFill/>
      <TiArrowForward/>
    </h1>
     
   
    
    {/* form div */}
    <div  className='formbox'>
      <h1 className='head'>NEW USER LOGIN HERE!!</h1>
      <form onSubmit={handleSubmit} className='form'>
        <label>
          <b>NAME:-</b>

          &nbsp; &nbsp; &nbsp; &nbsp; 
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
          <b>AGE:-</b>

          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
          />
        </label>
        <br />
        <br />
        
        <label>
           <b>COURSE:-</b>
          &nbsp; &nbsp; 
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Enter course"
          />
        </label>
        <br />
        <br />
        <button  onClick={ handleSubmit}type="submit" className='done'> <b>SUBMIT</b> </button>
      </form>
    </div>
    <div>
    <h1 className='iconend'>
    <GiNotebook/>
      <FaBookReader/>
      <FaPenClip/>
     </h1> 
    </div>
    </div>
    </>
  );
};


