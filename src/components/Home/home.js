import React from "react";
import logo from '../../hutNote.png';
import notes from '../../notes.png';
import {SocialIcon} from 'react-social-icons';
import { Navigate } from "react-router-dom";

const homePage = (props) => {
    return (
        <div className="container">
            <div className="row  mt-3">
                <div className="col-8">
                    <div className="card">
                        <h5 className="card-header text-white" style={{background: "#3c3d3c"}}>WHAT IS STUDYHUT?</h5>
                        <div className="card-body" style={{background: "#daf0ee"}}>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor
                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                </div>
                <div className="col-4 d-flex justify-content-center">
                    <img alt="logo"
                            src={logo}
                            style={{
                                height: '160px',
                                width: '200px'
                            }}
                    />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-4 d-flex justify-content-center">
                    <img alt="logo"
                            src={notes}
                            style={{
                                height: '190px',
                                width: '240px'
                            }}
                    />
                </div>
                <div className="col-8">
                    <div className="card">
                        <h5 className="card-header text-white" style={{background: "#3c3d3c"}}>READ AND POST NOTES</h5>
                        <div className="card-body" style={{background: "#daf0ee"}}>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor
                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <div className="card">
                        <h5 className="card-header text-white" style={{background: "#3c3d3c"}}>HOW TO CONTACT US</h5>
                        <div className="card-body" style={{background: "#daf0ee"}}>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor
                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                </div>
                <div className="col-4 d-flex justify-content-center">
                    <div className="mt-5">
                        <SocialIcon url="https://facebook.com/in/#" fgColor="white" bgColor="#4593b0"/>
                        <SocialIcon url="https://twitter.com/in/#" fgColor="white" bgColor="#4593b0"/>
                        <SocialIcon url="https://instagram.com/in/#" fgColor="white" bgColor="#4593b0"/>
                        <SocialIcon url="https://youtube.com/in/#" fgColor="white" bgColor="#4593b0"/>
                        <SocialIcon url="https://linkedin.com/in/#" fgColor="white" bgColor="#4593b0"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default homePage;