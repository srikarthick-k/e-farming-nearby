import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";

const Products = () => {

    const {category} = useParams(); 
    const {deliverylocation} = useParams(); 

    const renderProducts = async() =>{
        try {
            const response = await fetch(`http://localhost:4000/products/${category}/${deliverylocation}`);
            const jsonData = await response.json();
            console.log(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(()=>{
        renderProducts();
    })

    return(
        <Fragment>
            
        </Fragment>
    )
}

export default Products;

// @TODO:= Complete the rendering of products in selected category and do the next part of rendering individual products on 2/08