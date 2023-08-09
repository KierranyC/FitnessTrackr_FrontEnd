import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import CommonButtons from "./Common/CommonButtons";
const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const buttonStyles = {
    fontSize: 12,
    fontWeight: 700,
    color: "darkred",
    border: "2px solid black",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      return;
    }
    const loginData = async () => {
      try {
        const result = await loginUser(username, password);
        localStorage.setItem("token", result.token);
        setToken(result.token);
        setUsername("");
        setPassword("");
        if (result.token) {
          navigate("/myroutines");
        } else {
          setErrorMessage("INCORRECT LOGIN DETAILS!");
        }
      } catch (error) {
        setErrorMessage("INCORRECT LOGIN DETAILS!");
        setUsername("");
        setPassword("");
        console.log(error);
      }
    };
    loginData();
  };
  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <CommonButtons
          size="small"
          variant="contained"
          sx={buttonStyles}
          type="submit"
        >
          Login
        </CommonButtons>
      </form>
      <Link to="/register">
        <CommonButtons
          size="small"
          variant="contained"
          sx={buttonStyles}
          type="submit"
        >
          Dont't have an account? Register now!
        </CommonButtons>
      </Link>
      <div>{errorMessage}</div>
    </div>
  );
};
export default Login;






