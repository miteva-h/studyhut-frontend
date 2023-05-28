import { Formik } from "formik";
import * as Yup from "yup";
import logo from '../../studyHut.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Creating schema
const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
    repeatPassword: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

const RegisterPage = (props) => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <Formik
                validationSchema={schema}
                initialValues={{ email: "", password: "", repeatPassword: "" }}
                onSubmit={(values) => {
                    /** Handle submit */
                    values.username = values.email;
                    values.name = "User"
                    values.role = "ROLE_USER";
                    // navigate("/login")
                    console.log(values);
                    axios({
                        method: "POST",
                        url: "http://localhost:8080/register",
                        data: values,
                    }).then(response => {
                        if(response.status === 200){
                            navigate("/login");
                        }
                    })
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
                            <span>Register</span>
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
                            <input
                            type="password"
                            name="repeatPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.repeatPassword}
                            placeholder="Confirm password"
                            className="form-control"
                            />
                            {/* If validation is not passed show errors */}
                            <p className="error">
                            {errors.repeatPassword && touched.repeatPassword && errors.repeatPassword}
                            </p>
                            <button type="submit">Register</button>
                        </form>
                    </div>
                </div>
                )}
            </Formik>
        </div>
    );
}

export default RegisterPage;