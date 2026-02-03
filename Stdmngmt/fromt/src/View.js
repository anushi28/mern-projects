import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://student-backend-mk29.onrender.com";

export const View = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

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

  // ✅ DELETE BY ID
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this record?");
    if (!confirm) return;

    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      setMessage("Record deleted successfully");
      fetchData();
    } catch (err) {
      setMessage("Error deleting record");
    }
  };

  return (
    <div className="view-page">
      <div className="view">
        {/* BACK */}
        <button onClick={() => window.history.back()} className="back-btn">
          ⬅ Back
        </button>

        <div className="viewhead">
          <span>RECORDS ADDED TILL NOW</span>
        </div>

        {message && <p className="response-msg">{message}</p>}

        {/* TABLE */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>AGE</th>
                <th>COURSE</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="4">No records found</td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.course}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
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

