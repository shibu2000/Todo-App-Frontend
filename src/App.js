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

  //state variable for loader
  const [isLoading, setisLoading] = useState(false);

  //state vatriable for displaying message while loader in true
  const [executingMsg, setexecutingMsg] = useState("");

  if (authenticated === null || authenticated === false) {
    return (
      <LoginSignup
        setauthenticated={setauthenticated}
        setuserDetails={setuserDetails}
        isLoading={isLoading}
        executingMsg={executingMsg}
        setisLoading={setisLoading}
        setexecutingMsg={setexecutingMsg}
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
          element={
            <TodoDisplayBody
              userid={userDetails.userId}
              isLoading={isLoading}
              executingMsg={executingMsg}
              setisLoading={setisLoading}
              setexecutingMsg={setexecutingMsg}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
