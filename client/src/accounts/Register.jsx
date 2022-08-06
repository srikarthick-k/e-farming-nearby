import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  
  const nameChange = (event) => {
    const userNameText = event.target.value.replace(/[^a-zA-Z ]/ig, "");
    setUsername(userNameText)
  }
  
  const emailChange = (event) => {
    const userEmailText = event.target.value.replace(/"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"/, "");
    setEmail(userEmailText)
  }  
  
  const onlyNumbers = (event) => {
    const result = event.target.value.replace(/\D/g, "");
    setPhone(result);
  };
  
  const cityChange = (event) => {
    const userCityText = event.target.value.replace(/[^a-zA-Z ]/ig, "");
    setCity(userCityText)
  }

  const passwordChange = (event) => {
    setPassword(event.target.value)
  }
  const onSubmitRegister = async (e) => {
    e.preventDefault();

    try {
      const body = { username, email, phone, city, password };
      const result = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const userid = await result.json()
      const id = userid.rows[0].id
      result ? window.location= `/category/${city}/${id}` : alert("User details not saved")
    } catch (err) {
      console.error(err.message);
    }
  };
  // @ValuesInDB:
  /* 1. username
     2. email
     3. phone
     4. city
     5. password
     6. confirm password
  */

  return (
    <Fragment>
      <form onSubmit={onSubmitRegister} className="registerForm">
        {/* username */}
        <div>
          <label htmlFor="uname">Full Name: </label>
          <input 
          type="text" 
          maxLength={30} 
          id="uname" 
          value={username}
          onChange={nameChange}
          />
        </div>

        {/* email */}
        <div>
          <label htmlFor="email">E-mail Address: </label>
          <input
            type="text"
            placeholder="gmail, protonmain, outlook, etc.,"
            maxLength={50}
            id="email"
            value={email}
            onChange={emailChange}
          />
        </div>

        {/* phone */}
        <div>
          <label htmlFor="mobile">Mobile Number: </label>
          <input
            type="text"
            placeholder="(+91)"
            value={phone}
            onChange={onlyNumbers}
            maxLength={10}
            id="mobile"
          />
        </div>

        {/* city */}
        <div>
          <label htmlFor="city">City: </label>
          <input 
          typeof="text" 
          maxLength={30} 
          id="city" 
          value={city}
          onChange={cityChange} 
          />
        </div>
        {/* password */}
        <div>
          <label htmlFor="password">Password: </label>
          <input 
          type="password" 
          maxLength={20} 
          id="password" 
          value={password} 
          onChange={passwordChange}
          />
        </div>

        {/* confirm password */}
        <div>
          <label htmlFor="cpassword">Confirm Password: </label>
          <input type="password" maxLength={20} id="cpassword" />
        </div>

        <div>
          <button 
          type="submit"
          >Submit</button>
        </div>
      </form>
      Already Registered? <Link to={"/login"}>Login</Link>
    </Fragment>
  );
}
