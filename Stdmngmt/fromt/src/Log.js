import React, { useState, useEffect } from "react";
import "./log.css";
import { useNavigate } from "react-router-dom";

import img1 from "../Image/photo.jpg";
import img2 from "../Image/img.webp";
import img3 from "../Image/imag2.jpeg";

export const Log = () => {
  const navigate = useNavigate();

  const images = [img1, img2, img3];
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
      <h1 style={{ textAlign: "center", fontSize: "70px" }}>
        Welcome To Student Management Database
      </h1>

      <div className="container">
        <div className="row">

          {/* IMAGE SLIDER */}
          <div
            className="imgbox"
            style={{ backgroundImage: `url(${images[index]})` }}
          ></div>

          {/* TEXT */}
          <div className="col m3">
            <h5 style={{ textAlign: "justify", fontSize: "21px" }}>
              Student management is the process of managing student data...
            </h5>
          </div>
        </div>
      </div>

      <button onClick={handleLoginClick}>LOGIN</button>

      <p>
        Don't have an account!
        <span
          onClick={() => navigate("/form")}
          style={{ color: "#009990", cursor: "pointer" }}
        >
          {" "}
          <b>Sign Up</b>
        </span>
      </p>
    </>
  );
};
