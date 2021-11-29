import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2">
            <Link to="/" className="navbar-brand ml-5">Contacts  Manager</Link>
        </nav>
    )
}

export default Nav;