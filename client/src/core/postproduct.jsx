import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";

// MUI
import { TextField } from "@mui/material";
import { Button } from "@mui/material";


function Postproduct() {
  const [pname, setpname] = useState("");
  const [category, setcategory] = useState("");
  const [unit, setunit] = useState("");
  const [price, setprice] = useState("");
  const [deliverycharge, setdeliverycharge] = useState("");
  const [description, setdescription] = useState("");
  const [deliverylocation, setdeliverylocation] = useState("");
  const [minquantity, setminquantity] = useState("");
  const [maxquantity, setmaxquantity] = useState("");
  const { uid } = useParams();

  const pnameChange = (e) => {
    setpname(e.target.value);
  };
  const categoryChange = (e) => {
    setcategory(e.target.value);
  };
  const unitChange = (e) => {
    setunit(e.target.value);
  };
  const priceChange = (e) => {
    const result = e.target.value.replace(/\D/g, "");
    setprice(result);
  };
  const deliverychargeChange = (e) => {
    const result = e.target.value.replace(/\D/g, "");
    setdeliverycharge(result);
  };
  const descriptionChange = (e) => {
    setdescription(e.target.value);
  };
  const deliverylocationChange = (e) => {
    setdeliverylocation(e.target.value);
  };
  const minquantityChange = (e) => {
    const result = e.target.value.replace(/\D/g, "");
    setminquantity(result);
  };
  const maxquantityChange = (e) => {
    const result = e.target.value.replace(/\D/g, "");
    setmaxquantity(result);
  };

  const onSubmitPostProduct = async (e) => {
    e.preventDefault();

    try {
      const body = {
        pname,
        category,
        unit,
        price,
        deliverycharge,
        description,
        deliverylocation,
        minquantity,
        maxquantity,
        uid,
      };
      const response = await fetch("http://localhost:4000/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(body);
      const successfullUpload = await response.json();
      if (successfullUpload) {
        window.location = `/category/${deliverylocation}/${uid}`;
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <center>
        <h1>Post product</h1>
        <form onSubmit={onSubmitPostProduct}>
          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Product Name"
              type="text"
              maxLength={30}
              value={pname}
              onChange={pnameChange}
            />
            {/* */}
          </div>
          <br />
          <div>
            <select value={category} onChange={categoryChange}>
              <option value="">Not selected</option>
              <option value="fruit">Fruits</option>
              <option value="vegetable">Vegetables</option>
              <option value="seed">Seeds</option>
              <option value="green">Green Leaves</option>
            </select>
          </div>
          <br />
          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Unit"
              type="text"
              maxLength={20}
              value={unit}
              onChange={unitChange}
            />
          </div>
          <br />
          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Price"
              type="text"
              placeholder="Price"
              maxLength={30}
              value={price}
              onChange={priceChange}
            />
            {/**Only Numbers */}
          </div>
          <br />
          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Delivery Charge"
              type="text"
              placeholder="Delivery Charge"
              maxLength={30}
              value={deliverycharge}
              onChange={deliverychargeChange}
            />
          </div>
          <br />
          <div>
            <textarea
              cols="30"
              rows="10"
              placeholder="Description"
              value={description}
              onChange={descriptionChange}
              maxLength={500}
            ></textarea>
          </div>
          <br />
          <div>
            <select value={deliverylocation} onChange={deliverylocationChange}>
              <option value="">Not selected</option>
              <option value="bangarpet">Bangarpet</option>
              <option value="kgf">KGF</option>
              <option value="bengaluru">Bengaluru</option>
              <option value="kolar">Kolar</option>
            </select>
          </div>
          <br />
          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Minimum Quantity"
              type="text"
              placeholder="Minimum Quantity"
              maxLength={30}
              value={minquantity}
              onChange={minquantityChange}
            />
            {/*Only Numbers */}
          </div>
          <br />
          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Maximum Quantity"
              type="text"
              placeholder="Maximum Quantity"
              maxLength={30}
              value={maxquantity}
              onChange={maxquantityChange}
            />
            {/*Only Numbers */}
          </div>
          <br />
          <div>
          <Button variant="outlined" type="submit" sx={{ m: 2 }}>
            SUBMIT
          </Button>
          </div>
        </form>
      </center>
    </Fragment>
  );
}

export default Postproduct;
