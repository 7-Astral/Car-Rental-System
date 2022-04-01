import React, { useState, useEffect } from "react";
import { Modal, Button } from "../components/styled.components/Modal";
import { Wrapper } from "../components/styled.components/Car";
import { BsArrowRight } from "react-icons/bs";
import Loading from "../components/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues = {
  rating: "",
  review: "",
};

function Car() {
  const navigate = useNavigate();
  const [visibleM, setVisibleM] = useState(false);
  const [booked, setBooked] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [avgRating, setAvgRating] = useState("");
  const [disable, setDisable] = React.useState(false);

  const dates = JSON.parse(localStorage.getItem("dates"));
  const { pickupDate, dropDate, pickupTime, dropTime } = dates;
  const day1 = new Date(pickupDate);
  const day2 = new Date(dropDate);
  const days = Math.abs(day2 - day1) / (1000 * 3600 * 24);

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const car = JSON.parse(localStorage.getItem("car"));
  const {
    _id,
    carImage,
    carName,
    carRent,
    carType,
    carTransmission,
    carMilage,
  } = car;
  console.log(car);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true)
    const user = JSON.parse(localStorage.getItem("user"));
    const car = JSON.parse(localStorage.getItem("car"));
    const driv = 1;
    const rent = days * car.carRent;
    const pd = pickupDate + "T" + pickupTime + ":00:00";
    const dd1 = dropDate + "T" + dropTime + ":00:00";
    const startDate = pd;
    const endDate = dd1;
    const rentPrice = rent;
    const driver = driv;
    const users = user.userId;
    const cars = car._id;
    const dd = "2022-03-23";

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/rent/create",
        {
          startDate,
          endDate,
          rentPrice,
          driver,
          users,
          cars,
        },
        config
      );
      console.log(data);
      setBooked(!booked);
      
      setTimeout(() => {
        navigate(-2);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const getReviews = async () => {
    setLoading(true);
    try {
      axios.get(`http://localhost:5000/api/rate/rw/${_id}`).then((res) => {
        setReviews(res.data.reverse());
      });

      axios.get(`http://localhost:5000/api/rate/${_id}`).then((res) => {
        setAvgRating(res.data.AverageRate);
      });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleAdd = () => {
    const { rating, review } = values;
    const user = JSON.parse(localStorage.getItem("user"));

    if (rating === "") {
      alert("Please choose rating !!!");
    }
    if (review === "") {
      alert("Please write a review !!!");
    }

    setLoading(true);
    try {
      axios.post(
        "http://localhost:5000/api/rate/createRate",
        {
          rate: rating,
          review: review,
          users: user.userId,
          cars: _id,
        },
        config
      );
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      getReviews();
    }, 500);
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div>
      {visibleM && (
        <Modal>
          <div className="header">
            <h4>Confirmation</h4>
          </div>
          <div className="content">
            <p>
              {booked
                ? `You have successfully booked the ${carName} for ${pickupDate} to ${dropDate}. \nThank you for booking !!! \nYou can check your bookings in Bookings section.`
                : `Are you sure you want to rent ${carName} from ${pickupDate} to 
              ${dropDate} ?`}
            </p>
          </div>
          <div className="confirmation-btns">
            <Button disabled={disable}  onClick={handleSubmit}>Yes</Button>
            <Button
              onClick={() => {
                setVisibleM(!visibleM);
              }}
            >
              No
            </Button>
          </div>
        </Modal>
      )}
      {loading ? (
        <Loading />
      ) : (
        <Wrapper style={visibleM ? { opacity: "0.3" } : { opacity: "1" }}>
          <div className="container">
            <section className="info">
              <div className="image">
                <img src={carImage} alt={carName} />
              </div>
              <div className="details">
                <h4 className="header">{carName}</h4>
                <ul>
                  <li>
                    <p>
                      <span>Type : </span>
                      {carType}
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Transmission : </span>
                      {carTransmission}
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Mileage : </span>
                      {carMilage}
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Rent (per day) : </span>
                      &#8377;{carRent}
                    </p>
                  </li>
                </ul>
              </div>
            </section>
            <section className="booking">
              <h4 className="header">Booking Dates</h4>
              <div className="date-time">
                <div className="date">
                  {pickupDate} | {pickupTime}:00
                </div>
                <div className="symbol">
                  <BsArrowRight className="icon" />
                </div>
                <div className="date">
                  {dropDate} | {dropTime}:00
                </div>
              </div>
              <h4 className="header">Rent Breakdown</h4>
              <div className="calculation">
                <p>
                  {days} days x &#8377;{carRent}
                </p>
              </div>
              <div className="total">
                <p>Total = &#8377;{days * carRent}</p>
              </div>
              <Button onClick={() => setVisibleM(!visibleM)}>Confirm</Button>
            </section>
          </div>
          <div
            className={
              showAddReview ? "rate-reviews show-rate-reviews" : "rate-reviews"
            }
          >
            <section className="add-review">
              <h4
                className="header"
                onClick={() => setShowAddReview(!showAddReview)}
              >
                Add Review
              </h4>
              <div className="inputs">
                <div className="rating">
                  <label htmlFor="rating">
                    How much would you rate {carName} :
                  </label>
                  <select name="rating" id="rating" onChange={handleChange}>
                    <option value="">-</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="review">
                  <label htmlFor="review">Write a Review :</label>
                  <textarea
                    name="review"
                    id="review"
                    cols="30"
                    rows="10"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <Button className="btn" onClick={handleAdd}>
                Add
              </Button>
            </section>
          </div>
          <div className="reviews-container">
            <h4 className="header">Customer Reviews</h4>
            <p>Average Rating : {avgRating}</p>
            <div className="review-cards">
              {reviews.length > 0 ? (
                reviews.map((rev, index) => {
                  const { rate, review, users } = rev;
                  const { name } = users[0];
                  return (
                    <section key={index} className="review-card">
                      <div className="name">
                        <h4>{name}</h4>
                      </div>
                      <div className="rate">
                        <p>Rating : {rate}/5</p>
                      </div>
                      <div className="rev">
                        <p>{review}</p>
                      </div>
                    </section>
                  );
                })
              ) : (
                <div className="no-review">No Reviews Available</div>
              )}
            </div>
          </div>
        </Wrapper>
      )}
    </div>
  );
}

export default Car;
