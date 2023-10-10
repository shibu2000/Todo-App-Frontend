import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let loggedIn = localStorage.getItem("authenticated");
    console.log(loggedIn);
    if (loggedIn === false) {
      navigate("/login");
    }
  });

  return <Component />;
};

export default ProtectedRoute;
