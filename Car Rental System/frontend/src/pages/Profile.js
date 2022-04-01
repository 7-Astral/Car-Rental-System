import React, { useEffect, useState } from "react";
import {
  Container,
  Wrapper,
  FormSection,
  ImgSection,
  H,
  Input,
  Label,
  Image,
  Button,
} from "../components/styled.components/Profile";
import Message from "../components/Message";
import Loading from "../components/Loading";
import axios from "axios";

const initialValues = {
  image: "",
  name: "",
  number: "",
  address: "",
  city: "",
};

function Profile() {
  const [values, setValues] = useState(initialValues);
  const [isUrl, setIsUrl] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const types = ["image/png", "image/jpg", "image/jpeg"];
  const handleChange = (e) => {
    if (e.target.name === "image") {
      let selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        setValues({ ...values, image: selected });
        setIsUrl(false);
      } else {
        setMessage("Please provide png/jpg/jpeg format...");
        removeMessage();
      }
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const getData = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `http://localhost:5000/api/users/pd/${userInfo.userId}`,
      config
    );
    console.log(data);
    setValues({
      ...values,
      image: data.UserImage,
      name: data.Name,
      email: data.Email,
      number: data.Phone,
      address: data.Address,
      city: data.City,
    });
    console.log(data);
    console.log(values);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!values.image || !values.address || !values.city) {
      setMessage("Please provide all details...");
      removeMessage();
      return;
    }
    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("Address", values.address);
    formData.append("City", values.city);
    console.log(values);
    console.log(formData);
    setMessage("Loading...");
    try {
      await axios.patch(
        `http://localhost:5000/api/users/detail/${userInfo.userId}`,
        formData,
        config
      );
      setMessage("Details updated successfully...");
      console.log("success");
    } catch (err) {
      setMessage("Something went wrong...");
      console.log("error");
    }
    removeMessage();
  };

  const removeMessage = () => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Wrapper>
          <ImgSection>
            <H>profile picture</H>
            <Image htmlFor="image">
              <img
                src={isUrl ? values.image : URL.createObjectURL(values.image)}
                alt="profile"
              ></img>
            </Image>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
            />
          </ImgSection>
          <FormSection>
            {message && <Message value={message} />}
            <H>user details</H>
            <div className="inputs">
              <Label htmlFor="name">name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="inputs">
              <Label htmlFor="email">email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="inputs">
              <Label htmlFor="number">phone number</Label>
              <Input
                type="tel"
                name="number"
                id="number"
                value={values.number}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="inputs">
              <Label htmlFor="address">address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={values.address}
                onChange={handleChange}
              />
            </div>
            <div className="inputs">
              <Label htmlFor="city">city</Label>
              <Input
                type="text"
                name="city"
                id="city"
                value={values.city}
                onChange={handleChange}
              />
            </div>
            <Button onClick={handleUpdate}>Update</Button>
          </FormSection>
        </Wrapper>
      )}
    </Container>
  );
}

export default Profile;
