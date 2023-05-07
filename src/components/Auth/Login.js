import { Formik } from "formik";
import * as Yup from "yup";
import logo from '../../studyHut.png';
import { useNavigate } from "react-router-dom";

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

    return (
        <div className="container">
            <Formik
                validationSchema={schema}
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => {
                    /** Handle submit */
                    localStorage.setItem("auth_token", "1")
                    alert(JSON.stringify(values))
                    navigate("/");
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
                <div className="login row mx-0">
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
                            <a href="/register">Dont have an account? Register</a>
                        </form>
                    </div>
                </div>
                )}
            </Formik>
        </div>
    );
}

export default LoginPage;