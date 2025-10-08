import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ErrorMessage, Field } from "formik";

//assets
import logo from "../assets/Logo/logo.svg";
import "./loginAuth.css";
import { Formik } from "formik";
import * as Yup from "yup";

import AuthButton from "./Components/Button.jsx";
import Slider from "../Components/Common/Slider.jsx";
import { ToastContainer, toast } from "react-toastify";

// action
import { loginUser } from "../store/Actions/Auth/authActions.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Validation schema (using Yup for validation)
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      // .min(5, "Password must be at least 5 characters long")
      .required("Password is required"),
  });

  // Initial values for the form fields
  const initialValues = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (values) => {
    // dispatch(loginUser(values, navigate));
    const trimmedValues = {
      ...values,
      email: values.email.trim(),
    };
    dispatch(loginUser(trimmedValues, navigate));
  };

  const { loading } = useSelector((state) => state.auth);
  const { fullLogo } = useSelector((state) => state.settings);
  return (
    <>
      <ToastContainer />
      <div className="container-fluid ">
        <Row>
          <Col md={7} className="auth-col-1">
            <div>
              <Link to="/register">
                <img src={fullLogo || logo} alt="Logo" style={{ width: 130 }} />
              </Link>
            </div>

            <div style={{ marginTop: "30px" }}>
              <h4 className="authHeadings">
                Log in to{" "}
                <span className="society-highlight-color">Your Account</span>
              </h4>

              <p className="py-2 fw-medium" style={{ fontSize: "14px" }}>
                Enter your details to access your account
              </p>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => handleFormSubmit(values)}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group
                      controlId="email"
                      className="mb-3 col-11 col-sm-6"
                    >
                      <Form.Label className="fw-medium custom-label">
                        Username / Email <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        as={Form.Control}
                        autoComplete="off"
                        className="form-control-sm border-2 rounded-1"
                        name="email"
                        type="email"
                        placeholder="Enter your Email address"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger formik-error"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4 col-11 col-sm-6 position-relative">
                      <Form.Label className="fw-medium custom-label">
                        Password <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup>
                        <Field
                          autoComplete="off"
                          as={Form.Control}
                          className="rounded-1 pe-4 border-2 form-control-sm"
                          type={showPassword.confirm ? "text" : "password"}
                          name="password"
                          placeholder="***********"
                        />
                        <span
                          className="position-absolute end-0 top-50 translate-middle-y pe-3"
                          onClick={() => togglePasswordVisibility("confirm")}
                          style={{ cursor: "pointer", zIndex: 5 }}
                        >
                          {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </InputGroup>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger formik-error"
                      />
                    </Form.Group>

                    {/* Remember Me & Forgot Password */}
                    <div className="d-flex mb-4 col-11 col-sm-6 justify-content-between align-items-center">
                      <Form.Group>
                        <Form.Check
                          type="checkbox"
                          label="Remember me"
                          className="custom-checkbox custom-label fw-medium"
                        />
                      </Form.Group>
                      <Link
                        to="/forgot-password"
                        className="forgot-password fw-bold"
                        style={{ fontSize: "14px" }}
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <AuthButton
                      label={loading ? "Logging in..." : "Login"}
                      type="submit"
                      disabled={loading}
                    />
                  </Form>
                )}
              </Formik>

              <div className="userTypeSubText">
                <h6 className="fw-bold text-dark">
                  Don't Have an Account Yet?
                </h6>
                <span>
                  Get started in seconds -{" "}
                  <Link
                    to="/register"
                    className=" fw-medium"
                    style={{ textDecoration: "none" }}
                  >
                    Sign up now!
                  </Link>
                </span>
              </div>
            </div>
            <p
              className="mt-5 pb-3"
              style={{
                color: "rgba(164, 164, 164, 1)",
                fontWeight: 600,
                fontSize: "12px",
              }}
            >
              Copyright © {new Date().getFullYear()} Adz10x, All rights
              reserved.
            </p>
          </Col>

          <Slider />
        </Row>
      </div>
    </>
  );
};

export default LoginPage;
