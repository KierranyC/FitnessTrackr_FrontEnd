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
  LoadingModal,
  Footer
} from "./components";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [userRoutines, setUserRoutines] = useState([]);


  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);



  return (
    <BrowserRouter>
      <div id="app">
        <div id='appDIV'>
          <Navbar token={token} setToken={setToken} />
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
              userRoutines={userRoutines} setUserRoutines={setUserRoutines} token={token} activities={activities} setActivities={setActivities}
              routines={routines} setRoutines={setRoutines} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
