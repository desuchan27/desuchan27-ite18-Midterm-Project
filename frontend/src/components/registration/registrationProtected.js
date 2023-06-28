import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../helpers";
import Registration from "./registration";

const RegistrationProtected = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  return isAuthenticated() ? null : <Registration />;
};

export default RegistrationProtected;
