import React from "react";
import { useState } from "react";
import FormField from "../components/FormField";
import {
  Wrapper,
  Form,
  Button,
  Img,
} from "../components/styled.components/CarActions";
import axios from "axios";
import Message from "../components/Message";

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

const AddCar = () => {
  const [values, setValues] = useState(initialValues);
  const [message, setMessage] = useState("");
  const [isImage, setIsImage] = useState(false);

  const types = ["image/png", "image/jpeg", "image/jpg"];
  const handleChange = (e) => {
    if (e.target.name === "image") {
      let selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        setValues({ ...values, image: selected });
        setIsImage(true);
        console.log(values.image);
      } else {
        setIsImage(false);
        setMessage("Please provide png/jpg/jpeg format...");
        removeMessage();
      }
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
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
      !rent ||
      !image
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
    formData.append("carNumberPlate", number);

    try {
      setMessage("Loading...");
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.post(
        "http://localhost:5000/api/cars/create",
        formData,
        config
      );
      console.log("done");
      setMessage("Car added successfully...");
      setIsImage(false);
    } catch (err) {
      console.log("error");
      setMessage("Something went wrong...");
    }
    console.log("hello");
    setValues(initialValues);
    console.log("welcome");
    removeMessage();
  };

  const removeMessage = () => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <Wrapper>
      <Form id="form">
        <div className="message">{message && <Message value={message} />}</div>
        <div className="first-column">
          <FormField
            type="text"
            name="number"
            value={values.number}
            handleChange={handleChange}
          />
          <FormField
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
          <FormField
            type="text"
            name="type"
            value={values.type}
            handleChange={handleChange}
          />
          <FormField
            type="text"
            name="specs"
            value={values.specs}
            handleChange={handleChange}
          />
        </div>
        <div className="second-column">
          <FormField
            type="text"
            name="transmission"
            value={values.transmission}
            handleChange={handleChange}
          />
          <FormField
            type="text"
            name="mileage"
            value={values.mileage}
            handleChange={handleChange}
          />
          <FormField
            type="number"
            name="rent"
            value={values.rent}
            handleChange={handleChange}
          />
          <FormField type="file" name="image" handleChange={handleChange} />
        </div>
        <div className="image-btn">
          {isImage && <Img src={URL.createObjectURL(values.image)}></Img>}
          <Button onClick={onSubmit}>Upload</Button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddCar;
