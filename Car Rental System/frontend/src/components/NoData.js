import React from "react";

const Style = {
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
  textTransform: "capitalize",
  color: "var(--primaryColor1)",
  zIndex: "10",
};

function NoData({ value }) {
  return (
    <div style={Style}>
      <h1>{value}</h1>
    </div>
  );
}

export default NoData;
