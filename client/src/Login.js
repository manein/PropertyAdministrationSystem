import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Make sure to install react-router-dom if not already done
import Navbar from './NavBar';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    setMessage(`Logging in as ${username}`);
  };

  return (
    <div className='page'>
        <Navbar />
    <div className="auth-form" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Login</h2>
      <div className='form-group'>
      <form>
        <label>
          Username:
          <input
            className='form-control'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            className='form-control'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className='btn btn-primary' type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p style={{ fontSize: 'small' }}>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
      <p>{message}</p>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
