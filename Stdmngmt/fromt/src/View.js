import React, { useEffect, useState } from "react";
import axios from "axios";

export const View = () => {
  const [data, setData] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Toggle Form Visibility
  const handleDeleteClick = () => {
    setShowForm(!showForm); // Toggle form display
    setResponseMessage(""); // Clear any previous messages
  };

  // Handle Form Submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete("http://localhost:3010/delete", {
        data: { name, course },
      });
      setResponseMessage(response.data.message);
      setName(""); // Clear the form
      setCourse("");
      setShowForm(false); // Hide form after deletion
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Error deleting record"
      );
    } }

  useEffect(() => {
    // Fetch data from the backend
   axios
      .get("http://localhost:3010/view")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div  className="view">
        <div>    <p className="viewhead">RECORDS ADDED TILL NOW
        <button onClick={handleDeleteClick} >
        {showForm ? "Cancel" : "Delete Record"}
      </button>

            </p> 
        
        
      

      {showForm && (
        <form onSubmit={handleFormSubmit} style={{ marginTop: "20px" }}>
          <label>
            NAME:
            &nbsp;&nbsp; &nbsp;&nbsp;
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
    </div>
      
      {data.map((item) => (
          
            <table key={item._id} >
                <thead>
                    <tr >
                        <th>NAME</th>
                        <th>AGE</th>
                        <th>COURSE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td >{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.course}</td>
                    </tr>
                </tbody>
            </table>
            
          
        ))}
     
    </div>
  );
}



