import React from "react";
import { useState } from "react";
import FormField from "../components/FormField";
import {
  Wrapper,
  Form,
  Button,
  Img,
} from "../components/styled.components/CarActions";
import Message from "../components/Message";
import axios from "axios";
let caroldnumber;
const initialValues = {
  number: "",
  name: "",
  type: "",
  specs: "",
  transmission: "",
  mileage: "",
  rent: "",
  image: "",
};

function EditCar() {
  const [values, setValues] = useState(initialValues);
  const [found, setFound] = useState(false);
  const [message, setMessage] = useState("");
  const [isUrl, setIsUrl] = useState(true);
  const [isImage, setIsImage] = useState(true);

  const types = ["image/png", "image/jpg", "image/jpeg"];
  const handleChange = (e) => {
    if (e.target.name === "image") {
      let selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        setValues({ ...values, image: selected });
        setIsImage(true);
        setIsUrl(false);
      } else {
        setIsImage(false);
        setMessage("Please provide png/jpg/jpeg format...");
        removeMessage();
      }
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!values.number) {
      setMessage("Please Enter Car Number...");
      removeMessage();
      return;
    }

    try {
      setMessage("Loading...");
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log(values.number);
      caroldnumber=values.number;
      const { data } = await axios.get(
        `http://localhost:5000/api/cars/${values.number}`,
        config
      );
      console.log(data);
      values.name = data.car.carName;
      values.type = data.car.carType;
      values.specs = data.car.carSpecs;
      values.transmission = data.car.carTransmission;
      values.mileage = data.car.carMilage;
      values.rent = data.car.carRent;
      values.image = data.car.carImage;
      console.log(values);
      setFound(!found);
      setMessage("Car details fetched successfully...");
    } catch (err) {
      console.log("error");
      setMessage("No such Car exists...");
    }
    removeMessage();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { number, name, type, specs, transmission, mileage, rent, image } =
      values;

    if (
      !name ||
      !number ||
      !type ||
      !specs ||
      !transmission ||
      !mileage ||
      !rent
    ) {
      setMessage("Please Provide all values...");
      removeMessage();
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("carName", name);
    formData.append("carType", type);
    formData.append("carSpecs", specs);
    formData.append("carTransmission", transmission);
    formData.append("carMilage", mileage);
    formData.append("carRent", rent);
    formData.append("carNumberPlate",number);

    try {
      setMessage("Loading...");
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.patch(
        `http://localhost:5000/api/cars/${caroldnumber}`,
        formData,
        config
      );
      console.log("done");
      setMessage("Record updated successfully...");
      setFound(!found);
      setValues(initialValues);
      setIsUrl(true);
    } catch (err) {
      setMessage("Something went wrong...");
    }
    removeMessage();
  };

  const removeMessage = () => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <Wrapper>
      <Form>
        <div className="message">{message && <Message value={message} />}</div>
        <div className={found ? "first-column" : "no-column"}>
          <FormField
            type="text"
            name="number"
            value={values.number}
            handleChange={handleChange}
          />
          {found && (
            <FormField
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
          )}
          {found && (
            <FormField
              type="text"
              name="type"
              value={values.type}
              handleChange={handleChange}
            />
          )}
          {found && (
            <FormField
              type="text"
              name="specs"
              value={values.specs}
              handleChange={handleChange}
            />
          )}
        </div>
        <div className="second-column">
          {found && (
            <FormField
              type="text"
              name="transmission"
              value={values.transmission}
              handleChange={handleChange}
            />
          )}
          {found && (
            <FormField
              type="number"
              name="mileage"
              value={values.mileage}
              handleChange={handleChange}
            />
          )}
          {found && (
            <FormField
              type="number"
              name="rent"
              value={values.rent}
              handleChange={handleChange}
            />
          )}
          {found && (
            <FormField type="file" name="image" handleChange={handleChange} />
          )}
        </div>
        <div className="image-btn">
          {found && isImage && (
            <Img
              src={isUrl ? values.image : URL.createObjectURL(values.image)}
              alt="car"
            />
          )}
          {found ? (
            <Button type="button" onClick={handleUpdate}>
              Update
            </Button>
          ) : (
            <Button type="button" onClick={handleSearch}>
              Search
            </Button>
          )}
        </div>
      </Form>
    </Wrapper>
  );
}

export default EditCar;
