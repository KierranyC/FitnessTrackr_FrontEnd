import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Navbar,
  //   RenderAllRoutines,
  Routines,
} from "./components";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [routines, setRoutines] = useState([]);
  //   const [loggedIn, setLoggedIn] = useState(false);
  // Decide if we want to add routines/activities as useStates for global use here - Might make sense since using on multiple pages

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // If we decide to use Logged in as a use state, good example! See above
  //   useEffect(() => {
  //     const storedToken = localStorage.getItem('token')
  //     console.log(storedToken)
  //     if (storedToken) {
  //       setToken(storedToken)
  //       setLoggedIn(true)
  //     }
  //   }, [token])
  //   const setAndStoreToken = (userToken) => {
  //     localStorage.setItem("token", userToken);
  //     setToken(userToken);
  //     if (userToken) {
  //       setLoggedIn(true);
  //     } else {
  //       setLoggedIn(false);
  //     }
  //   };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar token={token} setToken={setToken} />
        {/* <SearchBar /> */}
        <Routes>
          <Route path="/" element={<Routines setLoading={setLoading} />} />
          {/* <Route
          path="/Register" element=
          {<Register setToken={setToken} setLoading={setLoading} />}
          />
          <Route path="/Search" element={<Search />} />
          <Route
            path="/Login"
            element={<Login setToken={setToken} setLoading={setLoading} />}
          />
          <Route path="/Profile" element={<Profile />} /> */}
          {/* <Route
            path="/ViewPost/:postId"
            element={<ViewPost loading={loading} setLoading={setLoading} />}
          />
          <Route
            path="/MakePost"
            element={<MakePost setLoading={setLoading} />}
          />
          <Route
            path="/UpdatePost/:postId"
            element={<UpdatePost setLoading={setLoading} />}
          /> */}
        </Routes>
        {loading ? <Loading /> : null}
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
