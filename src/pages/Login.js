import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginfailure, loginStart, loginSuccess } from "../redux/userRedux";
import { publicRequest } from "../requestMethod";
import { Alert } from "@mui/material";

function Login() {
  const dispatch = useDispatch();
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [showAlert, setshowAlert] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/user/login", {
        username,
        password,
      });
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginfailure());
      setshowAlert(true);
      setTimeout(() => {
        setshowAlert(false);
      }, 2000);
    }
  };
  return (
    <>
      {showAlert && (
        <Alert
          style={{
            position: "absolute",
            top: "5em",
            left: "45em",
          }}
          severity="error">
          Login Credentials are incorrect.
        </Alert>
      )}
      <div
        className="container-fluid"
        style={{
          background: "linear-gradient(to top, #fbc2eb 0%, #a18cd1 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingLeft: "0%",
        }}>
        <div className="container signin-container">
          <div className="sign-image"></div>
          <div className="container reg-content" style={{ color: "white" }}>
            <h3>Registration Form</h3>
            <form
              action=""
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: "20px",
                marginTop: "36px",
                height: "312px",
              }}>
              <div className="mb-3 form-input">
                <input
                  type="text"
                  className="form-controll"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3 form-input">
                <input
                  type="password"
                  className="form-controll"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-login btn-primary mt-3"
                onClick={(e) => handleSubmit(e)}>
                Submit
              </button>
              <p style={{ paddingTop: "10px" }}>
                Create Account{" "}
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Register.
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
