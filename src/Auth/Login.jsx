import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ErrorMessage, Field } from "formik";

import logo from "../assets/Logo/logo.svg";
import "./loginAuth.css";
import { Formik } from "formik";
import * as Yup from "yup";

import AuthButton from "./Components/Button.jsx";
import Slider from "../Components/Common/Slider.jsx";
import { ToastContainer, toast } from "react-toastify";
import CountdownTimer from "./Components/CountDownTimer.jsx";

import { loginUser, sendLoginOtp, loginWithOtp } from "../store/Actions/Auth/authActions.js";

const MOBILE_REGEX = /^[6-9]\d{9}$/;

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginMode, setLoginMode] = useState("email"); // "email" | "otp"
  const [otpStep, setOtpStep] = useState("mobile"); // "mobile" | "verify"
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimerReset, setResendTimerReset] = useState(false);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(""));
  const otpInputRefs = useRef([]);

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  const initialValues = { email: "", password: "" };

  const handleEmailLogin = async (values) => {
    const trimmedValues = { ...values, email: values.email.trim() };
    dispatch(loginUser(trimmedValues, navigate));
  };

  const handleSendOtp = async () => {
    const raw = mobile.replace(/\D/g, "").slice(-10);
    if (!MOBILE_REGEX.test(raw)) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }
    setOtpLoading(true);
    try {
      await sendLoginOtp(raw);
      toast.success("OTP sent to your mobile");
      setOtpStep("verify");
      setOtpSent(true);
      setOtpDigits(Array(6).fill(""));
      setResendTimerReset(true);
      setCanResendOtp(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    await handleSendOtp();
  };

  const handleOtpChange = (e, index) => {
    const v = e.target.value;
    if (!/^\d?$/.test(v)) return;
    const next = [...otpDigits];
    next[index] = v;
    setOtpDigits(next);
    if (v && index < 5) otpInputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otp = otpDigits.join("");
    if (otp.length !== 6) {
      toast.error("Enter the 6-digit OTP");
      return;
    }
    const rawMobile = mobile.replace(/\D/g, "").slice(-10);
    dispatch(loginWithOtp(rawMobile, otp, navigate));
  };

  const isOtpComplete = otpDigits.every((d) => d !== "");

  useEffect(() => {
    if (!resendTimerReset) return;
    const t = setTimeout(() => setResendTimerReset(false), 400);
    return () => clearTimeout(t);
  }, [resendTimerReset]);

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
                {loginMode === "email"
                  ? "Enter your details to access your account"
                  : "Use your mobile number to receive an OTP and log in"}
              </p>

              {/* Login method toggle */}
              <div className="login-mode-toggle mb-4 col-11 col-sm-6">
                <button
                  type="button"
                  className={`login-mode-btn ${loginMode === "email" ? "active" : ""}`}
                  onClick={() => {
                    setLoginMode("email");
                    setOtpStep("mobile");
                    setOtpSent(false);
                  }}
                >
                  Email & Password
                </button>
                <button
                  type="button"
                  className={`login-mode-btn ${loginMode === "otp" ? "active" : ""}`}
                  onClick={() => {
                    setLoginMode("otp");
                    setOtpStep("mobile");
                    setOtpSent(false);
                    setOtpDigits(Array(6).fill(""));
                  }}
                >
                  Mobile & OTP
                </button>
              </div>

              {loginMode === "email" && (
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleEmailLogin}
                >
                  {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="email" className="mb-3 col-11 col-sm-6">
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
              )}

              {loginMode === "otp" && (
                <>
                  {otpStep === "mobile" && (
                    <div className="col-11 col-sm-6">
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-medium custom-label">
                          Mobile number <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          autoComplete="tel"
                          className="form-control-sm border-2 rounded-1"
                          placeholder="Enter 10-digit mobile number"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          maxLength={14}
                        />
                        <Form.Text className="text-muted" style={{ fontSize: "12px" }}>
                          We'll send a one-time password to this number
                        </Form.Text>
                      </Form.Group>
                      <AuthButton
                        label={otpLoading ? "Sending OTP..." : "Send OTP"}
                        type="button"
                        disabled={otpLoading}
                        onClick={handleSendOtp}
                      />
                    </div>
                  )}

                  {otpStep === "verify" && (
                    <div className="col-11 col-sm-6">
                      <p className="fw-medium custom-label mb-2">
                        Enter OTP sent to ******{mobile.replace(/\D/g, "").slice(-4) || "****"}
                      </p>
                      <Form onSubmit={handleVerifyOtp}>
                        <div className="d-flex gap-1 gap-sm-2 mb-3 flex-wrap">
                          {otpDigits.map((d, i) => (
                            <Form.Control
                              key={i}
                              ref={(el) => (otpInputRefs.current[i] = el)}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={d}
                              onChange={(e) => handleOtpChange(e, i)}
                              onKeyDown={(e) => handleOtpKeyDown(e, i)}
                              className="text-center rounded-1 border-2 flex-grow-0"
                              style={{
                                width: "2.5rem",
                                fontSize: "1.1rem",
                                borderColor: d ? "#019F88" : "#ced4da",
                              }}
                            />
                          ))}
                        </div>
                        <CountdownTimer
                          onTimeUp={() => setCanResendOtp(true)}
                          timerReset={resendTimerReset}
                        />
                        {canResendOtp && (
                          <button
                            type="button"
                            className="btn btn-link p-0 mb-2 text-primary fw-bold"
                            style={{ fontSize: "14px" }}
                            onClick={() => {
                              setResendTimerReset(true);
                              setCanResendOtp(false);
                              handleResendOtp();
                            }}
                          >
                            Resend OTP
                          </button>
                        )}
                        <div className="d-flex gap-2 flex-wrap align-items-center mt-2">
                          <AuthButton
                            label={loading ? "Verifying..." : "Verify & Login"}
                            type="submit"
                            disabled={!isOtpComplete || loading}
                          />
                          <button
                            type="button"
                            className="btn btn-link p-0 text-secondary"
                            style={{ fontSize: "14px" }}
                            onClick={() => {
                              setOtpStep("mobile");
                              setOtpSent(false);
                            }}
                          >
                            Change number
                          </button>
                        </div>
                      </Form>
                    </div>
                  )}
                </>
              )}

              <div className="userTypeSubText">
                <h6 className="fw-bold text-dark">Don't Have an Account Yet?</h6>
                <span>
                  Get started in seconds -{" "}
                  <Link to="/register" className="fw-medium" style={{ textDecoration: "none" }}>
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
              Copyright © {new Date().getFullYear()} Adz10x, All rights reserved.
            </p>
          </Col>

          <Slider />
        </Row>
      </div>
    </>
  );
};

export default LoginPage;
