import React from "react";
import img from "../images/not-found.svg";
import Wrapper from "../components/styled.components/Error";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate(-1);
  }, 2000);
  return (
    <Wrapper>
      <img src={img} alt="error404" className="img" />
      <p className="text">The page you are looking for is not found !!!!</p>
      <p className="text">Redirecting back to previous page...</p>
    </Wrapper>
  );
}

export default Error;
