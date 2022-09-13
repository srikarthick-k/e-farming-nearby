import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Register from "./accounts/Register";
import Login from "./accounts/Login";
import Postproduct from "./core/postproduct";
import Category from "./core/category";
import Products from "./core/products";
import Product from "./core/product";
import Index from "./home";

// Orders
import FromOrder from "./core/orders/from-orders";
import ToOrder from "./core/orders/to-orders";

// Theme
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MyProducts from "./core/orders/myproducts";
import Feedback from "./core/feedback";
import ViewFeedback from "./components/ViewFeedback";

const root = ReactDOM.createRoot(document.getElementById("root"));
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/viewfeed" element={<ViewFeedback />} />

            <Route path="/category" element={<Category />} />
            <Route path="/post/product" element={<Postproduct />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/product/:pid/:uid" element={<Product />} />
            <Route path="/feedback" element={<Feedback />} />

            <Route path="/from-orders" element={<FromOrder />} />
            <Route path="/to-orders" element={<ToOrder />} />
            <Route path="/myproducts" element={<MyProducts />} />
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>
);
