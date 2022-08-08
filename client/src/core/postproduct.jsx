import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// MUI
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Navbar from "../components/Navbar";

function Postproduct() {
  const [pname, setpname] = useState("");
  const [category, setcategory] = useState("");
  const [categories, setcategories] = useState([]);
  const [unit, setunit] = useState("");
  const [price, setprice] = useState("");
  const [deliverycharge, setdeliverycharge] = useState("");
  const [description, setdescription] = useState("");
  const [deliverylocation, setdeliverylocation] = useState("");
  const [districts, setDistricts] = useState([])
  const [minquantity, setminquantity] = useState("");
  const [maxquantity, setmaxquantity] = useState("");
  const { uid } = useParams();
  const [city, setCity] = useState("")


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

  const categorySelect = async () => {
    const result = await fetch("http://localhost:4000/categoryselect");
    const jsonData = await result.json();
    setcategories(jsonData);
  };
  const districtsRender = async () => {
    try {
      const district = await fetch("http://localhost:4000/districts");
      const response = await district.json();
      setDistricts(response);
    } catch (err) {
      console.error(err.message);
    }
  };
  const getDefaultCity = async() =>{
    try {
      const response = await fetch(`http://localhost:4000/userinfo/${uid}`)
      const jsonData = await response.json();
      setCity(jsonData[0].city)
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    categorySelect();
    districtsRender();
    getDefaultCity();
  }, []);

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
      <Navbar uid={uid} deliverylocation={city}/>
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
            {/*  */}
          </div>
          <br />
          <div>
            <FormControl sx={{ m: 2, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Category
              </InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={categoryChange}
              >
                <MenuItem value="">Not Selected</MenuItem>
                {categories.map((cat) => (
                  <MenuItem value={cat.catname} key={cat.id}>
                    {cat.catname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <TextareaAutosize
              minRows={4}
              placeholder="Description"
              style={{ width: 200 }}
              value={description}
              onChange={descriptionChange}
              maxLength={500}

            />
          </div>
          <br />
          <div>
            <FormControl sx={{ m: 2, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-helper-label">
              District
            </InputLabel>
            <Select value={deliverylocation} label="District" onChange={deliverylocationChange}>
              <MenuItem value="">Not Selected</MenuItem>
              {districts.map((district) => (
                <MenuItem value={district.dname} key={district.id}>
                  {district.dname}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Select a district where you can deliver this product
            </FormHelperText>
          </FormControl>
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
