import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Index = () => {
    return(
        <Fragment>
            <Link to={"/login"}>Login</Link><br /><br />
            <Link to={"/register"}>Register</Link>
        </Fragment>
    );
}

export default Index;