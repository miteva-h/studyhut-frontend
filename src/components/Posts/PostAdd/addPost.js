import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import stickyNotes from "../../../stickyNotes.png";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const schema = Yup.object().shape({
    title: Yup.string()
      .required("Title is a required field"),
    notes: Yup.string()
      .required("Notes is a required field")
      .min(5, "Notes must be at least 8 characters"), // TODO: Increase desired minimum limit of notes
  });

const PostForm = (props) => {
    return (
        <>
            <div style={{backgroundColor: '#F7F3FE'}}>
                <Container style={{ paddingTop: "5%" }}>
                    <Row>
                        <Col md={8} className="align-items-center">
                            <h1>Add a note</h1>
                            <Card style={{ width: '55rem', height: '70vh', borderRadius: '3%', backgroundColor: '#C9D9F0', border: 'solid black 1px'}}>
                                <Card.Body>
                                <Formik
                                    validationSchema={schema}
                                    initialValues={{ title: "", notes: "", keywords: "" }}
                                    onSubmit={(values) => {
                                        /** Handle submit */
                                        //TODO: Axios method depending on create or edit
                                        alert(JSON.stringify(values))
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
                                            <label for="title">Title</label>
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
                                            <label for="notes">Notes</label>
                                            <textarea
                                                type="text"
                                                name="notes"
                                                id="notes"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.notes}
                                                placeholder="Enter notes"
                                                className="form-control"
                                                rows={15}
                                            ></textarea>
                                            {/* If validation is not passed show errors */}
                                            <p className="error">
                                                {errors.notes && touched.notes && errors.notes}
                                            </p>
                                            <label for="keywords">Keywords</label>
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
                                            {/* No error handling because not a mandatory field */}
                                            <Button className="btn-dark rounded-pill ms-auto px-5 mt-5" type="submit">Submit</Button>
                                        </form>
                                    )}
                                </Formik>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} style={{ display: 'flex', alignItems: "center", flexDirection: "column" }}>
                            <Button className="text-dark w-50" style={{ backgroundColor: '#C9D9F0', borderRadius: '0.5rem' }}>Go Back</Button>
                            <img src={stickyNotes} className="w-100" alt="sticky-notes" />
                            <img src={stickyNotes} className="w-100" alt="sticky-notes" />
                        </Col>
                    </Row>
                </Container>
            </div>
        </> 
    );
}
 
export default PostForm;