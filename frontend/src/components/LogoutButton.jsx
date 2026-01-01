import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import "../components/LogoutButton.css"

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔹 agar login data hai to clear
    localStorage.clear();

    // 🔹 home page pe redirect
    navigate("/");
  };

  return (
    <div className='log' onClick={handleLogout}>
      <BiLogOut className="btnstyle" />
    </div>
  )
}

export default LogoutButton;
