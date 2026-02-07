import React from "react";
import "./todo.css";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-card">
        <h1>To-Do List App</h1>
        <p>Stay organized. Stay productive.</p>

        <button onClick={() => navigate("/todo")}>
          Let's Start →
        </button>
      </div>
    </div>
  );
}


