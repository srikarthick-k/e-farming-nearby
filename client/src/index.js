import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./accounts/Login";

// Components
import Register from "./accounts/Register";
import Navbar from "./components/Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Login /> } />
            <Route path="/nav" element={ <Navbar /> }/>
            <Route path="/register" element={ <Register /> } />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
