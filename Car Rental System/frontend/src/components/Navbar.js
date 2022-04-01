import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import Nav from "./styled.components/Navbar";
import logo from "../images/free-logo.jpg";

const Navbar = () => {
  let navigate = useNavigate();
  const [showDropDown, setShowdropDown] = useState(false);

  const user = localStorage.getItem("user");
  const userInfo = JSON.parse(user);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Nav>
      <img src={logo} alt="logo" className="logo" />
      <button
        type="button"
        onClick={() => setShowdropDown(!showDropDown)}
        className="bars"
      >
        <FaBars />
      </button>
      <ul
        className={
          showDropDown ? "linksContainer showContainer" : "linksContainer"
        }
      >
        <li>
          <button
            onClick={() => {
              setShowdropDown(!showDropDown);
              navigate("/home");
            }}
            className="link"
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setShowdropDown(!showDropDown);
              navigate(`/profile/${userInfo.userId}`);
            }}
            className="link"
          >
            Profile
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setShowdropDown(!showDropDown);
              navigate("/contactus");
            }}
            className="link"
          >
            Contact Us
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setShowdropDown(!showDropDown);
              navigate("/bookings");
            }}
            className="link"
          >
            Bookings
          </button>
        </li>
      </ul>
      <button type="button" onClick={logout} className="logout-btn">
        <RiLogoutBoxLine />
      </button>
    </Nav>
  );
};

export default Navbar;
