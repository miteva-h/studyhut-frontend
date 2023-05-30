import React, {useEffect, useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import stickyNotes from "../../../stickyNotes.png";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const schema = Yup.object().shape({
    title: Yup.string()
        .required("Title is a required field"),
    notes: Yup.string()
        .required("Notes is a required field")
        .min(5, "Notes must be at least 8 characters"), // TODO: Increase desired minimum limit of notes
});

const PostForm = (props) => {

    const navigate = useNavigate();

    const [dateTime, setDateTime] = useState("");
    const [title, setTitle] = useState(() => {
        if (Object.keys(props.post).length > 0) {
            return props.post.title;
        } else {
            return "";
        }
    });
    const [keywords, setKeywords] = useState(() => {
        if (Object.keys(props.post).length > 0) {
            return props.post.keywords;
        } else {
            return "";
        }
    });
    const [notes, setNotes] = useState(() => {
        if (Object.keys(props.post).length > 0) {
            return props.post.notes;
        } else {
            return "";
        }
    });

    useEffect(() => {
        var date = new Date();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + (date.getDate())).slice(-2);
        var year = date.getFullYear();
        var hour = ("0" + (date.getHours())).slice(-2);
        var min = ("0" + (date.getMinutes())).slice(-2);
        var seg = ("0" + (date.getSeconds())).slice(-2);
        date = year + "-" + month + "-" + day + "-" + hour + "-" + min + "-" + seg + ".000";
        setDateTime(date);
    }, []);


    return (
        <>
            <div style={{backgroundColor: '#F7F3FE'}}>
                <Container style={{paddingTop: "5%"}}>
                    <Row>
                        <Col md={8} className="align-items-center">
                            <h1>Form for post</h1>
                            <Card style={{
                                width: '100%',
                                height: '75vh',
                                borderRadius: '3%',
                                backgroundColor: '#C9D9F0',
                                border: 'solid black 1px'
                            }}>
                                <Card.Body>
                                    <Formik
                                        validationSchema={schema}
                                        initialValues={{title: title, notes: notes, keywords: keywords}}
                                        onSubmit={(values) => {
                                            /** Handle submit */
                                                //TODO: Axios method depending on create or edit
                                            var data = {
                                                    keywords: values.keywords,
                                                    title: values.title,
                                                    // notes: values.notes,
                                                    notes: "notes",
                                                    dateTime: dateTime,
                                                    courseId: props.course.courseID,
                                                    userId: props.user.userID
                                                }
                                            axios({
                                                method: "POST",
                                                url: "http://localhost:8080/posts/create",
                                                data: data
                                            }).then(response => {
                                                if (response.status === 200) {
                                                    navigate(-1);
                                                }
                                            })
                                        }}
                                    >
                                        {({
                                              values,
                                              errors,
                                              touched,
                                              handleChange,
                                              handleBlur,
                                              handleSubmit,
                                          }) => (
                                            <form noValidate onSubmit={handleSubmit} className="flex-center">
                                                {/* Input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                                                <label htmlFor="title">Title</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.title}
                                                    placeholder="Enter note title"
                                                    className="form-control inp_text"
                                                    id="title"
                                                />
                                                {/* If validation is not passed show errors */}
                                                <p className="error">
                                                    {errors.title && touched.title && errors.title}
                                                </p>
                                                {/* Input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                                                <label htmlFor="notes">Notes</label>
                                                {/*<textarea*/}
                                                {/*    type="text"*/}
                                                {/*    name="notes"*/}
                                                {/*    id="notes"*/}
                                                {/*    onChange={handleChange}*/}
                                                {/*    onBlur={handleBlur}*/}
                                                {/*    value={values.notes}*/}
                                                {/*    placeholder="Enter notes"*/}
                                                {/*    className="form-control"*/}
                                                {/*    rows={15}*/}
                                                {/*></textarea>*/}
                                                <label htmlFor="post">Select your post: </label>
                                                <input id="post" type="file"/>
                                                {/* If validation is not passed show errors */}
                                                <p className="error">
                                                    {errors.notes && touched.notes && errors.notes}
                                                </p>
                                                <label htmlFor="keywords">Keywords</label>
                                                <input
                                                    type="text"
                                                    name="keywords"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.keywords}
                                                    placeholder="Enter keywords"
                                                    className="form-control inp_text"
                                                    id="keywords"
                                                />
                                                <small>(Separate keywords with ",")</small>
                                                {/* No error handling because not a mandatory field */}
                                                <Button className="btn-dark rounded-pill ms-auto px-5 mt-3"
                                                        type="submit">Submit</Button>
                                            </form>
                                        )}
                                    </Formik>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="desktopImage"
                             style={{display: 'flex', alignItems: "center", flexDirection: "column"}}>
                            <Button onClick={() => navigate(-1)} className="text-dark w-50"
                                    style={{backgroundColor: '#C9D9F0', borderRadius: '0.5rem'}}>Go Back</Button>
                            <img src={stickyNotes} className="w-100" alt="sticky-notes"/>
                            <img src={stickyNotes} className="w-100" alt="sticky-notes"/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default PostForm;