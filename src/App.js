// import logo from "./logo.svg";
import "./App.css";
import About from "./MyComponent/About";
import { Header } from "./MyComponent/Header";
import { LoginSignup } from "./MyComponent/LoginSignup";
import { NotFound } from "./MyComponent/NotFound";
import { TodoDisplayBody } from "./MyComponent/TodoDisplayBody";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [userDetails, setuserDetails] = useState({
    userId: "",
    userName: "",
  });

  const [authenticated, setauthenticated] = useState(null);

  if (authenticated === null || authenticated === false) {
    return (
      <LoginSignup
        setauthenticated={setauthenticated}
        setuserDetails={setuserDetails}
      />
    );
  }

  return (
    <BrowserRouter>
      <Header
        setauthenticated={setauthenticated}
        userName={userDetails.userName}
      />
      <Routes>
        {/* <Route path="/login" element={<LoginSignup setuserid={setuserid} />} /> */}
        <Route
          index
          element={<TodoDisplayBody userid={userDetails.userId} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
