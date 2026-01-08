import React, { useState } from 'react';
import './log.css';
import { PiStudentFill } from "react-icons/pi";
import { FaBookReader } from "react-icons/fa";
import { TiArrowBack, TiArrowForward } from "react-icons/ti";
import { GiNotebook } from "react-icons/gi";
import { FaPenClip } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const API_URL = "https://student-backend-mk29.onrender.com";

export const Form = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [course, setCourse] = useState('');

  const resetForm = () => {
    setName('');
    setAge('');
    setCourse('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !age.trim() || !course.trim()) {
      alert('Please fill in all the input fields.');
      return;
    }

    try {
      const result = await fetch(`${API_URL}/form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, course }),
      });

      const response = await result.json();
      console.log(response);

      if (result.ok) {
        alert('Form submitted successfully!');
        resetForm();
        navigate('/success'); // ✅ navigate ONLY after success
      } else {
        alert('Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error while submitting the form.');
    }
  };

  // Back to home
  const back = () => {
    window.location.href = '/';
  };

  return (
    <div>
      <h1 className='icon'>
        <TiArrowBack onClick={back} />
        <PiStudentFill />
        <TiArrowForward />
      </h1>

      <div className='formbox'>
        <h1 className='head'>NEW USER LOGIN HERE!!</h1>

        <form onSubmit={handleSubmit} className='form'>
          <label>
            <b>NAME:-</b>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </label>

          <br /><br />

          <label>
            <b>AGE:-</b>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
            />
          </label>

          <br /><br />

          <label>
            <b>COURSE:-</b>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Enter course"
            />
          </label>

          <br /><br />

          {/* ✅ BUTTON DOES NOT CALL handleSubmit AGAIN */}
          <button type="submit" className='done'>
            <b>SUBMIT</b>
          </button>
        </form>
      </div>

      <h1 className='iconend'>
        <GiNotebook />
        <FaBookReader />
        <FaPenClip />
      </h1>
    </div>
  );
};



