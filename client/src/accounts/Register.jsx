import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//CSS
import "../style.css";

// MUI:
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

export default function Register() {
  document.title = "Register";
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmPassword] = useState("");
  const [districts, setDistricts] = useState([]);

  const nameChange = (event) => {
    const userNameText = event.target.value.replace(/[^a-zA-Z ]/gi, "");
    setUsername(userNameText);
  };

  const emailChange = (event) => {
    const userEmailText = event.target.value.replace(
      /"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"/,
      ""
    );
    setEmail(userEmailText);
  };

  const onlyNumbers = (event) => {
    const result = event.target.value.replace(/\D/g, "");
    setPhone(result);
  };

  const cityChange = (event) => {
    const userCityText = event.target.value.replace(/[^a-zA-Z ]/gi, "");
    setCity(userCityText);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const onSubmitRegister = async (e) => {
    e.preventDefault();
    if(city===""){
      alert("Please select your district")
      return;
    }
    if(password !== confirmpass){
      alert("Passwords doesnot match")
      return;
    }
    try {
      const body = { username, email, phone, city, password };
      const result = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const userid = await result.json();
      const id = userid.rows[0].id;
      if (userid.rows[0]) {
        localStorage.setItem("defaultDistrict", city);
        localStorage.setItem("uid", id);
        userid.rows[0]
          ? (window.location = `/category`)
          : alert("User details not saved");
      } else alert("Error occured while registering");
    } catch (err) {
      console.error(err.message);
    }
  };
  const districtsRender = async () => {
    try {
      const district = await fetch("http://localhost:4000/districts");
      const response = await district.json();
      setDistricts(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    districtsRender();
  }, []);
  return (
    <center>
      <h1>Register</h1>
      <form onSubmit={onSubmitRegister} className="registerForm">
        {/* username */}
        <div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Full Name"
            type="text"
            inputProps={{ maxLength: 30 }}
            value={username}
            onChange={nameChange}
            sx={{ m: 2 }}
          required/>
        </div>

        {/* email */}
        <div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Email Address"
            type="text"
            placeholder="gmail, protonmain, outlook, etc.,"
            inputProps={{ maxLength: 30 }}
            value={email}
            onChange={emailChange}
            sx={{ m: 2 }}
          required/>
        </div>

        {/* phone */}
        <div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Mobile"
            type="text"
            placeholder="(+91)"
            value={phone}
            onChange={onlyNumbers}
            inputProps={{ maxLength: 10 }}
            sx={{ m: 2 }}
            required/>
        </div>

        {/* city */}
        <div>
          <FormControl sx={{ m: 2, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-helper-label">
              District
            </InputLabel>
            <Select value={city} label="District" onChange={cityChange}>
              <MenuItem value="">Not Selected</MenuItem>
              {districts.map((district) => (
                <MenuItem value={district.dname} key={district.id}>
                  {district.dname}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Helpful in determining Your delivery location
            </FormHelperText>
          </FormControl>
        </div>
        {/* password */}
        <div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Password"
            type="password"
            maxLength={255}
            inputProps={{ maxLength: 25 }}
            value={password}
            onChange={passwordChange}
            sx={{ m: 2 }}
            required/>
        </div>

        {/* confirm password */}
        <div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Confirm Password"
            type="password"
            inputProps={{ maxLength: 25 }}
            sx={{ m: 2 }}
            name="confirmpass"
            onChange={confirmPasswordChange}
            required/>
        </div>

        <div>
          <Button variant="outlined" type="submit" sx={{ m: 2 }}>
            SUBMIT
          </Button>
          <Button variant="outlined" onClick={()=>{window.location = "/register"}} sx={{ m: 2 }}>
            RESET
          </Button>
        </div>
      </form>
      Already Registered?{" "}
      <Link to={"/login"} className="links">
        Login
      </Link>
    </center>
  );
}
