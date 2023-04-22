import React from "react";
import {BsFillPersonFill} from "react-icons/bs";
import logo from '../../studyHut.png';

const Header = () => {

    let username = sessionStorage.getItem("username");

    let authenticate;
    if (sessionStorage.getItem("JWT")) {
        authenticate = (
            <span>
                <BsFillPersonFill size={60}></BsFillPersonFill>
                <span className="fs-3 me-4">{username}</span>
                <a className="active btn btn-info rounded-5 ps-3 pe-3 text-center mb-1" aria-current="page" href="/login"
                   onClick={() => {
                       sessionStorage.clear();
                       localStorage.clear();
                   }}>Logout</a>
            </span>
        );
    } else {
        authenticate = (<a className="active btn btn-info rounded-5 ps-3 pe-3 text-center mb-1" aria-current="page" href="/login">Login</a>);
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-white">
                <div className="container-fluid">
                    <div>
                        <img alt="logo"
                             src={logo}
                             style={{
                                 height: '70px',
                                 width: '110px'
                             }}/>
                    </div>
                    <a className="navbar-brand ms-2 fs-1 text-primary" href="/home">
                        Home</a>
                    <a className="navbar-brand ms-2 fs-1 text-primary" href="/courses">
                        Courses</a>
                    <a className="navbar-brand ms-2 fs-1 text-primary" href="/complaint">
                        Contact Us</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    </div>
                    <div className="d-flex justify-content-end">
                        <div>{authenticate}</div>
                    </div>
                </div>
            </nav>
            <hr className="m-0"/>
        </header>
    );
}

export default Header;