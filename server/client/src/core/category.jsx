import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@mui/material";

// CSS
import "../style.css";

function Category() {
  document.title = "Select a category";
  const deliverylocation = localStorage.getItem("defaultDistrict");
  const [categories, setcategories] = useState([]);

  const onRender = async () => {
    try {
      const response = await fetch(`/category`, {
        method: "GET",
        headers: { defaultDistrict: deliverylocation },
      });
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
      <ul className="cats">
        {categories.map((cat) => (
          <Button
            key={cat.category}
            onClick={() => (window.location = `/products/${cat.category}`)}
            variant="outlined"
          >
            {cat.category}
          </Button>
        ))}
      </ul>
    );
  };

  return (
    <Fragment>
      <div>
        <Navbar />
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
