import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {BsFillArrowUpLeftSquareFill, BsPencilSquare, BsPlusLg, BsTrash} from "react-icons/bs";
import Repo from "../../../repository/studyhutRepository"
import axios from 'axios';

const Courses = (props) => {

    const navigate = useNavigate();

    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryChange = (event) => {
        let categoryId = event.target.value;
        let selected = selectedCategories.slice();

        const index = selected.indexOf(categoryId);
        if (index > -1) {
            selected.splice(index, 1);
            event.target.classList.remove("clicked");
        }
        else{
            selected.push(event.target.value);
            event.target.classList.add("clicked");
        }
        setSelectedCategories(selected);
        var filteredCourses = [];
        props.coursesHelper.forEach(course => {
            // let temp = null; 
            course.categories.forEach(category => {
                if(selected.includes(category.categoryID + "")){
                    // temp = course;
                    filteredCourses.push(course);
                }
            })
        })
        props.updateCourses(filteredCourses);
    };


    useEffect(() => {
        // Format course categories for filter
        props.courses.forEach(course => {
            course.categories = course.categories.map(({ categoryID }) => ({ categoryID }))
        });
    }, []);

    function addEditCourse(course) {
        props.updateCourse(course);
        navigate('/courses/add-edit')
    }

    return (
        <div className="container">
            <div className='row mt-5'>
                <div className='col-md-7'>
                    <span className="text-decoration-underline fs-2 me-2">Courses</span>
                    {
                        props.user.role === "ROLE_ADMIN" ?
                            <span onClick={() => addEditCourse({})}>
                                <BsPlusLg className='fs-2' style={{marginTop: "-0.5rem"}}></BsPlusLg>
                            </span>
                        : null
                    }
                </div>
            </div>


            <div className="row float-start mt-5" style={{width: "80%", borderRight: "1px solid grey"}}>
                {props.courses.map((term, key) => {
                        return (
                            <div key={key} className="card p-0 m-3" style={{width: "18rem"}}>
                                <img
                                    onClick={() => {props.updateCourse(term); navigate('/posts')}}
                                    src={"https://www.finki.ukim.mk/Content/dataImages/downloads/logo-large-500x500_2.png"}
                                    className="card-img-top" alt="course"/>
                                <div className="card-body" onClick={() => {props.updateCourse(term); navigate('/posts')}} style={{background: "#c1cad4"}}>
                                    <div className="card-text float-start">{term.name}</div>
                                    <div className="float-end ms-2">
                                        <BsFillArrowUpLeftSquareFill></BsFillArrowUpLeftSquareFill>
                                    </div>
                                </div>
                                <div className='card-footer'>
                                    {
                                        props.user.role === "ROLE_ADMIN" ? 
                                        <div className='d-flex justify-content-center'>
                                            <BsPencilSquare onClick={() => addEditCourse(term)}></BsPencilSquare>
                                            <BsTrash onClick={() => props.deleteCourse(term.courseID)} className='ms-3 text-danger'></BsTrash> 
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>
                        );
                    }
                )}
            </div>
             
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <span className='fs-4 mb-3'>Categories:</span>
                    <div className="clearfix">
                        <div className='row'>
                            {props.categories.map((category, key) => {
                                    return (
                                        <button onClick={handleCategoryChange} 
                                                className="categoryButton col-md-12 rounded rounded-pill mb-2"
                                                key={key}
                                                value={category.id}
                                        >
                                            {category.name}
                                        </button>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Courses;