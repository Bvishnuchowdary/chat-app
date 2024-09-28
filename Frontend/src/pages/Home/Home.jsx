import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import MessageContainer from '../../components/messages/MessageContainer';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const url = 'http://localhost:8000/api/auth/logout';
      const response = await axios.post(url, {}, { withCredentials: true });

      if (response.status === 200) {
        console.log(response.data.message); // Assuming the response has a message property
        navigate('/login');
      } else {
        // Handle any other response status
        console.error('Logout failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='flex flex-col w-screen h-screen bg-white'>
      <header className='flex items-center justify-between p-4 bg-gray-200'>
        <h1 className='text-xl font-bold'>Home</h1>
        <button
          onClick={handleLogout}
          className='px-4 py-2 text-white bg-blue-600 rounded'
        >
          Logout
        </button>
      </header>
      <div className='flex flex-1'>
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
