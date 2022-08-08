import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
// CSS
import "../style.css"

// MUI
import { TextareaAutosize } from "@mui/material";
import {Button} from "@mui/material";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [qty, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [deliverylocation, setDeliveryLocation] = useState("")
  const [price, setPrice] = useState();
  const { pid } = useParams();
  const { uid } = useParams();
  // OnRender 🎬
  
  const renderProduct = async () => {
    try {
      const response = await fetch(`http://localhost:4000/product/${pid}`);
      const jsonData = await response.json();
      setProduct(jsonData);
      setPrice(jsonData.price);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onPlaceOrder = async () => {
    try {
      const body = { pid, uid, qty, price, address };
      const response = await fetch(`http://localhost:4000/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = response.json();
      result
        ? (window.location = `/category/${product.deliverylocation}/${uid}`)
        : console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getDefaultCity = async() =>{
    try {
      const response = await fetch(`http://localhost:4000/userinfo/${uid}`)
      const jsonData = await response.json();
      setDeliveryLocation(jsonData[0].city)
    } catch (err) {
      console.error(err.message);
    }
  }

  const addressChange = (event) => {
    setAddress(event.target.value);
  };

  useEffect(() => {
    renderProduct();
    getDefaultCity();
  }, []);
  // Render the data in card style
  return (
    <Fragment>
      <Navbar uid={uid} deliverylocation={deliverylocation}/>
      <center>
      <h1>Product Info</h1>
      <p><b>Name: </b>{product.pname}</p>
      <p><b>Category: </b>{product.category}</p>
      <p><b>Delivery City: </b>{product.deliverylocation} </p>
      <p>
      <b>Content: </b>{product.minquantity} {product.unit} / Rs. {product.price}
      </p>
      <div className="buyQ">

      <p><b>Buy Quantity: </b>{qty}</p>
      <Button
        onClick={() => {
          if (qty < product.maxquantity / product.minquantity) {
            setQuantity(qty + 1);
          }
        }}
        >
        <h1>+</h1>
      </Button>
      <Button
        onClick={() => {
          if (qty > 0) {
            setQuantity(qty - 1);
          }
        }}
        >
        <h1>-</h1>
      </Button>
          </div>
      <p><b>Delivery Charge: </b>Rs.{product.deliverycharge}</p>
      <p>
      <b>Total Price:</b>
        {qty > 0 ? price * qty + product.deliverycharge : "ZERO"}
      </p>
      <div>
        <TextareaAutosize
          minRows={9}
          style={{ width: 200 }}
          cols="30"
          rows="10"
          placeholder="Address to be delivered"
          value={address}
          onChange={addressChange}
          />
      </div>
      <Button
        onClick={() => {
          onPlaceOrder();
        }}
        variant="contained"
        >
        PlaceOrder
      </Button>
        </center>
    </Fragment>
  );
};

export default Product;
