import React, {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from "../Header/header";
import HomePage from "../Home/home";
import Courses from "../Courses/CoursesList/courses";
import Review from "../Reviews/reviews";
import LoginPage from "../Auth/Login";
import RegisterPage from "../Auth/Register";
import AddPost from "../Posts/PostAdd/addPost";
import StudyhutService from "../../repository/studyhutRepository";
import AddComplaint from "../Complaints/ComplaintAdd/addComplaint.js";
import data from "bootstrap/js/src/dom/data";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            allCourses: [],
            coursesByCategory: [],
            course: {},
            postsForCourse: [],
            postsByKeyword: [],
            post: {},
            complaints: [],
            complaint: {},
            reviews: []
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Header/>
                <main>
                    <Routes>
                        {["/", "/home"].map((path, index) => {
                            return (
                                <Route key={index}
                                       path={path}
                                       element={
                                           <AddPost/>
                                       }/>
                            )
                        })}
                        <Route path="/courses"
                               element={<Courses courses={this.state.allCourses}
                                                 categories={this.state.categories}
                                                 onGetCoursesByCategory={this.loadCoursesByCategories}/>}/>
                        <Route path="/reviews"
                               element={<Review reviews={this.state.reviews}
                                                onAddReview={this.addReview}
                                                onDeleteReview={this.deleteReview}/>}/>
                        <Route path="/login"
                               element={<LoginPage/>}/>
                        <Route path="/register"
                               element={<RegisterPage/>}/>
                        <Route path="/complaint"
                               element={<AddComplaint/>}/>
                    </Routes>
                </main>
            </BrowserRouter>
        )
    }


    loadCategories = () => {
        StudyhutService.fetchCategories()
            .then((data) => {
                this.setState({categories: data.data})
            });
    }

    loadAllCourses = () => {
        StudyhutService.fetchAllCourses()
            .then((data) => {
                this.setState({allCourses: data.data})
            });
    }

    loadCoursesByCategories = (categories) => {
        StudyhutService.fetchCoursesByCategories(categories)
            .then((data) => {
                this.setState({allCourses: data.data})
            });
    }

    addCourse = (name, picture, category) => {
        StudyhutService.addCourse(name, picture, category)
            .then(() => {
                this.loadAllCourses();
            });
    }

    editCourse = (id, name, picture) => {
        StudyhutService.editCourse(id, name, picture)
            .then(() => {
                this.loadAllCourses();
            });
    }

    deleteCourse = (id) => {
        StudyhutService.deleteCourse(id)
            .then(() => {
                this.loadAllCourses();
            });
    }

    loadAllPostsForCourse = (course) => {
        StudyhutService.fetchAllPostsForCourse(course)
            .then((data) => {
                this.setState({postsForCourse: data.data})
            });
    }

    addPostForCourse = (title, keywords, notes, courseId, username) => {
        StudyhutService.addPostForCourse(title, keywords, notes, courseId, username)
            .then(() => {
                this.loadAllPostsForCourse(courseId);
            });
    }

    editPostForCourse = (id, title, keywords, notes, courseId) => {
        StudyhutService.editPostForCourse(id, title, keywords, notes)
            .then(() => {
                this.loadAllPostsForCourse(courseId);
            });
    }

    deletePost = (id, courseId) => {
        StudyhutService.deletePost(id)
            .then(() => {
                this.loadAllPostsForCourse(courseId);
            });
    }

    searchPostsByKeyword = (keyword) => {
        StudyhutService.searchPostsByKeyword(keyword)
            .then((data) => {
                this.setState({postsByKeyword: data.data})
            });
    }

    loadComplaints = () => {
        StudyhutService.fetchComplaints()
            .then((data) => {
                this.setState({complaints: data.data})
            });
    }

    addComplaint = (content, username) => {
        StudyhutService.addComplaint(content, username)
            .then(() => {
                this.loadAllCourses();
            });
    }

    deleteComplaint = (id) => {
        StudyhutService.deleteComplaint(id)
            .then(() => {
                this.loadComplaints();
            });
    }

    loadReviews = (id) => {
        StudyhutService.fetchReviews(id)
            .then((data) => {
                this.setState({reviews: data.data})
            });
    }

    addReview = (reviewText, rating, username, post) => {
        StudyhutService.addReview(reviewText, rating, username, post)
            .then(() => {
                this.loadReviews(post);
            });
    }

    deleteReview = (id, post) => {
        StudyhutService.deleteReview(id)
            .then(() => {
                this.loadReviews(post);
            });
    }

    componentDidMount() {
        this.loadCategories();
        this.loadAllCourses();
    }


}

export default App;
