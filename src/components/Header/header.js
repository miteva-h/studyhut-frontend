import React from "react";
import {BsFillPersonFill} from "react-icons/bs";
import logo from '../../studyHut.png';
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Header = (props) => {

    const navigate = useNavigate();

    let authenticate;
    if (Object.keys(props.user).length > 0) {
        authenticate = (
            <span>
                <BsFillPersonFill size={60}></BsFillPersonFill>
                <span className="fs-3 me-4">{props.user.name}</span>
                <span className="active btn rounded-5 ps-3 pe-3 text-center mb-1" aria-current="page" style={{background:"#97c3f0"}}
                   onClick={() => {
                       sessionStorage.clear();
                       localStorage.clear();
                       props.updateUser({});
                       navigate('/login');
                   }}>Logout</span>
            </span>
        );
    } else {
        authenticate = (
            <Link to="/login" style={{ textDecoration: 'none' }}>
                <span className="active btn rounded-5 ps-3 pe-3 text-center mb-1 text-dark" aria-current="page" style={{background:"#97c3f0"}}>Login</span>
            </Link>
        );
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <img alt="logo"
                            src={logo}
                            style={{
                                height: '70px',
                                width: '110px'
                            }}/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Item>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                        <span className="navbar-brand ms-2 fs-lg-1 text-color" style={{color: '#1E6EB7'}}>
                            Home</span>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/courses" style={{ textDecoration: 'none' }}>
                        <span className="navbar-brand ms-2 fs-lg-1 text-color" style={{color: '#1E6EB7'}}>
                            Courses</span>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/complaint" style={{ textDecoration: 'none' }}>
                        <span className="navbar-brand ms-2 fs-lg-1 text-color" style={{color: '#1E6EB7'}}>
                            Contact Us</span>
                        </Link>
                    </Nav.Item>
                </Nav>
                <div>
                    <div>{authenticate}</div>
                </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;