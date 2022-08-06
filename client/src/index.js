import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Register from "./accounts/Register";
import Navbar from "./components/Navbar";
import Login from "./accounts/Login";
import Postproduct from "./core/postproduct";
import Category from "./core/category";
import Products from "./core/products";
import Product from "./core/product";
import Index from "./home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Index /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/nav" element={ <Navbar /> }/>
            <Route path="/register" element={ <Register /> } />
            <Route path="/category/:deliverylocation/:uid" element={ < Category />}  />
            <Route path="/post/product/:uid" element={ < Postproduct />}/>
            <Route path="/products/:category/:deliverylocation/:uid" element={ < Products /> }/>
            <Route path="/product/:pid/:uid" element={ <Product /> }/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
