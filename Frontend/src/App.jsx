import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login/Login'
import SignUp from './pages/signup/Signup'
import Home from './pages/Home/Home'
import { Route,Routes } from 'react-router-dom'


function App() {
  

  return (
    <div className='flex items-center justify-center h-screen p-4'>
      <Routes>
        <Route path="/dashboard" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>

      
    </div>
  )
}


export default App
