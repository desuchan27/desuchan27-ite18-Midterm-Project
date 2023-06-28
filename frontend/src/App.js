import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./components/login/login";
import Registration from "./components/registration/registration";
import Home from "./components/home/home";
import Logout from "./components/logout/logout";
import { Protector } from "./helpers";
import SingleDog from "./components/singleDog/SingleDog";
import RegistrationProtected from "./components/registration/registrationProtected";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protector
                Component={Home}
                fallbackPath="/login"
                redirectToLogin={true}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/registration"
            element={<RegistrationProtected />}
          />{" "}
          {/* Use 'element' prop */}
          <Route
            path="/home"
            element={
              <Protector
                Component={Home}
                fallbackPath="/login"
                redirectToLogin={true}
              />
            }
          />
          <Route path="/SingleDog/:name" element={<SingleDog />} />
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
