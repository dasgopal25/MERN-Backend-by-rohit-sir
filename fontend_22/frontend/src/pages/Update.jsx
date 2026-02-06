import React, { useState } from "react";
import axios from "axios";
import AlertBox from "../components/AlertBox";

axios.defaults.withCredentials = true;

const Update = () => {
  const BASE_URL = "http://localhost:8080/user";

  const [updateData, setUpdateData] = useState({
    fullname: "",
    gender: "",
  });

  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${BASE_URL}/update`, updateData);

      setAlertType("success");
      setAlertMsg(res.data.message || res.data);

      setUpdateData({
        fullname: "",
        gender: "",
      });
    } catch (err) {
      setAlertType("error");
      setAlertMsg(err.response?.data || err.message);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2 style={headingStyle}>Update User</h2>

        <form onSubmit={updateUser}>
          <input
            style={inputStyle}
            type="text"
            placeholder="New Full Name"
            value={updateData.fullname}
            onChange={(e) =>
              setUpdateData({ ...updateData, fullname: e.target.value })
            }
          />

          <select
            style={inputStyle}
            value={updateData.gender}
            onChange={(e) =>
              setUpdateData({ ...updateData, gender: e.target.value })
            }
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <button style={btnStyle}>Update</button>
        </form>
      </div>

      {/* AlertBox */}
      <AlertBox
        message={alertMsg}
        type={alertType}
        closeAlert={() => setAlertMsg("")}
      />
    </div>
  );
};

const containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f2f2f2",
};

const boxStyle = {
  border: "1px solid #ddd",
  padding: "25px",
  borderRadius: "12px",
  width: "400px",
  backgroundColor: "white",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid gray",
  outline: "none",
};

const btnStyle = {
  padding: "10px",
  border: "none",
  backgroundColor: "black",
  color: "white",
  cursor: "pointer",
  borderRadius: "6px",
  width: "100%",
};

export default Update;
