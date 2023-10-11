import React, { useState } from "react";
import loginCss from "./css/LoginSignup.module.css";
import Login from "./Login";
import Signup from "./Signup";
import Excecuting from "./Excecuting";

export const LoginSignup = ({
  setauthenticated,
  setuserDetails,
  isLoading,
  executingMsg,
  setisLoading,
  setexecutingMsg,
}) => {
  //state flag variable for switching login to create account and vice-versa
  const [isSignup, setisSignup] = useState(true);

  return (
    <div
      className="container d-flex  justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundImage: `url('./login.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Excecuting isLoading={isLoading} executingMsg={executingMsg} />
      <div
        className="card"
        style={{
          width: "28rem",
          // height: "18rem",
          backgroundColor: "rgba(0, 0, 255, 0.3)",
        }}
      >
        <div className="card-body">
          {isSignup ? (
            <Login
              setauthenticated={setauthenticated}
              setuserDetails={setuserDetails}
              setisLoading={setisLoading}
            />
          ) : (
            <Signup
              setisSignup={setisSignup}
              setisLoading={setisLoading}
              setexecutingMsg={setexecutingMsg}
            />
          )}
          <div className="text-center">
            <p className="m-0  p-0">or</p>
            <span
              className={`link-underline-success ${loginCss.create_account}`}
              onClick={() => {
                isSignup ? setisSignup(false) : setisSignup(true);
              }}
            >
              {isSignup ? "Login" : "Create Account"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
