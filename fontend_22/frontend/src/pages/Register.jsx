import React, { useState } from "react";
import axios from "axios";
import AlertBox from "../components/AlertBox";

axios.defaults.withCredentials = true;

const Register = () => {
  const BASE_URL = "http://localhost:8080/user";

  const [registerData, setRegisterData] = useState({
    fullname: "",
    gender: "",
    email: "",
    password: "",
  });

  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/register`, registerData);

      setAlertType("success");
      setAlertMsg(res.data.message || res.data);

      setRegisterData({
        fullname: "",
        gender: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setAlertType("error");
      setAlertMsg(err.response?.data || err.message);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2 style={headingStyle}>Register</h2>

        <form onSubmit={handleRegister}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Full Name"
            value={registerData.fullname}
            onChange={(e) =>
              setRegisterData({ ...registerData, fullname: e.target.value })
            }
          />

          <select
            style={inputStyle}
            value={registerData.gender}
            onChange={(e) =>
              setRegisterData({ ...registerData, gender: e.target.value })
            }
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            style={inputStyle}
            type="email"
            placeholder="Email"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
          />

          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
          />

          <button style={btnStyle}>Register</button>
        </form>
      </div>

      {/* AlertBox Component */}
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

export default Register;
