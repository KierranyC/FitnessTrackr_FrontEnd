import React, { useState, useEffect } from "react";
import { registerUser } from "../api";
import { Link, useNavigate } from "react-router-dom";
const Register = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      return;
    }
    const registerData = async () => {
      try {
        const result = await registerUser(username, password);
        localStorage.setItem("token", result.token);
        setToken(result.token);
        setUsername("");
        setPassword("");
        if (result.token) {
          navigate("/myroutines");
        }
      } catch (error) {
        setErrorMessage("ERROR NO TOKEN");
        console.log(error);
      }
    };
    registerData();
  };
  return (
    <div className="register">
      <h1 className="register-title">Register</h1>
      <form className="Register-form" onSubmit={handleSubmit}>
        <label className="register-username">
          Username:
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
            className="register-username-input"
          />
        </label>
        <br />
        <label className="register-password">
          Password:
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            className="register-password-input"
          />
        </label>
        <br />
        <label className="register-confirm-password">
          Confirm Password:
          <input
            type="password"
            placeholder="Password Confirmation"
            value={passwordConfirmation}
            required
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            className="register-confirm-password-input"
          />
        </label>
        <br />
        <button type="submit" className="register-account-button">
          Register
        </button>
      </form>
      <Link to="/login" className="redirect-login">
        <button>Already have an account? Log in!</button>
      </Link>
      <div>{errorMessage}</div>
    </div>
  );
};
export default Register;