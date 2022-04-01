import React from "react";
import styles from "../css/Landing.module.css";
import Image from "../images/car.png";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  let navigate = useNavigate();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.infoContainer}>
        <h3>
          Car <span>Rental</span> App
        </h3>
        <p>
        Enjoy self-drive car rental experience with friends and family. Rent a car in Nadiad for shopping, travel, daily commute, and outstation travel.
        </p>
        <btn onClick={() => navigate("/login")} className={styles.btn}>
          Login/Register
        </btn>
      </div>
      <div className={styles.imageContainer}>
        <img src={Image} alt="logo" />
      </div>
    </div>
  );
};

export default Landing;
