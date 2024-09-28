import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GenderCheckbox from './GenderCheckbox';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderChange = (gender) => {
    setFormData({
      ...formData,
      gender: gender,
    });
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
	if (formData.password !== formData.confirmPassword) {
	  setError('Passwords do not match');
	  return;
	}
	try {
	  const response = await axios.post('http://localhost:8000/api/auth/signup', {
		fullname: formData.fullName,
		username: formData.username,
		password: formData.password,
		confirmpassword: formData.confirmPassword,
		gender: formData.gender,
	  }, { withCredentials: true });
	  if (response.status === 201) {
		navigate('/login');
	  } else {
		setError('Signup failed');
	  }
	} catch (error) {
	  console.error('Signup error:', error.response ? error.response.data : error.message);
	  setError('Signup failed');
	}
  };
  

  return (
    <div className='flex flex-col items-center justify-center mx-auto min-w-96'>
      <div className='w-full p-6 bg-gray-400 bg-opacity-0 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'>ChatApp</span>
        </h1>

        {error && <p className='text-red-500'>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label className='p-2 label'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type='text'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              placeholder='John Doe'
              className='w-full h-10 input input-bordered'
              required
            />
          </div>

          <div>
            <label className='p-2 label'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              placeholder='johndoe'
              className='w-full h-10 input input-bordered'
              required
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter Password'
              className='w-full h-10 input input-bordered'
              required
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm Password'
              className='w-full h-10 input input-bordered'
              required
            />
          </div>

		  <div className="mt-4">
			
      <label className="block text-gray-700">Gender</label>
      <div className="mt-2 space-x-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="gender"
            value="male"
            
            onChange={(e) => handleGenderChange(e.target.value)}
            className="form-radio"
          />
          <span className="ml-2">Male</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="gender"
            value="female"
            
            onChange={(e) => handleGenderChange(e.target.value)}
            className="form-radio"
          />
          <span className="ml-2">Female</span>
        </label>
      </div>
    </div>
          <Link to='/login' className='inline-block mt-2 text-sm hover:underline hover:text-blue-600'>
            Already have an account?
          </Link>

          <div>
            <button type='submit' className='mt-2 border btn btn-block btn-sm border-slate-700'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
