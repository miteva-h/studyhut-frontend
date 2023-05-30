import React, {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from "../Header/header";
import HomePage from "../Home/home";
import Courses from "../Courses/CoursesList/courses";
import Posts from "../Posts/PostList/posts";
import Review from "../Reviews/reviews";
import LoginPage from "../Auth/Login";
import RegisterPage from "../Auth/Register";
import AddPost from "../Posts/PostAdd/addPost";
import StudyhutService from "../../repository/studyhutRepository";
import AddComplaint from "../Complaints/ComplaintAdd/addComplaint.js";
import data from "bootstrap/js/src/dom/data";
import Protected from "../Auth/Protected";
import CourseForm from "../Courses/CourseAdd/addCourse";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            allCourses: [],
            allCoursesHelper: [],
            course: {},
            user: {},
            isSignedIn: false,
            postsForCourse: [],
            postsByKeyword: [],
            post: {},
            complaints: [],
            complaint: {},
            reviews: []
        }
    }

    updateCourse = (newCourse) => {
        this.setState({ course: newCourse});
        this.loadAllPostsForCourse(newCourse.id);
    }

    updatePost = (newPost) => {
        this.setState({ post: newPost});
    }

    updateCourses = (newCourses) => {
        console.log(newCourses);
        if(newCourses.length > 0){
            this.setState({ allCourses: newCourses});
        }
        else{
            this.loadAllCourses();
        }
    }

    updateUser = (newUser) => {
        this.setState({ user: newUser });
        if(Object.keys(newUser).length > 0){
            this.setState({isSignedIn: true});
        }
        else{
            this.setState({isSignedIn: false});
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Header user={this.state.user}
                        updateUser={this.updateUser}
                />
                <main>
                    <Routes>
                        {["/", "/home"].map((path, index) => {
                            return (
                                <Route key={index}
                                       path={path}
                                       element={
                                        <Protected isSignedIn={this.state.isSignedIn}>
                                            <HomePage user={this.state.user}/>
                                        </Protected>
                                       }/>
                            )
                        })}
                        <Route path="/courses"
                               element={
                                    <Protected isSignedIn={this.state.isSignedIn}>
                                        <Courses courses={this.state.allCourses}
                                                    coursesHelper={this.state.allCoursesHelper}
                                                    categories={this.state.categories}
                                                    updateCourse={this.updateCourse}
                                                    user={this.state.user}
                                                    deleteCourse={this.deleteCourse}
                                                    onGetCoursesByCategory={this.loadCoursesByCategories}
                                                    doNewCourse={this.newCourse}
                                                    updateCourses={this.updateCourses}/>
                                    </Protected>
                                }/>
                        <Route path="/courses/add-edit"
                               element={
                                    <Protected isSignedIn={this.state.isSignedIn}>
                                        <CourseForm course={this.state.course}
                                                    categories={this.state.categories}
                                                    user={this.state.user}
                                                    loadCategories={this.loadAllCourses}
                                                    newCourse={this.state.newCourse}
                                                    />
                                    </Protected>
                                }/>
                        <Route path="/reviews"
                               element={
                                    <Protected isSignedIn={this.state.isSignedIn}>
                                        <Review reviews={this.state.reviews}
                                                    user={this.state.user}
                                                    post={this.state.post}
                                                    loadReviews={this.loadReviews}
                                                    onAddReview={this.addReview}
                                                    onDeleteReview={this.deleteReview}/>
                                    </Protected>
                                }/>
                        <Route path="/login"
                               element={<LoginPage user={this.state.user} 
                                                updateUser={this.updateUser}   
                               />}/>
                        <Route path="/register"
                               element={<RegisterPage user={this.state.user}
                               />}/>
                        <Route path="/complaint"
                               element={
                                <Protected isSignedIn={this.state.isSignedIn}>
                                    <AddComplaint user={this.state.user}
                                                addComplaint={this.addComplaint}
                                    />
                                </Protected>
                               }/>
                        <Route path="/posts"
                                element={
                                    <Protected isSignedIn={this.state.isSignedIn}>
                                        <Posts
                                            course={this.state.course}
                                            posts={this.state.postsForCourse}
                                            user={this.state.user}
                                            categories={this.state.categories}
                                            loadPosts={this.loadAllPostsForCourse}
                                            updatePost={this.updatePost}
                                            searchPostsByKeywords={this.searchPostsByKeyword}
                                            loadAllPostsForCourse={this.loadAllPostsForCourse}
                                            />
                                    </Protected>
                                }
                                />
                        <Route path="/posts/add-edit"
                                element={
                                    <Protected isSignedIn={this.state.isSignedIn}>
                                        <AddPost 
                                            course={this.state.course}
                                            post={this.state.post}
                                            user={this.state.user}
                                            updatePost={this.updatePost}
                                        />
                                    </Protected>
                                }
                        />
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
                this.setState({allCoursesHelper: data.data})
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

    loadAllPostsForCourse = (courseId) => {
        StudyhutService.fetchAllPostsForCourse(courseId)
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

    searchPostsByKeyword = (data) => {
        StudyhutService.searchPostsByKeyword(data)
            .then((data) => {
                this.setState({postsForCourse: data.data})
            });
    }

    loadComplaints = () => {
        StudyhutService.fetchComplaints()
            .then((data) => {
                this.setState({complaints: data.data})
            });
    }

    addComplaint = (content, username) => {
        let data = {
            content: content,
            username: username
        }
        StudyhutService.addComplaint(data)
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

    addReview = (data) => {
        StudyhutService.addReview(data)
            .then(() => {
                this.loadReviews(data.postId);
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
