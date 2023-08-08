import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Navbar,
  Routines,
  Register,
  Login,
  MyRoutines,
  Activities,
  LoadingModal
} from "./components";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [userRoutines, setUserRoutines] = useState([]);
  // const [routinesWithActivity, setRoutinesWithActivity] = useState([]);
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
  // const setAndStoreToken = (userToken) => {
  //   localStorage.setItem("token", userToken);
  //   setToken(userToken);
  // if (userToken) {
  //   setLoggedIn(true);
  // } else {
  //   setLoggedIn(false);
  // }
  // };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar token={token} setToken={setToken} />
        {/* <SearchBar /> */}
        <Routes>
          <Route path="/" element={<Routines routines={routines} setRoutines={setRoutines} loading={loading} setLoading={setLoading} />} />
          <Route
            path="/register" element=
            {<Register setToken={setToken} setLoading={setLoading} />}
          />
          <Route path="/activities" element={<Activities activities={activities} setActivities={setActivities} loading={loading} setLoading={setLoading}
            token={token} />} />
          <Route
            path="/login"
            element={<Login setToken={setToken} setLoading={setLoading} />}
          />
          <Route path="/myroutines" element={<MyRoutines currentUser={currentUser} setCurrentUser={setCurrentUser} loading={loading} setLoading={setLoading}
            userRoutines={userRoutines} setUserRoutines={setUserRoutines} token={token} />} />
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
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
