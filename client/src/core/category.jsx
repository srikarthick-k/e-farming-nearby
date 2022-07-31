// Problem in fetching the data as well as posting the data at the same time

import React, { Fragment, useEffect, useState } from "react";

function Category() {
  const [categories, setcategories] = useState();
  const [deliverylocation, setdeliverylocation] = useState("");
  const deliverylocationChange = async (e) => {
    setdeliverylocation(e.target.value);
  };
  const onSubmitCategory = async (e) => {
    e.preventDefault();

    try {
      const body = { deliverylocation };
      const response = await fetch("http://localhost:4000/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();
      setcategories(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // send data to categories using useEffect:
  // function getcat() {

  // }

  // useEffect(()=>{
  //   onSubmitCategory();
  // },[])

  return (
    <Fragment>
      <div>
        <form onSubmit={onSubmitCategory}>
          <select value={deliverylocation} onChange={deliverylocationChange}>
            <option value="">Not selected</option>
            <option value="bangarpet">Bangarpet</option>
            <option value="kgf">KGF</option>
            <option value="bengaluru">Bengaluru</option>
            <option value="kolar">Kolar</option>
          </select>
          <button type="submit">Fetch</button>
        </form>
      </div>
      <div>
        <h1>Products: </h1>
        {/* <p>{categories}</p> */}
        <ul>
          {categories}
        </ul>
      </div>
    </Fragment>
  );
}

export default Category;
