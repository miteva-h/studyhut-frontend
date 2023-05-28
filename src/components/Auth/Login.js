import { Formik } from "formik";
import * as Yup from "yup";
import logo from '../../studyHut.png';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

// Creating schema
const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  });

  
const LoginPage = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Update the document title using the browser API
        if(Object.keys(props.user).length > 0){
            navigate("/");
        }
    }, []);
    
    return (
        <div className="container">
            <Formik
                validationSchema={schema}
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => {
                    /** Handle submit */
                    values.username = values.email;
                    axios({
                        method: "POST",
                        url: "http://localhost:8080/login/post",
                        data: values,
                    }).then(response => {
                        if(response.status === 200){
                            props.updateUser(response.data);
                            sessionStorage.setItem("JWT", "1")
                            navigate('/');
                        }
                    });
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
                <div className="login row mx-0 justify-content-center">
                    <img className="col-md-6 col-sm-12 col-xs-12" 
                        alt="logo"
                        src={logo}
                        style={{
                            width: '50%',
                            height: '50%'
                        }}
                    />
                    <div className="form col-md-6 col-sm-12 col-xs-12">
                    {/* Passing handleSubmit parameter to html form onSubmit property */}
                        <form noValidate onSubmit={handleSubmit} className="flex-center">
                            <span>Login</span>
                        {/* Input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                            <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Enter email / username"
                            className="form-control inp_text"
                            id="email"
                            />
                            {/* If validation is not passed show errors */}
                            <p className="error">
                            {errors.email && touched.email && errors.email}
                            </p>
                            {/* Input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                            <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder="Enter password"
                            className="form-control"
                            />
                            {/* If validation is not passed show errors */}
                            <p className="error">
                            {errors.password && touched.password && errors.password}
                            </p>
                            <button type="submit">Login</button>
                            <Link to="/register">
                                <span className="fs-5">Dont have an account? Register</span>
                            </Link>
                        </form>
                    </div>
                </div>
                )}
            </Formik>
        </div>
    );
}

export default LoginPage;