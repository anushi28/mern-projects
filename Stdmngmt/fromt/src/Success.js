import React from "react";
import { useNavigate } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";
import { FaBookReader } from "react-icons/fa";
import { TiArrowBack, TiArrowForward } from "react-icons/ti";
import { GiNotebook } from "react-icons/gi";
import { FaPenClip } from "react-icons/fa6";

export const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <h1 className="icon">
        <TiArrowBack onClick={() => navigate("/form")} />
        <PiStudentFill />
        <TiArrowForward />
      </h1>

      <div className="success">
        <h1>Record Added Successfully!!</h1>
      </div>

      <button onClick={() => navigate("/view")}>View Record</button>

      <h1 className="successicon">
        <GiNotebook />
        <FaBookReader />
        <FaPenClip />
      </h1>
    </div>
  );
};
