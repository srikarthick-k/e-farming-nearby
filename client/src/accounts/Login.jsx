import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Category from "../core/category";

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
      console.log(result);
      result === true
        ? (window.location = "/post/product")
        : alert("Login credentials are wrong!!!");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmitLogin}>
        <h1>Login</h1>
        <div>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={emailChange}
          />
        </div>
        <br />
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={passwordChange}
          />
        </div>
        <br />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      New User? <Link to={`/register`}>Register</Link>
    </Fragment>
  );
}

export default Login;
