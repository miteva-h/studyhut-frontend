import React from "react";
import {BsFillArrowUpLeftSquareFill} from "react-icons/bs";

const Courses = () => {
    return (
        <div className="container">
            <p className="text-decoration-underline fs-2 mt-5 ms-5">Courses</p>
            <div className="row  float-start mt-5" style={{width:"80%", borderRight:"1px solid grey"}}>
                    <div className="card p-0 m-3" style={{width: "18rem"}}>
                        <img
                            src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/cb/3c4030d65011e682d8b14e2f0915fa/shutterstock_226881610.jpg?auto=format%2Ccompress&dpr=1"
                            className="card-img-top" alt="course-photo"/>
                        <div className="card-body" style={{background: "#c1cad4"}}>
                            <div className="card-text float-start">Object-oriented programming</div>
                            <div className="float-end ms-2"><BsFillArrowUpLeftSquareFill></BsFillArrowUpLeftSquareFill>
                            </div>
                        </div>
                    </div>
                    <div className="card p-0 m-3" style={{width: "18rem"}}>
                        <img
                            src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/cb/3c4030d65011e682d8b14e2f0915fa/shutterstock_226881610.jpg?auto=format%2Ccompress&dpr=1"
                            className="card-img-top" alt="course-photo"/>
                        <div className="card-body" style={{background: "#c1cad4"}}>
                            <div className="card-text float-start">Object-oriented programming</div>
                            <div className="float-end ms-2"><BsFillArrowUpLeftSquareFill></BsFillArrowUpLeftSquareFill>
                            </div>
                        </div>
                    </div>
                    <div className="card p-0 m-3" style={{width: "18rem"}}>
                        <img
                            src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/cb/3c4030d65011e682d8b14e2f0915fa/shutterstock_226881610.jpg?auto=format%2Ccompress&dpr=1"
                            className="card-img-top" alt="course-photo"/>
                        <div className="card-body" style={{background: "#c1cad4"}}>
                            <div className="card-text float-start">Object-oriented programming</div>
                            <div className="float-end ms-2"><BsFillArrowUpLeftSquareFill></BsFillArrowUpLeftSquareFill>
                            </div>
                        </div>
                    </div>
                    <div className="card p-0 m-3" style={{width: "18rem"}}>
                        <img
                            src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/cb/3c4030d65011e682d8b14e2f0915fa/shutterstock_226881610.jpg?auto=format%2Ccompress&dpr=1"
                            className="card-img-top" alt="course-photo"/>
                        <div className="card-body" style={{background: "#c1cad4"}}>
                            <div className="card-text float-start">Object-oriented programming</div>
                            <div className="float-end ms-2"><BsFillArrowUpLeftSquareFill></BsFillArrowUpLeftSquareFill>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="float-end fs-4 d-flex justify-content-center" style={{width:"20%"}}>
                Categories:
            </div>
        </div>
    );
}

export default Courses;