import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import loginSignupCSS from "./css/LoginSignup.module.css";

const Login = ({ setauthenticated, setuserDetails, setisLoading }) => {
  //=================For log into todo  list=================================
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  //=========================================================================

  //state variable for toggeling password from hidden to show and vise-versa
  const [inputType, setinputType] = useState("password");

  //state variable for changing the eye button from hidden to show and vise-versa
  const [isView, setisView] = useState(false);

  //When userclickes on login button loginUser() method will be invoked
  const loginUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email and password field cant be blanked");
    } else {
      setisLoading(true);
      await axios
        .post(`${process.env.REACT_APP_API_URL}/loginuser`, {
          email: email,
          password: password,
        })
        .then((result) => {
          setuserDetails({
            userId: result.data.id,
            userName: result.data.name,
          });
          setauthenticated(true);
          setisLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setisLoading(false);
          alert("Wrong email or password!! Try again");
        });
    }
  };
  return (
    <Form onSubmit={loginUser}>
      <Form.Group className={`mb-2`}>
        <Form.Label>
          Enter Your Email Id <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          className="rounded-0"
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
          autoComplete="on"
        />
      </Form.Group>
      <Form.Group className={`mb-2`}>
        <Form.Label>
          Enter Password
          <span className="text-danger">*</span>
        </Form.Label>
        <div className="d-flex">
          <Form.Control
            className="rounded-0 border-0"
            type={inputType}
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            required
            autoComplete="on"
          />
          <span
            className={`p-2 ${loginSignupCSS.view_icon}`}
            onClick={() => {
              isView ? setisView(false) : setisView(true);
              inputType === "password"
                ? setinputType("text")
                : setinputType("password");
            }}
          >
            {isView ? (
              <img src="./no-view.png" alt="no view" />
            ) : (
              <img src="./visibility.png" alt="view" />
            )}
          </span>
        </div>
      </Form.Group>
      <Form.Group className="text-center">
        <Button variant="success" type="submit" className={`px-5`}>
          Login
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Login;
