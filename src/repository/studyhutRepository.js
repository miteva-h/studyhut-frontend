import http from '../custom-axios/axios';

const StudyhutService = {
    fetchCategories:()=>{
      return http.get("/courses/categories")
    },
    fetchAllCourses: () => {
        return http.get("/courses");
    },
    fetchCoursesByCategories: (categories)  => {
        const params = new URLSearchParams();
        categories.forEach(category => params.append('category', category));
        return http.get("/courses/filter", { params: params });
    },
    addCourse: (name, picture, category) => {
        return http.post("/courses/create", {
            "name": name,
            "picture": picture,
            "category": category
        });
    },
    editCourse: (id, name, picture) => {
        return http.put(`/courses/${id}/edit`, {
            "name": name,
            "picture": picture
        })
    },
    deleteCourse: (id) => {
        return http.delete(`/courses/${id}/delete`);
    },
    fetchAllPostsForCourse: (course) => {
        return http.get(`/${course}`);
    },
    addPostForCourse: (title, keywords, notes, courseId, username) => {
        return http.post(`/${courseId}`, {
            "title": title,
            "keywords": keywords,
            "notes": notes,
            "username": username
        });
    },
    editPostForCourse: (id, title, keywords, notes) => {
        return http.put(`/${id}`, {
            "title": title,
            "keywords": keywords,
            "notes": notes
        });
    },
    deletePost: (id) => {
        return http.delete(`/${id}`);
    },
    searchPostsByKeyword: (keyword) => {
        return http.get(`/${keyword}`);
    },
    fetchComplaints: () => {
        return http.get("/complaints");
    },
    addComplaint: (content, username) => {
        return http.post("/complaints/createComplaint", {
            "content": content,
            "username": username
        });
    },
    deleteComplaint: (id) => {
        return http.delete(`/complaints/${id}/delete`);
    },
    fetchReviews: (id) => {
        return http.get(`/posts/${id}/reviews`);
    },
    addReview: (reviewText, rating, username, post) => {
        return http.post("/reviews/create", {
            "reviewText": reviewText,
            "rating": rating,
            "username": username,
            "post": post
        });
    },
    deleteReview: (id) => {
        return http.delete(`/reviews/${id}/delete`);
    }
}
export default StudyhutService;