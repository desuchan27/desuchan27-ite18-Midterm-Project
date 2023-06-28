import React, { useState } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import "../../App.css";
import App from "../../App";
import axios from "axios";
import { toast } from "react-toastify";

const initialUser = { email: "", password: "", username: "" };
const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const signUp = async () => {
    const url = "http://localhost:1337/api/auth/local/register";
    try {
      if (user.username && user.email && user.password) {
        const res = await axios.post(url, user);
        if (res) {
          setUser(initialUser);
          navigate("/login");
        }
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signUp();
  };

  return (
    <div className="sign">
      <header className="font-bold text-[100px] text-vanillaWhite fixed top-2 right-20">
        DOGE GALLERY
      </header>
      <form className="signForm" onSubmit={handleSubmit}>
        <h1 className="font-bold text-5xl mb-2">Sign Up</h1>

        <div className="input-container">
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleUserChange}
            placeholder="Username"
            className="border"
          />
        </div>

        <div className="input-container">
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleUserChange}
            placeholder="Email"
            className="border"
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleUserChange}
            placeholder="Password"
            className="border"
          />
        </div>

        <button type="submit">Sign up</button>

        <span style={{ fontSize: "13px" }}>for existing users</span>
        <button type="button">
          <Link to="/login">Login</Link>
        </button>
      </form>
    </div>
  );
};

export default Registration;
