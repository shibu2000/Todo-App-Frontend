import React from "react";
import { NavLink } from "react-router-dom";

export const Header = ({ setauthenticated, userName }) => {
  const logout = () => {
    setauthenticated(false);
  };
  return (
    <nav className="navbar bg-light">
      <div className="container d-flex">
        <NavLink to="/" className="navbar-brand" href="#">
          <img
            src={"./checklist.png"}
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          TODO LIST
        </NavLink>
        <div>
          <NavLink to="/about" className="btn border-0">
            About
          </NavLink>
          <NavLink className="btn border-0" onClick={logout}>
            Logout
          </NavLink>
          <div
            className="p-1 bg-success d-inline-block text-center"
            style={{ borderRadius: "50%", height: "40px", width: "40px" }}
            title={userName}
          >
            {userName[0]}
          </div>
        </div>
      </div>
    </nav>
  );
};
