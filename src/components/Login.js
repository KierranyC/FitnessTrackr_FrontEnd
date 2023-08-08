import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

const Login = ({ setToken }) => {
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();

    await loginUser(username, password)
    const token = localStorage.getItem('token')
    setToken(token)
    if (token) {
      navigate('/myroutines')
    }
    else {
      alert('INCORRENT LOGIN DETAILS')
    }
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} required onChange={event => setUserame(event.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} required onChange={event => setPassword(event.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
      <Link to='/register'><button>Dont't have an account? Register now!</button></Link>
    </div>
  )
}

export default Login;