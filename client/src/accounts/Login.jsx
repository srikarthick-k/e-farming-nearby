import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

// CSS
import "../style.css";

// MUI
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChange = (event) => {
    setEmail(
      event.target.value.replace(/"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"/, "")
    );
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      console.log(response.status);
      if (result.city && result.id) {
        localStorage.setItem("defaultDistrict", result.city, "uid", result.id);
        localStorage.setItem("uid", result.id);
      }
      response.status === 200
        ? (window.location = `/category`)
        : alert("Login credentials are wrong!!!");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <center>
        <form onSubmit={onSubmitLogin}>
          <h1>Login</h1>
          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Email address"
              type="text"
              value={email}
              onChange={emailChange}
              maxLength={50}
              sx={{ m: 2 }}
              required
            />
          </div>
          <br />
          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Password"
              type="password"
              value={password}
              onChange={passwordChange}
              maxLength={255}
              sx={{ m: 2 }}
              required
            />
          </div>
          <br />
          <div>
            <Button variant="outlined" type="submit" sx={{ m: 2 }}>
              SUBMIT
            </Button>
          </div>
        </form>
        New User?{" "}
        <Link to={`/register`} className="links">
          Register
        </Link>
      </center>
    </Fragment>
  );
}

export default Login;
