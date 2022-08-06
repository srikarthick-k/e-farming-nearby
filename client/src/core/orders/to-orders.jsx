// Display orders to be served 
// Display orders based on selleriD

import React, { Fragment } from "react";

const ToOrder = () => {
    return(
        <Fragment>
            <h1>To Orders</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product-Name | </th>
                        <th>Customer Name | </th>
                        <th>Quantity | </th>
                        <th>Total-Price | </th>
                        <th>City | </th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Do backend design and comeback */}
                    <button>Update</button>
                </tbody>
            </table>
        </Fragment>
    );
}

export default ToOrder;