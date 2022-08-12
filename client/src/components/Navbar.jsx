import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// CSS
import "../style.css";

import { Button } from "@mui/material";

function Navbar() {
  return (
    <Fragment>
      <div className="navbar">
        <div className="logout">
          <Button
            onClick={() => {
              localStorage.clear();
              window.location = "/";
            }}
          >
            Logout
          </Button>
        </div>
        <div className="navigation">
          <Link to={`/post/product`}>
            <h4 className="links">Post product</h4>
          </Link>
          <Link to={`/from-orders`}>
            <h4 className="links">Orders from you</h4>
          </Link>
          <Link to={`/to-orders`}>
            <h4 className="links">Orders to you</h4>
          </Link>
          <Link to={`/myproducts`}>
            <h4 className="links">My products</h4>
          </Link>
          <Link to={`/category`}>
            <h4 className="links">Home</h4>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default Navbar;
