import React from "react";
import {SocialIcon} from 'react-social-icons';
import contact from "./contactUs.png"; // Import the image file
import '../../App/App.css';
import { Formik } from "formik";
import axios from "axios";
import {BsFillPersonFill} from "react-icons/bs";


function addComplaint(){
    const username = sessionStorage.getItem('username');

    let authenticate;
    if (sessionStorage.getItem("JWT")) {
        authenticate = (
            <span>
                <BsFillPersonFill size={60}></BsFillPersonFill>
                <span className="fs-3 me-4">{username}</span>
            </span>
        );
    }

    return (
        <div className="container contactUs" >
            <Formik
                initialValues={{ message: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    axios.post('/complaints/createComplaint', { message: values.message })
                        .then(response => {
                            alert('Message saved successfully!');
                            window.location.replace('/');
                        })
                        .catch(error => {
                            alert('An error occurred while saving your message.');
                            console.error(error);
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                {({ values, handleChange, handleSubmit, isSubmitting }) => (
                    <div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <p className="text-color">Contact Us</p>
                        </div>
                        <img className="col-md-6 col-sm-6 col-xs-12 float-md-end" 
                            alt="contact"
                            src={contact}
                            style={{marginTop: "-90px"}}
                        />
                        <div className="contactForm col-md-6 col-sm-6 col-xs-12">
                            <form onSubmit={handleSubmit} noValidate>
                                <label for="message"><span style={{color: '#1E6EB7'}}>Your message:</span></label>
                                <textarea
                                    type="text"
                                    name="message"
                                    className="form-control inp_text"
                                    id="message"
                                    value={values.message}
                                    onChange={handleChange}
                                    rows={15}
                                ></textarea>
                                <div className="contactButton col-md-6 col-sm-6 col-xs-12">
                                    <button type="submit" disabled={isSubmitting}>
                                        Submit
                                    </button> 
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
}

export default addComplaint;