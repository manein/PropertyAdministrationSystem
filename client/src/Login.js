import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './NavBar';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/login', { username, password });

      if (response.data.success) {
        alert('Login successful');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('Error Loging in!')
    }
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
