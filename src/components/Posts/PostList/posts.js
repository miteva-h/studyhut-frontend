import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {BsArrowLeft, BsFillArrowUpLeftSquareFill, BsPencilSquare, BsTrash} from "react-icons/bs";
import axios from 'axios';

const Posts = (props) => {

    const navigate = useNavigate();

    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        props.loadPosts(props.course.courseID);
    }, [])

    let posts = props.posts;

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onGetCoursesByCategory(selectedCategories);
        navigate("/courses");
    };

    const addEditPost = (post) => {
        props.updatePost(post);
        navigate("/posts/add-edit");
    }

    const searchPostsByKeywords = (event) => {
        if(event.target.value.length >= 3){
            let data = {
                keywords: event.target.value,
                courseId: props.course.courseID
            }
            props.searchPostsByKeywords(data);
        }
        else{
            props.loadAllPostsForCourse(props.course.courseID);
        }
    }

    const goToReviews = (post) => {
        props.updatePost(post);
        navigate('/reviews');
    }

    return (
        <div className="container">
            <div className='row mt-5'>
                <span className="col-md-7 text-decoration-underline fs-2">
                    <BsArrowLeft onClick={() => navigate(-1)} className='fs-1 me-4'></BsArrowLeft>{props.course.name}
                </span>
                <div className='col-md-5'>
                    <div className="input-group w-75">
                        <input onChange={searchPostsByKeywords} className="form-control py-2 border-right-0 border" type="search" placeholder="Search by keyword.."/>
                        <div className="input-group-append me-4">
                            <div className="input-group-text h-100">
                                <i className="fa fa-search"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={() => addEditPost({})} className="col-md-3 rounded rounded-pill customButton mt-5">Post note</button>
            </div>
            <div className="row float-start mt-5" style={{width: "100%"}}>
                {posts.map((term, key) => {
                        return (
                            <div key={key} className='row mb-4'>
                                <div className='col-md-11'>
                                    <div className="card p-0 w-100">
                                        <div className="card-body">
                                            <div className="card-text float-start">
                                                <span>{term.name}</span>
                                            </div>
                                            <div className="ms-2">
                                                <span>{term.notes}</span>
                                            </div>
                                        </div>
                                        <div className='card-footer' style={{background: "#c1cad4"}}>
                                            <span className='fs-4 me-3'> {term.title} </span>
                                            <small> by: {term.user.name} </small>
                                            <span className='ms-4 text-decoration-underline' onClick={() => goToReviews(term)} style={{cursor: "pointer"}}>See reviews...</span>
                                            <div className='float-end'>
                                                {term.keywords.split(',').map((keyword, key) => {
                                                    return(
                                                        
                                                            (key <= 2) ? 
                                                            <span key={key} className='rounded rounded-pill text-light px-3 py-1 me-2' style={{backgroundColor: '#0D6FB9'}}> {keyword} </span> : null
                                                    )
                                                })}
                                                {(term.keywords.split(',').length > 3) ? <span> More.. </span> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    (props.user.userID === term.user.userID || props.user.role === "ROLE_ADMIN") ?
                                    <div className='col-md-1 d-flex flex-lg-column justify-content-center align-items-center mt-xs-4'>
                                        <BsPencilSquare onClick={() => addEditPost(term)}></BsPencilSquare>
                                        <BsTrash onClick={() => props.deleteCourse(term.courseID)} className='mt-lg-4 text-danger'></BsTrash> 
                                    </div> 
                                    : null
                                }
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
}

export default Posts;