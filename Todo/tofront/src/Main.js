import React from 'react'
import './todo.css'
import { GiThink } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { FaLongArrowAltDown } from "react-icons/fa";
export default function Main() {
  return (
    <div className="home-wrapper">
      <div className="home-card">

        <h1 className="home-title">To-Do List App</h1>

        <p className="home-desc">
          To-do lists increase productivity, help manage time,
          organize tasks and reduce mental clutter.
          Create your own task list and stay focused.
        </p>

        <button className="start-btn">
          Let's Start →
        </button>

      </div>
    </div>
  );
}
