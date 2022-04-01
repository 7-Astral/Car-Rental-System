import React, { useState } from "react";
import FormField from "../components/FormField";
import {
  Wrapper,
  Form,
  Button,
} from "../components/styled.components/CarActions";
import Message from "../components/Message";
import axios from "axios";

function DeleteCar() {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!number) {
      setMessage("Please Enter Car Number...");
      removeMessage();
      return;
    }
    console.log(number);
    try {
      setMessage("Loading...");
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.delete(
        `http://localhost:5000/api/cars/${number}`,
        config
      );
      setMessage("Car Deleted Successfully...");
      setNumber("");
    } catch (err) {
      console.log("error");
      setMessage("No such Car exsists...");
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
        <div className="no-column">
          <FormField
            type="text"
            name="number"
            value={number}
            handleChange={handleChange}
          />
        </div>
        <div className="image-btn">
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </Form>
    </Wrapper>
  );
}

export default DeleteCar;
