import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Login.css';

const Login = () => {
  const navigate = useNavigate();

  // 🔹 NEW STATES
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    // 🔹 form se data nikala
    const formData = new FormData(event.target);
    const { username, password } = Object.fromEntries(formData.entries());

    try {
      setLoading(true);

      //  BACKEND LOGIN API CALL
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      //  if  login fail
      if (!res.ok) {
        setError(result.message || "Invalid credentials");
        return;
      }

      //  LOGIN SUCCESS
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/homepageofchat");

    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePass = (inputId, iconId) => {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (input.type === "password") {
      input.type = "text";
      icon.className = "fa-solid fa-eye eye-icon";
    } else {
      input.type = "password";
      icon.className = "fa-solid fa-eye-slash eye-icon";
    }
  };

  return (
    <div className="login-page">
      <div className="outer-glow-box">
        <div className="inner-form-box">
          <div className="header-text">
            <h1>Login <span>ConnectX</span></h1>
            <p>Welcome Back, Agent</p>
          </div>

          <form className="allbox" onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="pill-input"
              required
            />

            <div className="pass-wrapper">
              <input
                type="password"
                id="lp1"
                name="password"
                placeholder="Password"
                className="pill-input"
                required
              />
              <i
                className="fa-solid fa-eye-slash eye-icon"
                id="le1"
                onClick={() => togglePass('lp1', 'le1')}
              ></i>
            </div>

            {/*  ERROR MESSAGE */}
            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "LOGIN"}
            </button>

            <p className="footer-link">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                style={{ cursor: "pointer", color: "#00d2ff", fontWeight: "bold" }}
              >
                Signup
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
