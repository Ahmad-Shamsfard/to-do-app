import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Auth.module.scss";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:4500/api/users/login", {
          email: formData.email,
          password: formData.password,
        });

        // Assume response contains user data
        onLogin(response.data.user);

        // Redirect to the home page
        navigate("/");
      } catch (error) {
        console.error("Error logging in:", error);
        if (error.response && error.response.data.message) {
          setErrorMessage(error.response.data.message); // Display server error message
        } else {
          setErrorMessage("Network error. Please check your connection.");
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.title}>Log In</h2>
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <div className={styles.error}>{errors.password}</div>}
          </div>
          <button className={styles.button} type="submit">
            Log In
          </button>
        </form>
        <p className={styles.text}>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
