import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://student-backend-mk29.onrender.com";

export const View = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch records
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/view`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Toggle delete form
  const toggleDelete = () => {
    setShowForm(!showForm);
    setMessage("");
  };

  // Delete record
  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.delete(`${API_URL}/delete`, {
        data: { name: name.trim(), course: course.trim() },
      });

      setMessage(res.data.message);
      setName("");
      setCourse("");
      setShowForm(false);
      fetchData();
    } catch (err) {
      setMessage("Error deleting record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-page">
      <div className="view">
        {/* BACK */}
        <button onClick={() => window.history.back()} className="back-btn">
          ⬅ Back
        </button>

        {/* HEADER */}
        <div className="viewhead">
          <span>RECORDS ADDED TILL NOW</span>
          <button onClick={toggleDelete}>
            {showForm ? "Cancel" : "Delete Record"}
          </button>
        </div>

        {/* DELETE FORM */}
        {showForm && (
          <form onSubmit={handleDelete} className="delete-form">
            <input
              type="text"
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Deleting..." : "Confirm Delete"}
            </button>
          </form>
        )}

        {message && <p className="response-msg">{message}</p>}

        {/* ✅ ONE TABLE ONLY */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>AGE</th>
                <th>COURSE</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="3">No records found</td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.course}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
