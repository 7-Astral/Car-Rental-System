import React, { useState, useEffect } from "react";
import { Wrapper } from "../components/styled.components/Rents";
import { Modal, Button } from "../components/styled.components/Modal";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BsArrowDown } from "react-icons/bs";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import axios from "axios";

function Rents() {
  const [rent, setRent] = useState([]);
  const [visibleM, setVisibleM] = useState(false);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const getData = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      axios
        .get(`http://localhost:5000/api/rent/${user.userId}`, config)
        .then((res) => {
          const data = res.data;
          console.log(data.reverse());
          setRent(data);
        });
      console.log(rent);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    const rent = JSON.parse(localStorage.getItem("rent"));
    const id = rent._id;
    console.log(id);

    try {
      axios.delete(`http://localhost:5000/api/rent/${id}`, config);
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setVisibleM(!visibleM);
      getData();
    }, 1000);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {visibleM && (
            <Modal>
              <div className="header">
                <h4>Confirmation</h4>
              </div>
              <div className="content">
                <p>Are you sure you want to cancel this booking ?</p>
              </div>
              <div className="confirmation-btns">
                <Button onClick={handleCancel}>Yes</Button>
                <Button
                  onClick={() => {
                    setVisibleM(!visibleM);
                    localStorage.removeItem("rent");
                  }}
                >
                  No
                </Button>
              </div>
            </Modal>
          )}
          {rent.length === 0 ? (
            <NoData value="no bookings done yet !!!" />
          ) : (
            <Wrapper style={visibleM ? { opacity: "0.3" } : { opacity: "1" }}>
              <div className="container">
                <h2>{rent.length} records found</h2>
                {rent.map((rent, index) => {
                  const { startDate, endDate, rentPrice, cars } = rent;
                  const { carName, carImage, carNumberPlate } = cars[0];
                  const day1 = new Date(startDate);
                  const day2 = new Date(endDate);
                  const currentDate = new Date();

                  const days1 = (day1 - currentDate) / (1000 * 3600 * 24);
                  const days2 = (day2 - currentDate) / (1000 * 3600 * 24);

                  return (
                    <section
                      key={index}
                      className="card"
                      style={
                        days1 > 0 || days2 > 0
                          ? { background: "white" }
                          : { background: "#999" }
                      }
                    >
                      <img src={carImage} alt={carName} className="image" />
                      <div className="car-details">
                        <h2>{carName}</h2>
                        <p>
                          <span>Car Number :</span> {carNumberPlate}
                        </p>
                        <p>
                          <span>Total Amount :</span> &#8377;{rentPrice}
                        </p>
                      </div>
                      <div className="rent-details">
                        <p>
                          {startDate.slice(0, 10)} |{" "}
                          {parseInt(startDate.slice(11, 13)) + 6 + ":00"}
                        </p>
                        <BsArrowDown className="icon" />
                        <p>
                          {endDate.slice(0, 10)} |{" "}
                          {parseInt(endDate.slice(11, 13)) + 6 + ":00"}
                        </p>
                      </div>
                      <div className="btn-section">
                        {days1 > 0 && (
                          <button
                            className="btn"
                            onClick={() => {
                              setVisibleM(!visibleM);
                              localStorage.setItem(
                                "rent",
                                JSON.stringify(rent)
                              );
                            }}
                          >
                            <MdOutlineDeleteForever />
                          </button>
                        )}
                      </div>
                    </section>
                  );
                })}
              </div>
            </Wrapper>
          )}
        </div>
      )}
    </div>
  );
}

export default Rents;
