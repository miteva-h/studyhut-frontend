import http from '../custom-axios/axios';

const StudyhutService = {
    fetchCategories:()=>{
      return http.get("/categories")
    },
    fetchAllCourses: () => {
        return http.get("/courses");
    },
    fetchCoursesByCategories: (categories)  => {
        const params = new URLSearchParams();
        params.append('categories', categories);
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
    fetchAllPostsForCourse: (courseId) => {
        return http.get(`/posts/searchByCourse?courseId=${courseId}`);
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
    searchPostsByKeyword: (data) => {
        const params = new URLSearchParams();
        params.append('data', data);
        return http.get('/posts/searchByKeywords', { params: data });
    },
    fetchComplaints: () => {
        return http.get("/complaints");
    },
    addComplaint: (data) => {
        const params = new URLSearchParams();
        params.append('data', data);
        return http.post("/complaints/createComplaint", { params: data });
    },
    deleteComplaint: (id) => {
        return http.delete(`/complaints/${id}/delete`);
    },
    fetchReviews: (id) => {
        return http.get(`/posts/${id}/reviews`);
    },
    addReview: (data) => {
        const params = new URLSearchParams();
        params.append('data', data);
        return http.post("/reviews/create",  data);
    },
    deleteReview: (id) => {
        return http.delete(`/reviews/${id}/delete`);
    }
}
export default StudyhutService;