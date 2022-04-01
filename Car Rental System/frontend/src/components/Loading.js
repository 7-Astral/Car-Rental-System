import React from "react";

const loadingStyle = {
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
  color: "var(--primaryColor1)",
  zIndex: "10",
};

function Loading() {
  return (
    <div style={loadingStyle}>
      <h1>Loading...</h1>
    </div>
  );
}

export default Loading;
