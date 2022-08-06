import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const { uid } = useParams();
  const { deliverylocation } = useParams();

  const renderProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/products/${category}/${deliverylocation}`
      );
      const jsonData = await response.json();
      setProducts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    renderProducts();
  }, []);

  return (
    <Fragment>
      <center>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Delivery Charge</th>
              <th>Delivery location</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr
                key={prod.id}
                onClick={() => {
                  window.location = `/product/${prod.id}/${uid}`;
                }}
              >
                <td>{prod.pname}</td>
                <td>{prod.price}</td>
                <td>{prod.deliverycharge}</td>
                <td>{prod.deliverylocation}</td>
                <td>{prod.price + prod.deliverycharge}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </Fragment>
  );
};

export default Products;

// @TODO:= Complete the rendering of products in selected category and do the next part of rendering individual products on 2/08
