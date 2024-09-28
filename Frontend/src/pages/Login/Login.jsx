import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        username,
        password,
      },{ withCredentials: true});
      localStorage.setItem('token', response.data.token);
      navigate("/dashboard") // Redirect to the dashboard
    } catch (error) {
      // Handle login error
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mx-auto min-w-96'>
      <div className='w-full p-6 bg-gray-900 bg-opacity-0 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg'>
        <h1 className='text-3xl font-semibold text-center text-gray-900'>
          Login
          <span className='text-blue-500'> ChatApp</span>
        </h1>

        <form onSubmit={handleLogin}>
          <div>
            <label className='p-2 label'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='Enter username'
              className='w-full h-10 input input-bordered'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full h-10 input input-bordered'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className='mt-2 text-red-600'>
              {error}
            </div>
          )}

          <Link to='/signup' className='inline-block mt-2 text-sm hover:underline hover:text-blue-600'>
            {"Don't"} have an account?
          </Link>

          <div>
            <button type='submit' className='mt-2 btn btn-block btn-sm'>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
