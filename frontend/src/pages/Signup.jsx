import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Signup.css';

const Signup = () => {
  const navigate = useNavigate();

  // 🔹 error / loading state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const { fullname, username, password, confirmPassword, gender } = data;
    const fullName = fullname;
    // 🔴 Password match check
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // 🔥 BACKEND API CALL
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Signup failed");
        return;
      }

      // ✅ SUCCESS
      alert("Signup successful! Please login.");
      navigate("/login");

    } catch (err) {
      setError("Server error. Try again later.");
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
    <div className="signup-page">
      <div className="outer-glow-box">
        <div className="inner-form-box">
          
          {/* 🔷 Header */}
          <div className="header-text">
            <h1>Signup <span>ConnectX</span></h1>
            <p>Access Secure Gateway</p>
          </div>

          {/* 🔷 Signup Form */}
          <form className="allbox" onSubmit={handleSignup}>
            
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              className="pill-input"
              required
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              className="pill-input"
              required
            />

            {/* 🔹 Gender */}
            <select
              name="gender"
              className="pill-input"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {/* 🔹 Password */}
            <div className="pass-wrapper">
              <input
                type="password"
                id="p1"
                name="password"
                placeholder="Password"
                className="pill-input"
                required
              />
              <i
                className="fa-solid fa-eye-slash eye-icon"
                id="e1"
                onClick={() => togglePass('p1', 'e1')}
              ></i>
            </div>

            {/* 🔹 Confirm Password */}
            <div className="pass-wrapper">
              <input
                type="password"
                id="p2"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="pill-input"
                required
              />
              <i
                className="fa-solid fa-eye-slash eye-icon"
                id="e2"
                onClick={() => togglePass('p2', 'e2')}
              ></i>
            </div>

            {/* ❌ Error message */}
            {error && <p className="error-text">{error}</p>}

            {/* 🔹 Submit */}
            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Signing up..." : "SIGNUP"}
            </button>

            {/* 🔹 Login redirect */}
            <p className="footer-link">
              Already have an account?{" "}
              <span
                onClick={() => navigate('/login')}
                style={{ cursor: 'pointer', color: '#00d2ff', fontWeight: 'bold' }}
              >
                Login
              </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
