import React, { useState } from "react";
import {
  AiOutlineCar,
  AiOutlineIdcard,
  AiOutlineSolution,
  AiFillFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import Wrapper from "../components/styled.components/Home";
import { useNavigate } from "react-router-dom";

const initialValues = {
  pickupDate: "",
  dropDate: "",
  pickupTime: "08",
  dropTime: "08",
};

const Home = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const { pickupDate, dropDate } = values;

    const day1 = new Date(pickupDate);
    const day2 = new Date(dropDate);
    const day = new Date();

    if (!pickupDate || !dropDate) {
      alert("Please provide dates...");
      return;
    }

    var days = (day2 - day1) / (1000 * 3600 * 24);
    if (days <= 0) {
      alert("Please provide correct dates...");
      return;
    }

    days = (day1 - day) / (1000 * 3600 * 24);
    if (days <= 0) {
      alert("Please provide proper Pickup Date...");
      return;
    }

    days = (day2 - day) / (1000 * 3600 * 24);
    if (days <= 0) {
      alert("Please provide porper Drop Date...");
      return;
    }

    if (pickupDate && dropDate) {
      const dates = JSON.stringify(values);
      console.log(dates);
      localStorage.setItem("dates", dates);
      navigate("/cars");
    }
  };

  return (
    <Wrapper>
      <div className="img-container">
        <section className="booking-date">
          <h2 className="quote">don't dream it, drive it!</h2>
          <div className="dates">
            <label htmlFor="pickup" className="label">
              Pick-up Date :
            </label>
            <input
              type="date"
              name="pickupDate"
              id="pickup"
              value={values.pickupDate}
              onChange={handleChange}
            />
            <label htmlFor="pickupTime" className="label">
              Time :
            </label>
            <select name="pickupTime" id="pickuptime" onChange={handleChange}>
              <option value="08">8:00</option>
              <option value="09">9:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
            </select>
          </div>
          <div className="dates">
            <label htmlFor="drop" className="label">
              Drop Date :
            </label>
            <input
              type="date"
              name="dropDate"
              id="drop"
              value={values.dropDate}
              onChange={handleChange}
            />
            <label htmlFor="dropTime" className="label">
              Time :
            </label>
            <select name="dropTime" id="droptime" onChange={handleChange}>
              <option value="8">8:00</option>
              <option value="9">9:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
            </select>
          </div>
          <button className="btn" onClick={handleSearch}>
            Search
          </button>
        </section>
      </div>
      <div className="cards-section">
        <h2>how it works ?</h2>
        <div className="cards">
          <section className="card">
            <AiOutlineSolution className="icon" />
            <h2>register with us</h2>
            <p>Register yourself on our website</p>
          </section>
          <section className="card">
            <AiOutlineCar className="icon" />
            <h2>select a car</h2>
            <p>Search the car which fits your needs</p>
          </section>
          <section className="card">
            <AiOutlineIdcard className="icon" />
            <h2>verify your driving license</h2>
            <p>
              Finally verify your driving license and pay the bill amount at
              time of delievery
            </p>
          </section>
        </div>
      </div>
      <div className="info-section">
        <h2>choose from wide variety of cars</h2>
        <section className="table-section">
          <table className="table">
            <th>car type</th>
            <th>passanger capacity</th>
            <th>ideal for</th>
            <tr>
              <td>Hatchback</td>
              <td>4</td>
              <td>comfortable for small families for smaller distance trips</td>
            </tr>
            <tr>
              <td>Sedan</td>
              <td>4-5</td>
              <td>comfortable for small families for longer trips</td>
            </tr>
            <tr>
              <td>SUV</td>
              <td>6-7</td>
              <td>premium trips with large families</td>
            </tr>
          </table>
        </section>
      </div>
      <footer className="footer">
        <div className="info">
          <div className="contact">
            <ul>
              <li onClick={() => navigate("/contactus")}>Contact us</li>
              <li>Terms &#38; Conditions</li>
              <li>About us</li>
            </ul>
          </div>
          <div className="follow">
            <p>Follow us at</p>
            <ul>
              <li>
                <a href="https://www.facebook.com" target="_blank">
                  <AiFillFacebook className="social" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com" target="_blank">
                  <AiOutlineInstagram className="social" />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com" target="_blank">
                  <AiOutlineTwitter className="social" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        Created my free logo at{" "}
        <a href="https://freelogo.me" target="_blank">
          FreeLogo.me
        </a>
        <p>&#169; copyright; Car Rental</p>
      </footer>
    </Wrapper>
  );
};

export default Home;
