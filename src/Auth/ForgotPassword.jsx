import React, { useRef } from "react";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import "../Pages/Styles/Auth.css";
import axios from "axios";
import logo from "../assets/logo.svg";
import OTPVerificationPage from "./OTPVerificationPage .jsx";
import api_routes from "../config/api.js";
import { toast, ToastContainer } from "react-toastify";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
//components
import AuthButton from "./Components/Button.jsx";
import Slider from "../Components/Common/Slider.jsx";
import { handleResetPassword } from "../store/Actions/Auth/authActions.js";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [ShowPassword, SetShowPassword] = useState(false);

  const togglePassword = () => {
    SetShowPassword((prev) => !prev);
  };

  const [ShowNewPassword, SetShowNewPassword] = useState(false);

  const toggleNewPassword = () => {
    SetShowNewPassword((prev) => !prev);
  };

  const registrationData = useRef({
    token: null,
    otp: null,
  });

  const [currentStep, setCurrentStep] = useState(1);
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

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const initialValues = {
    email: "",
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleFormSubmit = async (values) => {
    setIsSubmitting(true); // show loader

    try {
      const response = await axios.post(
        `${api_routes.common.post_forget_password}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Success:", response);
      // console.log("OTP:", response?.data?.otp);

      registrationData.current = response.data;

      localStorage.setItem("selectedCard", response?.data?.user_type);
      localStorage.setItem("auth_token", response?.data?.token);
      toast.success(response.data.message);
      handleNextStep();
    } catch (error) {
      console.log("Error:", error);

      let errorMessage = "Something went wrong. Please try again.";

      if (error.response) {
        // Server responded with a status outside 2xx
        errorMessage =
          error.response.data?.message || error.response.statusText;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage =
          "No response from server. Check your connection or try again later.";
      } else {
        // Something else happened in setting up the request
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false); // hide loader
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");
    const formData = {
      new_password: e.target.new_password.value,
      confirm_password: e.target.confirm_password.value,
      token,
    };

    // optional validation before sending to API
    if (formData.new_password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    await handleResetPassword(formData, setIsSubmitting, () => {
      // success callback (optional)
      // console.log("Password reset successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    });
  };

  const { fullLogo } = useSelector((state) => state.settings);
  return (
    <>
      <ToastContainer />
      <div className="container-fluid ">
        <Row>
          <Col md={7} className="auth-col-1">
            <div>
              <Link to="/register">
                <img src={fullLogo || logo} alt="Logo" style={{ width: 120 }} />
              </Link>
            </div>

            {currentStep === 1 && (
              <div style={{ marginTop: "30px" }}>
                <h4 className="authHeadings">
                  Forgot{" "}
                  <span className="society-highlight-color">Password</span>
                </h4>

                <p className="py-2 fw-medium custom-label">
                  Don’t Worry, We’ll Send Instructions For Resetting <br /> Your
                  Password!
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
                        <Form.Label className="fw-medium custom-label mb-3">
                          Username / Email{" "}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Field
                          as={Form.Control}
                          className="form-control-sm"
                          type="email"
                          name="email"
                          placeholder="Enter your Email address"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger formik-error"
                        />
                      </Form.Group>
                      {/* <AuthButton label={"RESET PASSWORD"} type="submit" /> */}
                      <AuthButton
                        label={
                          isSubmitting ? "Please wait..." : "RESET PASSWORD"
                        }
                        type="submit"
                        disabled={isSubmitting}
                      />
                    </Form>
                  )}
                </Formik>

                <Typography
                  color="textSecondary"
                  className="userTypeSubText text-dark fw-bold"
                >
                  <svg
                    className="me-1"
                    width="6"
                    height="12"
                    viewBox="0 0 8 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.80006 1.81442L1.15723 7.45726L6.80007 13.1001"
                      stroke="black"
                      strokeWidth="2.18348"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Back to{" "}
                  <Link
                    to="/login"
                    className=" fw-medium"
                    style={{ textDecoration: "none" }}
                  >
                    Login
                  </Link>
                </Typography>
              </div>
            )}

            {currentStep === 2 && (
              <OTPVerificationPage
                handleNextStep={handleNextStep}
                registrationData={registrationData}
              />
            )}

            {currentStep === 3 && (
              <div style={{ marginTop: "30px" }}>
                <h4 className="authHeadings">
                  Reset{" "}
                  <span className="society-highlight-color">Password</span>
                </h4>
                <p className="py-2 fw-medium custom-label">
                  Forgot Your Password ? No worries we've got <br /> you
                  covered.
                </p>
                <Form onSubmit={handlePasswordChange}>
                  {/* <Form.Group className="mb-3 col-6">
                    <Form.Label className="fw-medium custom-label mb-1">
                      New Password
                    </Form.Label>
                    <Form.Control
                      className="form-control-sm"
                      type="password"
                      name="new_password"
                      placeholder="New Password"
                    />
                  </Form.Group> */}
                  <Form.Group className="mb-3 col-6 position-relative">
                    <Form.Label className="fw-medium custom-label mb-1">
                      New Password
                    </Form.Label>
                    <Form.Control
                      className="form-control-sm pe-5"
                      type={ShowNewPassword ? "text" : "password"}
                      name="new_password"
                      placeholder="New Password"
                    />
                    <span
                      onClick={toggleNewPassword}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "30px",
                        cursor: "pointer",
                      }}
                    >
                      {ShowNewPassword ? <EyeSlashFill /> : <EyeFill />}
                    </span>
                  </Form.Group>
                  {/* <Form.Group className="mb-3 col-6">
                    <Form.Label className="fw-medium custom-label mb-1">
                      Repeat Password
                    </Form.Label>
                    <Form.Control
                      className="form-control-sm"
                      type="password"
                      name="confirm_password"
                      placeholder="Confirm Password"
                    />
                  </Form.Group> */}
                  <Form.Group className="mb-3 col-6 position-relative">
                    <Form.Label className="fw-medium custom-label mb-1">
                      Repeat Password
                    </Form.Label>
                    <Form.Control
                      className="form-control-sm pe-5"
                      type={ShowPassword ? "text" : "password"}
                      name="confirm_password"
                      placeholder="Confirm Password"
                    />
                    <span
                      onClick={togglePassword}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "30px",
                        cursor: "pointer",
                      }}
                    >
                      {ShowPassword ? <EyeSlashFill /> : <EyeFill />}
                    </span>
                  </Form.Group>
                  <AuthButton
                    label={isSubmitting ? "Please wait..." : "RESET PASSWORD"}
                    type="submit"
                  />
                </Form>
                <Typography
                  color="textSecondary"
                  className="userTypeSubText text-dark fw-bold"
                >
                  <svg
                    className="me-1"
                    width="6"
                    height="12"
                    viewBox="0 0 8 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.80006 1.81442L1.15723 7.45726L6.80007 13.1001"
                      stroke="black"
                      strokeWidth="2.18348"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Back to{" "}
                  <Link
                    to="/login"
                    className=" fw-medium"
                    style={{ textDecoration: "none" }}
                  >
                    Login
                  </Link>
                </Typography>
              </div>
            )}

            <p
              className="mt-5 pb-3"
              style={{
                color: "rgba(164, 164, 164, 1)",
                fontWeight: 600,
                fontSize: "12px",
                position: "absolute",
                bottom: "0",
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

export default ForgotPassword;
