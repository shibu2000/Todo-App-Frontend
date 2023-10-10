import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const Signup = ({ setisSignup }) => {
  //=================for creating account=================================
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  //state variable for full name
  const [fullName, setfullName] = useState("");

  //state variable to through and error message if the full name filed is blanked or contain only white space
  const [isfullName, setisfullName] = useState(false);

  //state variable to through and error message if the email filed is blanked or contain only white space
  const [isEmail, setisEmail] = useState(false);

  //state variable for confirm password
  const [confirmPWD, setconfirmPWD] = useState("");

  //state flag variable for checking if password patter matching or not
  //Password Must Have 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character
  const [isPWDPatternErr, setisPWDPatternErr] = useState(false);

  //state variable for showing message if confirm password is not match
  const [confirmPwdMsg, setconfirmPwdMsg] = useState("");

  //state variable for starting the countdown after successfully creating account
  const [loginCountDown, setloginCountDown] = useState();

  //state variable for showing the success message after succefull creating account
  const [ifLoginSuccess, setifLoginSuccess] = useState(false);

  //Password validation regex
  const PASSWORD_REGEX = new RegExp(
    "^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[^wd]).*$"
  );

  const createAcount = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://todo-app-backend-production-f95f.up.railway.app/createaccount`,
        {
          name: fullName,
          email: email,
          password: password,
        }
      )
      .then((result) => {
        //success
        let t = 5;
        setifLoginSuccess(true);
        let countInterval = setInterval(() => {
          setloginCountDown(t--);
          if (t < 0) {
            clearInterval(countInterval);
            setisSignup(true);
          }
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form onSubmit={createAcount}>
      <p
        className={`bg-warning p-2 rounded text-center ${
          ifLoginSuccess ? "" : "d-none"
        }`}
      >
        Signup Success, Redirected to Login Page...{loginCountDown}
      </p>
      <Form.Group className={`mb-2`}>
        <Form.Label>
          Enter Your Full Name <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          value={fullName}
          onChange={(e) => setfullName(e.target.value)}
          onBlur={() => {
            if (fullName.trim().length > 0) {
              setisfullName(false);
            } else {
              setisfullName(true);
              setfullName("");
            }
          }}
          required
        />
        <Form.Label
          className={`text-danger ${isfullName ? "" : "d-none"}`}
          style={{ fontSize: "12px" }}
        >
          Full Name Field Is Required
        </Form.Label>
      </Form.Group>
      <Form.Group className={`mb-2`}>
        <Form.Label>
          Enter Your Email Id <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          onBlur={() => {
            if (email.trim().length > 0) {
              setisEmail(false);
            } else {
              setisEmail(true);
              setemail("");
            }
          }}
          required
        />
        <Form.Label
          className={`text-danger ${isEmail ? "" : "d-none"}`}
          style={{ fontSize: "12px" }}
        >
          Email Field Is Required
        </Form.Label>
      </Form.Group>
      <Form.Group className={`mb-2`}>
        <Form.Label>
          Enter Password
          <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="Password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          onBlur={() => {
            PASSWORD_REGEX.test(password)
              ? setisPWDPatternErr(false)
              : setisPWDPatternErr(true);
          }}
          required
        />
        <Form.Label
          className={`text-danger ${isPWDPatternErr ? "" : "d-none"}`}
          style={{ fontSize: "12px" }}
        >
          Password Must Have 1 Uppercase, 1 Lowercase, 1 Number and 1 Special
          Character (Space Not Allowed)
        </Form.Label>
      </Form.Group>
      <Form.Group className={`mb-2`}>
        <Form.Label>
          Confirm Password <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="Password"
          value={confirmPWD}
          onChange={(e) => setconfirmPWD(e.target.value)}
          onBlur={() => {
            password !== confirmPWD
              ? setconfirmPwdMsg("Confirm Password Not Matched!!")
              : setconfirmPwdMsg("");
          }}
          required
        />
        <Form.Label className="text-danger">{confirmPwdMsg}</Form.Label>
      </Form.Group>
      <Form.Group className="text-center">
        <Button type="submit" className="btn btn-success">
          Create Account
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Signup;
