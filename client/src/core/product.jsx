import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [qty, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
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

  const addressChange = (event) => {
    setAddress(event.target.value);
  };

  useEffect(() => {
    renderProduct();
  }, []);
  // Render the data in card style
  return (
    <Fragment>
      <p>Name: {product.pname}</p>
      <p>Category: {product.category}</p>
      <p>Delivery City: {product.deliverylocation} </p>
      <p>
        Content: {product.minquantity} {product.unit} / Rs. {product.price}
      </p>
      <p>Buy Quantity: {qty}</p>
      <button
        onClick={() => {
          if (qty < product.maxquantity / product.minquantity) {
            setQuantity(qty + 1);
          }
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          if (qty > 0) {
            setQuantity(qty - 1);
          }
        }}
      >
        -
      </button>
      <p>Delivery Charge: Rs.{product.deliverycharge}</p>
      <p>
        Total Price:
        {qty > 0 ? price * qty + product.deliverycharge : "ZERO"}
      </p>
      <div>
        <textarea
          cols="30"
          rows="10"
          placeholder="Address to be delivered"
          value={address}
          onChange={addressChange}
        />
      </div>
      <button
        onClick={() => {
          onPlaceOrder();
        }}
      >
        PlaceOrder
      </button>
    </Fragment>
  );
};

export default Product;
