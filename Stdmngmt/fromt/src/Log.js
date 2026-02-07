import React, { useState, useEffect } from "react";
import "./log.css";
import { useNavigate } from "react-router-dom";

import photo from "./Image/photo.jpg";
import img from "./Image/img.webp";
import imag2 from "./Image/imag2.jpeg";

export const Log = () => {
  const navigate = useNavigate();

  const images = [photo, img, imag2];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(slider);
  }, []);

  return (
    <div className="home-page">
      <h1 className="main-title">
        Welcome To Student Management Database
      </h1>

      {/* IMAGE */}
      <div className="imgbox">
        <img src={images[index]} alt="student" />
      </div>

      {/* TEXT */}
      <p className="desc">
        Student management is the process of managing student data including
        personal information, grades and attendance.
          1. Tracking student data- Student management systems can track a student's workload, grades, attendance, health information,and more. <br></br> 2. Streamlining administrative work- Student management systems can help streamline administrative tasks for teachers. <br></br> 3. Improving communication- Student management systems can help improve communication between administrators, teachers, and the school community. <br></br>
      </p>

      {/* BUTTON */}
      <button onClick={() => navigate("/form")} className="login-btn">
        LOGIN
      </button>

      <p>
        Don't have an account?{" "}
        <span onClick={() => navigate("/form")} className="signup">
          Sign Up
        </span>
      </p>
    </div>
  );
};
