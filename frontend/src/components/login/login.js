import React, { useState, useEffect } from "react";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { storeUser, userData, isAuthenticated } from "../../helpers";
import axios from "axios";

const initialUser = { password: "", identifier: "" };

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = "http://localhost:1337/api/auth/local";
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        if (data.jwt) {
          storeUser(data);
          toast.success("Logged in successfully", { hideProgressBar: true });
          setUser(initialUser);
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="sign">
      <header className="font-bold text-[100px] text-vanillaWhite fixed top-2 right-20">
        DOGE GALLERY
      </header>

      <form className="signForm">
        <h1 className="font-bold text-5xl mb-2">Welcome</h1>

        <div className="input-container">
          <input
            className="border"
            type="email"
            name="identifier"
            value={user.identifier}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="input-container">
          <input
            className="border"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>

        <button className="submit" onClick={handleLogin}>
          Login
        </button>

        <span style={{ fontSize: "13px" }}>for new users</span>
        <button type="button">
          <Link to="/registration">Create new account</Link>
        </button>
      </form>
    </div>
  );
};

export default Login;
