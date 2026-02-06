import React, { useState } from "react";
import axios from "axios";
import AlertBox from "../components/AlertBox";

axios.defaults.withCredentials = true;

const Login = () => {
  const BASE_URL = "http://localhost:8080/user";

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/login`, loginData);

      setAlertType("success");
      setAlertMsg(res.data.message || res.data);

      setLoginData({
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
        <h2 style={headingStyle}>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            style={inputStyle}
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />

          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />

          <button style={btnStyle}>Login</button>
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

export default Login;
