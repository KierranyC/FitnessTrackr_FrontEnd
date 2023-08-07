import React, { useState, useEffect } from 'react';


const Login = ({ setToken }) => {
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    await userLogin(username, password)
    const token = localStorage.getItem('token')
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