import React, { useState, useEffect } from "react";
import {
  H2,
  H3,
  Div,
  Section,
  Card,
  P,
  Img,
} from "../components/styled.components/ListCar";
import Loading from "../components/Loading";
import NoData from "../components/NoData";

function ListCar() {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(false);
    const response = await fetch("http://localhost:5000/api/cars/getcar");
    const data = await response.json();
    setCarData(data);
    console.log(data);
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
      ) : carData.length === 0 ? (
        <NoData value="no car data uploaded yet !!!" />
      ) : (
        <div>
          <H2>car details</H2>
          <H3>{carData.length} cars found</H3>
          <Div>
            {carData.map((car) => {
              return (
                <Section>
                  <Card>
                    <div className="image">
                      <Img src={car.carImage} alt={car.carName} />
                    </div>
                    <div className="details">
                      <P>Name : {car.carName}</P>
                      <P>Car Number : {car.carNumberPlate}</P>
                      <P>Type : {car.carType}</P>
                      <P>Transmission : {car.carTransmission}</P>
                      <P>Rent : &#8377;{car.carRent}</P>
                    </div>
                  </Card>
                </Section>
              );
            })}
          </Div>
        </div>
      )}
    </div>
  );
}

export default ListCar;
