import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// CSS
import "../style.css";

function Navbar(props) {
  const uid = props.uid;
  const deliverylocation = props.deliverylocation;
  return (
    <Fragment>
      <div className="navigation">
        <Link to={`/post/product/${uid}`}>
          <h4 className="links">Post product</h4>
        </Link>
        <Link to={`/from-orders/${uid}`}>
          <h4 className="links">Orders from you</h4>
        </Link>
        <Link to={`/to-orders/${uid}`}>
          <h4 className="links">Orders to you</h4>
        </Link>
        <Link to={`/category/${deliverylocation}/${uid}`}>
          <h4 className="links">Home</h4>
        </Link>
      </div>
    </Fragment>
  );
}

export default Navbar;
