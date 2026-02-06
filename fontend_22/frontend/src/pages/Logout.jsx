import React, { useState } from "react";
import axios from "axios";
import AlertBox from "../components/AlertBox";

axios.defaults.withCredentials = true;

const Logout = () => {
  const BASE_URL = "http://localhost:8080/user";

  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");

  const logoutUser = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/logout`);

      setAlertType("success");
      setAlertMsg(res.data.message || res.data);
    } catch (err) {
      setAlertType("error");
      setAlertMsg(err.response?.data || err.message);
    }
  };

  const deleteUser = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/delete`);

      setAlertType("success");
      setAlertMsg(res.data.message || res.data);
    } catch (err) {
      setAlertType("error");
      setAlertMsg(err.response?.data || err.message);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2 style={headingStyle}>Logout / Delete</h2>

        <button style={btnStyle} onClick={logoutUser}>
          Logout
        </button>

        <button style={deleteBtnStyle} onClick={deleteUser}>
          Delete Account
        </button>
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
  textAlign: "center",
};

const headingStyle = {
  marginBottom: "20px",
};

const btnStyle = {
  padding: "10px",
  border: "none",
  backgroundColor: "black",
  color: "white",
  cursor: "pointer",
  borderRadius: "6px",
  width: "100%",
  marginBottom: "12px",
};

const deleteBtnStyle = {
  padding: "10px",
  border: "none",
  backgroundColor: "red",
  color: "white",
  cursor: "pointer",
  borderRadius: "6px",
  width: "100%",
};

export default Logout;
