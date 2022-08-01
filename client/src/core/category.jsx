//** @TODO On next version 2.0 of this app I'm gonna include the option where user can search for available categories in that location. When they select the option from list of locations, the url parameter changes as well


import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Category() {
  const {deliverylocation} = useParams();
  const [categories, setcategories] = useState([]);

  //** On next version 2.0
  // const [deliverylocation, setdeliverylocation] = useState("");
  // const deliverylocationChange = async (e) => {
  //   setdeliverylocation(e.target.value);
  // }; 

  // onClick  👆
  const onSubmitCategory = async () => {
    try {
      const response = await fetch(`http://localhost:4000/category/${deliverylocation}`);
      const jsonData = await response.json();
      setcategories(jsonData)
    } catch (err) {
      console.error(err.message);
    }

  };
  useEffect(()=>{
    onSubmitCategory();
  },[])

  return (
    <Fragment>
      <div>
        {/* //**version2.0  */}
         {/* <form>
          <select value={deliverylocation} onChange={deliverylocationChange}>
            <option value="">Not selected</option>
            <option value="bangarpet">Bangarpet</option>
            <option value="kgf">KGF</option>
            <option value="bengaluru">Bengaluru</option>
            <option value="kolar">Kolar</option>
          </select>
          <button type="submit">Fetch</button> 
        </form> */}
      </div>
      <div>
        <h1>Products: </h1>
        <ul>
          {categories.map((cat=>
          <button
            key={cat.category}
            onClick={()=>window.location=`/products/${cat.category}`}
          >
            {cat.category}
          </button>))}
        </ul>
      </div>
    </Fragment>
  );
}

export default Category;
