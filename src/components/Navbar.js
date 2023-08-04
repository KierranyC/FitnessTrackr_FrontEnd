import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  // Button,
  // TextField,
  Link,
} from "@mui/material";

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    // alert("You are now Logged out!");
    console.log("You are now Logged out!");

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Login");
    }
  };

  return (
    <div id="mainNav">
      <div id="navbartitle">
        Fitness Tracker
        <div id="navbarlink">
          <Link component={RouterLink} to="/" underline="hover">
            Routines
          </Link>
          <Link
            component={RouterLink}
            to="/Activities"
            underline="hover"
            color="red"
          >
            Activities
          </Link>
          {token ? ( // remember to come back and finalize LINKs
            <Link component={RouterLink} to="/MyRoutines" underline="hover">
              My Routines
            </Link>
          ) : null}
          {!token ? (
            <Link
              component={RouterLink}
              to="/Login"
              underline="hover"
              color="red"
            >
              Login
            </Link>
          ) : null}
          {!token ? (
            <Link
              component={RouterLink}
              to="/Register"
              underline="hover"
              color="red"
            >
              Register
            </Link>
          ) : null}
          {token ? (
            <a id="logout" onClick={logout}>
              Logout?
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
