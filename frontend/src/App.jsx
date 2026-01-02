import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';   // Home import kiya
import  Signup  from './pages/Signup';
import  Login  from './pages/Login';
import Homepageofchat from './pages/Homepageofchat';
import  Sidebar    from './components/Sidebar';
import Chat from "./components/Chat"
function App() {
  return (
    <Routes>
      {/* 1. Default Route */}
      <Route path="/" element={<Home />} />
      

      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path ="/homepageofchat" element={<Homepageofchat/>}/>
      <Route path = "/chat" element={<Chat/>}/>
      
      {/* 3. Galat URL par wapas Home par bhej dega */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}


export default App;