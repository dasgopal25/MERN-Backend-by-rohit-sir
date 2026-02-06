import React from "react";

const AlertBox = ({ message, type, closeAlert }) => {
  if (!message) return null;

  return (
    <div style={overlayStyle}>
      <div
        style={{
          ...alertStyle,
          borderColor: type === "error" ? "red" : "green",
        }}
      >
        <h3 style={{ color: type === "error" ? "red" : "green" }}>
          {type === "error" ? "Error ❌" : "Success ✅"}
        </h3>

        <p>{message}</p>

        <button style={btnStyle} onClick={closeAlert}>
          OK
        </button>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const alertStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "350px",
  textAlign: "center",
  border: "2px solid",
};

const btnStyle = {
  marginTop: "15px",
  padding: "8px 20px",
  border: "none",
  backgroundColor: "black",
  color: "white",
  cursor: "pointer",
  borderRadius: "5px",
};

export default AlertBox;
