import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigator=useNavigate();
    function handleLogout(){
        localStorage.removeItem("user")
        localStorage.removeItem("key")
        window.location.href="/"
    }
    return (

        <nav className="navbar ss navbar-expand-lg navbar-light bg-light ">
        <a className="navbar-brand fw-bolder " href="#">Rental Space</a>
        <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
            <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link" onClick={()=>navigator("/host")}>Become a Host</a>
            {!localStorage.getItem("key")?<a className="nav-item nav-link" onClick={()=>navigator("/login")}>Login</a>:<a onClick={handleLogout} className="nav-item nav-link">Logout</a>}
            {!localStorage.getItem("key")&&<a className="nav-item nav-link" onClick={()=>navigator("/signup")}>Signup</a>}
            </div>
        </div>
        </nav>


        // <div className="navbar">
        //     <Link className="navbar-logo"  ><div className="navbar-logo">Sarkar Space</div></Link>
            
        //     <div className="navbar-items">
        //         <Link to="/host">Become a Host</Link>
                
        //         <a href="#login">Login</a>
        //         <a href="#signup">Signup</a>
        //     </div>
        // </div>
    );
};

export default Navbar;
