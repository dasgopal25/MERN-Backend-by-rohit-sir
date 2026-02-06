import React, { useState } from "react";
import axios from "axios";
import AlertBox from "../components/AlertBox";

axios.defaults.withCredentials = true;

const Profile = () => {
  const BASE_URL = "http://localhost:8080/user";

  const [profile, setProfile] = useState(null);

  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");

  const getProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile`);
      setProfile(res.data);

      setAlertType("success");
      setAlertMsg("Profile fetched successfully ✅");
    } catch (err) {
      setAlertType("error");
      setAlertMsg(err.response?.data || err.message);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2 style={headingStyle}>Profile</h2>

        <button style={btnStyle} onClick={getProfile}>
          Get Profile
        </button>

        {profile && (
          <div style={profileBoxStyle}>
            <p>
              <b>Name:</b> {profile.fullname}
            </p>
            <p>
              <b>Email:</b> {profile.email}
            </p>
            <p>
              <b>Gender:</b> {profile.gender}
            </p>
          </div>
        )}
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
  marginBottom: "15px",
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

const profileBoxStyle = {
  marginTop: "15px",
  textAlign: "left",
  padding: "10px",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  border: "1px solid #ddd",
};

export default Profile;
