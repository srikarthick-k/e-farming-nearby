import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Register from "./accounts/Register";
import Navbar from "./components/Navbar";
import Login from "./accounts/Login";
import Postproduct from "./core/postproduct";
import Category from "./core/category";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Login /> } />
            <Route path="/nav" element={ <Navbar /> }/>
            <Route path="/register" element={ <Register /> } />
            <Route path="/post/product" element={ < Postproduct />}/>
            <Route path="/category/:deliverylocation" element={ < Category />}  />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
