import React, { useState, useEffect } from "react";
import {
  Wrapper,
  Filter,
  CarList,
  Car,
  H,
  P,
  Img,
  Button,
} from "../components/styled.components/Cars";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialValues = {
  search: "",
  rent: 1000,
  type: "",
};

function Cars() {
  const navigate = useNavigate();
  const [carData, setCarData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    console.log(carData);
    const newData = carData.filter((car) => {
      return (
        car.carName.toLowerCase().includes(values.search.toLowerCase()) &&
        car.carRent >= 1000 &&
        days * car.carRent <= values.rent &&
        car.carType.toLowerCase().includes(values.type.toLowerCase())
      );
    });
    setFilteredData(newData);
  };

  const handleReset = () => {
    setValues({ ...initialValues });
    setFilteredData(carData);
  };

  const getData = async (e) => {
    // const formData = new FormData();
    //formData.append("from_date", pickupDate);
    //formData.append("to_date", dropDate);
    setLoading(true);
    const data = await axios.post(
      "http://localhost:5000/api/rent/availablecar",
      {
        from_date: pickupDate,
        to_date: dropDate,
      },
      config
    );
    setFilteredData(data.data);
    setCarData(data.data);
    console.log(data.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Wrapper>
          <div className="filters">
            <Filter>
              <div className="search">
                <h2>name</h2>
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Car Name"
                  value={values.search}
                  onChange={handleChange}
                />
              </div>
              <div className="rent">
                <h2>rent</h2>
                <input
                  type="range"
                  name="rent"
                  id=""
                  min="1000"
                  max={days * 5000}
                  value={values.rent}
                  onChange={handleChange}
                />
                <p>&#8377;{values.rent}</p>
              </div>
              <div className="radios">
                <h2 style={{ textAlign: "center", width: "100%" }}>car type</h2>
                <div className="radio-input">
                  <input
                    type="radio"
                    name="type"
                    id="Hatchback"
                    value="Hatchback"
                    onChange={handleChange}
                  />
                  <label htmlFor="Hatchback">Hatchback</label>
                </div>
                <div className="radio-input">
                  <input
                    type="radio"
                    name="type"
                    id="Sedan"
                    value="Sedan"
                    onChange={handleChange}
                  />
                  <label htmlFor="Sedan">sedan</label>
                </div>
                <div className="radio-input">
                  <input
                    type="radio"
                    name="type"
                    id="SUV"
                    value="SUV"
                    onChange={handleChange}
                  />
                  <label htmlFor="SUV">SUV</label>
                </div>
              </div>
              <div className="btns">
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleReset}>Reset</button>
              </div>
            </Filter>
          </div>
          <CarList>
            {filteredData.map((car, index) => {
              return (
                <Car key={index}>
                  <div className="info">
                    <H>{car.carName}</H>
                    <div className="microInfo">
                      <P>Type : {car.carType}</P>
                      <P>
                        Rent : &#8377;{days * car.carRent} (for {days} days)
                      </P>
                    </div>
                    <Button
                      onClick={() => {
                        const rentCar = JSON.stringify(car);
                        localStorage.setItem("car", rentCar);
                        navigate(`/car/${car._id}`);
                      }}
                    >
                      view details
                    </Button>
                  </div>
                  <Img src={car.carImage} alt={car.Name} />
                </Car>
              );
            })}
          </CarList>
        </Wrapper>
      )}
    </div>
  );
}

export default Cars;
