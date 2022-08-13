import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// CSS
import "./style.css";

const Index = () => {
  document.title = "e-farming nearby";
  return (
    <Fragment>
      <div className="navbar">
        <div className="navigation">
          <Link to={"/login"}>
            <h4 className="links">Login</h4>
          </Link>
          <br />
          <br />
          <Link to={"/register"}>
            <h4 className="links">Register</h4>
          </Link>
        </div>
      </div>
      <div className="indexDec">
        <article>
          <center>
            <h1>WELCOME TO E-FARMING NEARBY</h1>
            <p>
              e-farming nearby is a marketplace to buy or sell your farm goods
              online within your selected deliverable districts. The products
              ranges from worm, soil to cattles, heavy equipments essential for
              farming
            </p>
            <h2>Key features</h2>
          </center>
        </article>
        <ul>
          <li>
            Seller delivers to your location{" "}
            <img src="delivery.jpg" alt="" width="480" />
          </li>
          <br />
          <li>
            <img src="worms.jpg" alt="" width="480" />
            Trade goods from tiny worms to heavy farm equipment
            <img src="equipment.jpg" alt="" width="480" />
          </li>
          <br />
          <li>
            <img src="cod.jpg" alt="" width="480" />
            Pay the seller after they deliver their product
          </li>
          <li>
            Order products with fewer clicks
            <img src="clicks.jpg" alt="" width="480" />
          </li>
          <li>
            <img src="category.jpg" alt="" width="480" />
            View products based on categories in your district
          </li>
          <li>
            Give feedback for our future improvements
            <img src="feedback.jpg" alt="" width="480" />
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default Index;
