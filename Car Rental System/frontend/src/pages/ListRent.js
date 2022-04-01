import React, { useEffect, useState } from "react";
import { Wrapper } from "../components/styled.components/ListRent";
import { BsArrowDown } from "react-icons/bs";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import axios from "axios";

function ListRent() {
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    setLoading(true);
    try {
      axios
        .get(`http://localhost:5000/api/rent/getrent`, config)
        .then((res) => {
          setRents(res.data.reverse());
          console.log(res.data);
          console.log(rents);
        });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : rents.length === 0 ? (
        <NoData value="no records are available !!!" />
      ) : (
        <Wrapper>
          <h2 className="header">{rents.length} records found</h2>
          {rents.map((rent, index) => {
            const { startDate, endDate, rentPrice, cars, users } = rent;
            const {carName,carImage,carNumberPlate }= cars[0];
            const { name, email, phone } = users[0];

            return (
              <section key={index} className="card">
                <div className="image">
                  <img src={carImage} alt={carName} />
                </div>
                <div className="car-details">
                  <h2 className="header">{carName}</h2>
                  <p>
                    <span>Car Number : </span>
                    {carNumberPlate}
                  </p>
                </div>
                <div className="renter-details">
                  <h2 className="header">Renter Details</h2>
                  <p>
                    <span>Renter Name : </span>
                    {name}
                  </p>
                  <p>
                    <span>Email : </span>
                    {email}
                  </p>
                  <p>
                    <span>Phone Number : </span>
                    {phone}
                  </p>
                </div>
                <div className="rent-details">
                  <h2 className="header">Rent Details</h2>
                  <p>
                    {startDate.slice(0, 10)} |{" "}
                    {parseInt(startDate.slice(11, 13)) + 6 + ":00"}
                  </p>
                  <BsArrowDown className="icon" />
                  <p>
                    {endDate.slice(0, 10)} |{" "}
                    {parseInt(endDate.slice(11, 13)) + 6 + ":00"}
                  </p>
                  <p>
                    <span>Rent Amount : </span>&#8377;{rentPrice}
                  </p>
                </div>
              </section>
            );
          })}
        </Wrapper>
      )}
    </div>
  );
}

export default ListRent;
