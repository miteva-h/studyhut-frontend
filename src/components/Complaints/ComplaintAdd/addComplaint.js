import React, {useState} from "react";
import {SocialIcon} from 'react-social-icons';
import contact from "./contactUs.png"; // Import the image file
import '../../App/App.css';
import {Formik} from "formik";
import axios from "axios";
import {BsFillPersonFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";


function AddComplaint(props) {

    const navigate = useNavigate();

    let authenticate;
    if (Object.keys(props.user).length > 0) {
        authenticate = (
            <span>
                <BsFillPersonFill size={60}></BsFillPersonFill>
                <span className="fs-3 me-4">{props.user.name}</span>
            </span>
        );
    }

    const [isVisible, setIsVisible] = useState(true);

    const disappear = () => {
        setIsVisible(false);
    };


    let show;
    if (props.user.role === "ROLE_ADMIN") {
        show = (
            <div>
                <table className="table-striped table">
                    <tr>
                        <th>Number</th>
                        <th>Complaint</th>
                        <th></th>
                    </tr>
                    {isVisible && (
                        <tr id="trow">
                            <td>1</td>
                            <td>Please add course for Object-oriented programming.</td>
                            <td>
                                <button className="btn btn-danger" onClick={disappear}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )}
                </table>

            </div>
        );
    } else {
        show = (<div className="container contactUs">
            <Formik
                initialValues={{message: ''}}
                onSubmit={(values, {setSubmitting}) => {
                    props.addComplaint(values.message, props.user)
                    setSubmitting(false)
                    navigate("/");
                }}
            >
                {({values, handleChange, handleSubmit, isSubmitting}) => (
                    <div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <p className="text-color">Contact Us</p>
                        </div>
                        <img className="col-md-6 col-sm-6 col-xs-12 float-md-end desktopImage"
                             alt="contact"
                             src={contact}
                             style={{marginTop: "-90px"}}
                        />
                        <div className="contactForm col-md-6 col-sm-6 col-xs-12">
                            <form onSubmit={handleSubmit} noValidate>
                                <label htmlFor="message"><span style={{color: '#1E6EB7'}}>Your message:</span></label>
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
        </div>)
    }

    return (
        {show}
    );
}

export default AddComplaint;