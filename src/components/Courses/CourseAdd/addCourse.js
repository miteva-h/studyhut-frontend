import React, { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import stickyNotes from "../../../stickyNotes.png";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from 'react-select';

const schema = Yup.object().shape({
    name: Yup.string()
      .required("Name is a required field")
  });

const CourseForm = (props) => {

    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    const [defaultOptions, setDefaultOptions] = useState(() => {
        if(Object.keys(props.course).length > 0){
            var tempOptions = [];
            props.course.categories.forEach(category => {
                var defaultOption = {value: category.categoryID, label: category.name};
                console.log(defaultOption);
                tempOptions.push(defaultOption);
            });
            return tempOptions;
        }
    });
    const [courseName, setCourseName] = useState(props.course.name);
    const [options, setOptions] = useState([]); 

    useEffect(() => {
        var tempOptions = [];
        props.categories.forEach(category => {
            var option = {value: category.id, label: category.name};
            tempOptions.push(option);
        });
        setOptions(tempOptions);
    }, []);

    if(props.user.role !== "ROLE_ADMIN"){
        navigate('/courses');
    }
    else{
        return (
            <>
                <div style={{backgroundColor: '#F7F3FE'}}>
                    <Container style={{ paddingTop: "5%" }}>
                        <Row>
                            <Col md={8} className="align-items-center">
                                <h1>Form for Course</h1>
                                <Card className="rounded rounded-square" style={{ width: '100%', height: 'fit-content', backgroundColor: '#C9D9F0', border: 'solid black 1px'}}>
                                    <Card.Body>
                                    <Formik
                                        validationSchema={schema}
                                        initialValues={{ name: courseName, picture: "", categories: []}}
                                        onSubmit={(values) => {
                                            /** Handle submit */
                                            //TODO: Axios method depending on create or edit
                                            // console.log(values, selectedImage);

                                            values.categories = values.categories.map(category => {
                                                return category.value;
                                            });
                                            var data = {
                                                name: values.name,
                                                // TODO: Use this when file handling is enabled
                                                // picture: selectedImage 
                                                categoryIds: values.categories,
                                                picture: "Image",
                                            }
                                            var url = (props.course !== {}) ? "http://localhost:8080/courses/" + props.course.courseID + "/edit" : "http://localhost:8080/courses/create";
                                            var method = (props.course !== {}) ? "PUT" : "POST";
                                            axios({
                                                method: method,
                                                url: url,
                                                data: data,
                                            }).then(response => {
                                                if(response.status == 200){
                                                    props.loadCategories();
                                                    navigate("/courses");
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
                                            <form noValidate onSubmit={handleSubmit} className="flex-center" style={{height: "100%"}}>
                                            {/* Input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                                                <label htmlFor="name">Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.name}
                                                    placeholder="Enter course name"
                                                    className="form-control inp_text"
                                                    id="name"
                                                />
                                                {/* If validation is not passed show errors */}
                                                <p className="error">
                                                    {errors.name && touched.name && errors.name}
                                                </p>

                                                <label htmlFor="courses">Category</label>
                                                <Select
                                                    options={options}
                                                    isMulti
                                                    name="cateogires"
                                                    id="categories"
                                                    className="form-control"
                                                    onChange={(option) => {values.categories = option}}
                                                    defaultValue={defaultOptions}
                                                />

                                                <label htmlFor="picture">Picture</label>
                                                <input
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    onBlur={handleBlur}
                                                    value={values.picture}
                                                    placeholder="Enter picture"
                                                    className="form-control inp_text"
                                                    id="picture"
                                                    type="file" 
                                                    name="picture"/>
                                                {/* No error handling because not a mandatory field */}
                                                {selectedImage && <img src={selectedImage} style={{width: "30%", marginTop: '5%'}} alt="Uploaded" />}
                                                <Button className="btn-dark rounded-pill ms-auto mb-auto px-5 mt-5" type="submit">Submit</Button>
                                            </form>
                                        )}
                                    </Formik>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} style={{ display: 'flex', alignItems: "center", flexDirection: "column" }}>
                                <Button onClick={() => navigate(-1)} className="text-dark w-50" style={{ backgroundColor: '#C9D9F0', borderRadius: '0.5rem' }}>Go Back</Button>
                                <img src={stickyNotes} className="w-100" alt="sticky-notes" />
                                <img src={stickyNotes} className="w-100" alt="sticky-notes" />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </> 
        );
    }
}
 
export default CourseForm;