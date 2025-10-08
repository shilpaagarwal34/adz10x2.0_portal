import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import OTPInput from "./Components/OTPInput.jsx";
import CountdownTimer from "./Components/CountDownTimer.jsx";
import { societyResendOtp } from "../store/Actions/Auth/authActions.js";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.svg"
import { useSelector } from "react-redux";
import Slider from "../Components/Common/Slider.jsx";

const OTPVerificationPage = ({
  handleNextStep,
  registrationData: passedRef,
}) => {
  const location = useLocation();
  const registrationData = passedRef || useRef({});

  const [loading, setLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [canResend, setCanResend] = useState(false); // Initially false to hide resend button
  const [timerReset, setTimerReset] = useState(false); // Flag for resetting the timer
  const { fullLogo } = useSelector((state) => state.settings);


  useEffect(() => {
    if (!registrationData.current?.otp && location.state?.registrationData) {
      registrationData.current = location.state.registrationData;
    }

    if (location.state?.registrationData?.otp) {
      const otpArray = location.state.registrationData.otp
        .toString()
        .padStart(6, "0")
        .split("");
      setOtp(otpArray);
    }
  }, [location.state]);

  const handleResendOTP = async () => {
    setLoading(true);
    setResendSuccess(null);
    setErrorMessage(null);
    setCanResend(false); // Hide the resend button immediately after it's clicked

    try {
      const response = await societyResendOtp();

      if (response.status === 200) {
        setResendSuccess(true);
        setOtp(response?.data?.data?.otp?.toString().split("") || []); // Ensure otp is an array
        toast.success(response.data.message);
        setTimerReset(true); // Reset the timer
      } else {
        setErrorMessage(
          response?.data?.message || "Failed to resend OTP. Please try again."
        );
        toast.error(
          response?.data?.message || "Failed to resend OTP. Please try again."
        );
        setResendSuccess(false);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while resending OTP. Please try again."
      );
      setResendSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeUp = () => {
    setCanResend(true); // Show the resend option when timer reaches 0
    setTimerReset(false); // Reset timer reset flag
  };

  return (
    <>
      {location.pathname === "/verify-otp" ? (
        <div className="container-fluid">
          <ToastContainer />
          <Row>
            <Col md={7} className="auth-col-1" style={{ zIndex: 0 }}>
              <div style={{ marginBottom: 20 }}>
                <img
                  onClick={() => navigate("/register")}
                  src={fullLogo || logo}
                  alt="Logo"
                  style={{ width: 130 }}
                />
              </div>

              <div style={{ marginTop: "80px", marginBottom: "20px" }}>
                <h4 className="fw-bold">
                  OTP{" "}
                  <span className="society-highlight-color">Verification</span>
                </h4>
                <p className="custom-label">
                  A verification code has been sent to your email, WhatsApp.{" "}
                  <br />
                  Please check and enter it here.
                </p>
                <Row className="mt-4">
                  <Col xs={12} md={7}>
                    <OTPInput
                      handleNextStep={handleNextStep}
                      otp={otp}
                      setOtp={setOtp}
                    />
                    <CountdownTimer
                      onTimeUp={handleTimeUp}
                      timerReset={timerReset}
                    />

                    {/* Resend OTP Section */}
                    {canResend && (
                      <div className="mt-3 ">
                        <span className="fw-bold" style={{ fontSize: "14px" }}>
                          Didn't get the code?{" "}
                          <a
                            href="#"
                            style={{
                              fontWeight: "bold",
                              textDecoration: "underline",
                              color: "#007bff",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              handleResendOTP();
                            }}
                            disabled={loading}
                          >
                            {loading ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              "Resend"
                            )}
                          </a>
                        </span>
                      </div>
                    )}
                  </Col>
                </Row>
              </div>

              <p className="mt-5 pb-3 copyRight">
                © {new Date().getFullYear()} Adz10x.com. All rights reserved. A
                proprietary platform of Ananta Consultancy.
              </p>
            </Col>

            <Slider />
          </Row>
        </div>
      ) : (
        <div style={{ marginTop: "80px", marginBottom: "20px" }}>
          <h4 className="fw-bold">
            OTP <span className="society-highlight-color">Verification</span>
          </h4>
          <p className="custom-label">
            A verification code has been sent to your email, WhatsApp. <br />
            Please check and enter it here.
          </p>
          <Row className="mt-4">
            <Col xs={12} md={7}>
              <OTPInput
                handleNextStep={handleNextStep}
                otp={otp}
                setOtp={setOtp}
              />
              <CountdownTimer onTimeUp={handleTimeUp} timerReset={timerReset} />
              {canResend && (
                <div className="mt-3 ">
                  <span className="fw-bold" style={{ fontSize: "14px" }}>
                    Didn't get the code?{" "}
                    <a
                      href="#"
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                        color: "#007bff",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleResendOTP();
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Resend"
                      )}
                    </a>
                  </span>
                </div>
              )}
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default OTPVerificationPage;
