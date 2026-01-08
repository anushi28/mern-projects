import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://student-backend-mk29.onrender.com";

export const View = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Fetch records
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/view`);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Toggle delete form
  const handleDeleteClick = () => {
    setShowForm(!showForm);
    setResponseMessage("");
  };

  // Delete record
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`${API_URL}/delete`, {
        data: { name, course },
      });

      setResponseMessage(response.data.message);
      setName("");
      setCourse("");
      setShowForm(false);
      fetchData(); // ✅ refresh table
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Error deleting record"
      );
    }
  };

  // Back button
  const back = () => {
    window.history.back();
  };

  return (
    <div className="view">
      {/* 🔙 BACK BUTTON */}
      <button
        onClick={back}
        style={{ marginBottom: "20px", padding: "8px 16px" }}
      >
        ⬅ Back
      </button>

      <p className="viewhead">
        RECORDS ADDED TILL NOW
        <button onClick={handleDeleteClick} style={{ marginLeft: "20px" }}>
          {showForm ? "Cancel" : "Delete Record"}
        </button>
      </p>

      {showForm && (
        <form onSubmit={handleFormSubmit} style={{ marginTop: "20px" }}>
          <label>
            NAME:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <br />

          <label>
            COURSE:
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />
          </label>

          <br />
          <button type="submit">Confirm Delete</button>
        </form>
      )}

      {responseMessage && <p>{responseMessage}</p>}

      {/* TABLE */}
      {data.map((item) => (
        <table key={item._id} style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>NAME</th>
              <th>AGE</th>
              <th>COURSE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.course}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};
