import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {BsFillArrowUpLeftSquareFill} from "react-icons/bs";

const Courses = (props) => {

    const navigate = useNavigate();

    const CategoryForm = () => {
        const [selectedCategories, setSelectedCategories] = useState([]);

        const handleCategoryChange = (event) => {
            const {value, checked} = event.target;
            if (checked) {
                setSelectedCategories([...selectedCategories, value]);
            } else {
                setSelectedCategories(selectedCategories.filter((category) => category !== value));
            }
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            props.onGetCoursesByCategory(selectedCategories);
            navigate("/courses");
        };

        return (
            <div className="container">
                <p className="text-decoration-underline fs-2 mt-5 ms-5">Courses</p>
                <div className="row  float-start mt-5" style={{width: "80%", borderRight: "1px solid grey"}}>
                    {props.courses.map((term) => {
                            return (
                                <div className="card p-0 m-3" style={{width: "18rem"}}>
                                    <img
                                        src={term.picture}
                                        className="card-img-top" alt="course"/>
                                    <div className="card-body" style={{background: "#c1cad4"}}>
                                        <div className="card-text float-start">{term.name}</div>
                                        <div className="float-end ms-2">
                                            <BsFillArrowUpLeftSquareFill></BsFillArrowUpLeftSquareFill>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="float-end fs-4 d-flex justify-content-center" style={{width: "20%"}}>
                        <div className="clearfix">
                            Categories:
                            <div>
                                {props.categories.map((term) => {
                                        return (
                                            <label>
                                                <input type="checkbox" value={term.name}
                                                       checked={selectedCategories.includes(term.name)}
                                                       onChange={handleCategoryChange}/>
                                                {term.name}
                                            </label>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Courses;