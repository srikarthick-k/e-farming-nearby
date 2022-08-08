import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// CSS
import "../style.css"
// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from "../components/Navbar";

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
      {/* <center> */}
      <Navbar uid={uid} deliverylocation={deliverylocation}/>
      <center><h1>Products</h1></center>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Delivery location</TableCell>
              <TableCell>Price per / </TableCell>
              <TableCell>Minimum Quantity</TableCell>
              <TableCell>Delivery Charge</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((prod) => (
              <TableRow
              className="trow"
              hover={true}
                key={prod.id}
                onClick={() => {
                  window.location = `/product/${prod.id}/${uid}`;
                }}
              >
                <TableCell>{prod.pname}</TableCell>
                <TableCell>{prod.deliverylocation}</TableCell>
                <TableCell>{prod.price}</TableCell>
                <TableCell>{prod.minquantity}</TableCell>
                <TableCell>{prod.deliverycharge}</TableCell>
                <TableCell>{prod.price + prod.deliverycharge}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      {/* </center> */}
    </Fragment>
  );
};

export default Products;

// @TODO:= Complete the rendering of products in selected category and do the next part of rendering individual products on 2/08
