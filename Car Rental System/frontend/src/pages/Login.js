import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import FormField from "../components/FormField";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import styles from "../css/Login.module.css";

const initialValues = {
  name: "",
  password: "",
  email: "",
  phone: "",
  isMember: true,
  isAdmin: false,
};

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [message, setMessage] = useState("");

  const toggleRequest = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const toggleAdmin = () => {
    setValues({ ...values, isAdmin: !values.isAdmin });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const removeMessage = () => {
      setTimeout(() => {
        setMessage("");
      }, 2000);
    };

    const { name, password, email, phone, isMember, isAdmin } = values;

    setMessage("Loading...");
    if (isAdmin || isMember) {
      //login
      var endPoint;
      console.log(isMember);
      console.log(isAdmin);

      if (isAdmin) {
        endPoint = "admin";
      } else {
        endPoint = "users";
      }
      console.log(endPoint);

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          `http://localhost:5000/api/${endPoint}/login`,
          {
            email,
            password,
          },
          config
        );
        // console.log(data);
        setMessage("Log in Successful...");
        if (endPoint === "admin") {
          localStorage.setItem("admin", JSON.stringify(data));
        } else {
          localStorage.setItem("user", JSON.stringify(data));
        }
      } catch (error) {
        console.log("error");
        setMessage("Please Provide correct values...");
      }
    } else {
      //register
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/users/signup",
          {
            name,
            email,
            phone,
            password,
          },
          config
        );
        console.log(data);

        setMessage("User Created Successful...");
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.log("error");
        setMessage("Please Provide correct values...");
      }
    }
    removeMessage();
  };

  let userInfo = localStorage.getItem("user");
  let adminInfo = localStorage.getItem("admin");
  useEffect(() => {
    if (adminInfo) {
      return navigate("/admin");
    } else if (userInfo) {
      return navigate("/home");
    }
  }, [userInfo, adminInfo]);

  return (
    <div className={styles.formContainer} onSubmit={onSubmit}>
      <form className={styles.loginForm}>
        <h3>
          {values.isAdmin
            ? "Admin Login"
            : values.isMember
            ? "Login"
            : "Register"}
        </h3>
        {message && <Message value={message} />}
        {!values.isAdmin && !values.isMember && (
          <FormField
            type="text"
            name="name"
            value={values.username}
            handleChange={handleChange}
          />
        )}
        <FormField
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {!values.isAdmin && !values.isMember && (
          <FormField
            type="text"
            name="phone"
            value={values.phone}
            handleChange={handleChange}
          />
        )}
        <FormField
          type="Password"
          name="password"
          values={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className={styles.submitBtn}>
          {values.isMember ? "Log In" : "Register"}
        </button>
        <p className={styles.text}>
          {values.isAdmin
            ? ""
            : values.isMember
            ? "Not a member ? "
            : "Already a member ? "}
          <span onClick={toggleRequest}>
            {values.isAdmin ? "" : values.isMember ? "Register" : "Login"}
          </span>
        </p>
        <p className={styles.text}>
          <span onClick={toggleAdmin}>
            {values.isMember &&
              (values.isAdmin ? "login as user" : "login as admin")}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
