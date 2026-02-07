import React, { useState, useEffect } from "react";
import "./log.css";
import { useNavigate } from "react-router-dom";

/* 🔴 IMPORT IMAGES FROM SRC */
import photo from "../Image/photo.jpg";
import img from "../Image/img.webp";
import imag2 from "../Image/imag2.jpeg";

export const Log = () => {
  const navigate = useNavigate();

  /* image slider */
  const images = [photo, img, imag2];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLoginClick = () => {
    navigate("/form");
  };

  return (
    <>
      <h1 style={{ textAlign: "center", fontSize: "60px" }}>
        Welcome To Student Management Database
      </h1>

      <div className="container">
        <div className="row">

          {/* IMAGE BOX */}
          <div
            className="imgbox"
            style={{ backgroundImage: `url(${images[index]})` }}
          ></div>

          {/* TEXT */}
          <div className="col m3">
            <h5 style={{ textAlign: "justify", fontSize: "20px" }}>
              Student management is the process of managing student data,
              including personal information, grades, attendance...
            </h5>
          </div>
        </div>
      </div>

      <button onClick={handleLoginClick}>LOGIN</button>

      <p>
        Don't have an account?
        <span
          onClick={() => navigate("/form")}
          style={{ color: "#00a69c", cursor: "pointer" }}
        >
          <b> Sign Up</b>
        </span>
      </p>
    </>
  );
};
