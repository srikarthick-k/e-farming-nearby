//** @TODO On next version 2.0 of this app I'm gonna include the option where user can search for available categories in that location. When they select the option from list of locations, the url parameter changes as well

import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function Category() {
  const { deliverylocation } = useParams();
  const { uid } = useParams();
  const [categories, setcategories] = useState([]);

  const onRender = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/category/${deliverylocation}`
      );
      const jsonData = await response.json();
      setcategories(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    onRender();
  }, []);

  const CategoriesRender = () => {
    return (
      <ul>
        {categories.map((cat) => (
          <button
            key={cat.category}
            onClick={() =>
              (window.location = `/products/${cat.category}/${deliverylocation}/${uid}`)
            }
          >
            {cat.category}
          </button>
        ))}
      </ul>
    );
  };
  return (
    <Fragment>
      <div>
        <Navbar uid={uid} deliverylocation1={deliverylocation}/>
        <h1>Categories: </h1>
        {categories[0] ? (
          <CategoriesRender />
        ) : (
          <h1>No Products available your current location</h1>
        )}
      </div>
    </Fragment>
  );
}

export default Category;