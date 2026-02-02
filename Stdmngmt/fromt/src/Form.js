import React, { useState } from "react";
import "./log.css";
import { PiStudentFill } from "react-icons/pi";
import { FaBookReader } from "react-icons/fa";
import { TiArrowBack, TiArrowForward } from "react-icons/ti";
import { GiNotebook } from "react-icons/gi";
import { FaPenClip } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const API_URL = "https://student-backend-mk29.onrender.com";

export const Form = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age || !course) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, course }),
      });

      if (res.ok) {
        navigate("/success");
      } else {
        alert("Failed to submit form");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const back = () => {
    window.location.href = "/";
  };

  return (
    <div className="form-page">
      <h1 className="icon">
        <TiArrowBack onClick={back} />
        <PiStudentFill />
        <TiArrowForward />
      </h1>

      <div className="formbox">
        <h1 className="head">ADD NEW STUDENT</h1>

        <form onSubmit={handleSubmit} className="form">
          <label>
            <b>NAME:</b>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </label>

          <label>
            <b>AGE:</b>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              required
            />
          </label>

          <label>
            <b>COURSE:</b>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Enter course"
              required
            />
          </label>

          <button type="submit" className="done" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <h1 className="iconend">
        <GiNotebook />
        <FaBookReader />
        <FaPenClip />
      </h1>
    </div>
  );
};
