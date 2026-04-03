import { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// swiper
import React from "react";
import "swiper/css";
import "swiper/css/autoplay";

//assets
import logo from "../assets/logo.svg";
import "./Auth.css";

//components
import AuthButton from "./Components/Button.jsx";
import UserType from "./Components/UserType.jsx";
import ConfirmAccount from "./Components/ConfirmAccount.jsx";
import Slider from "../Components/Common/Slider.jsx";

//pages
import SocietyRegisterForm from "./SocietyRegisterForm.jsx";
import CompanyRegsiterForm from "./CompanyRegsiterForm.jsx";
import OTPVerificationPage from "./OTPVerificationPage .jsx";
import { useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = parseInt(searchParams.get("step") || "1", 10); // Default to step 1 if no query param
  const signupType = searchParams.get("type");
  const registrationData = useRef({
    token: null,
    otp: null,
  });

  // Check if selectedCard exists in localStorage
  const persistedCard = localStorage.getItem("selectedCard");
  const [selectedCard, setSelectedCard] = useState(
    signupType === "company"
      ? 2
      : signupType === "society"
      ? 1
      : persistedCard
      ? parseInt(persistedCard, 10)
      : 1
  );

  useEffect(() => {
    if (signupType === "company") {
      setSelectedCard(2);
      localStorage.setItem("selectedCard", "2");
      return;
    }

    if (signupType === "society") {
      setSelectedCard(1);
      localStorage.setItem("selectedCard", "1");
    }
  }, [signupType]);

  useEffect(() => {
    const typeFromCard = selectedCard === 2 ? "company" : "society";
    setSearchParams({ step: currentStep.toString(), type: typeFromCard });
  }, [currentStep, selectedCard, setSearchParams]);

  // Ensure proper navigation for back/forward browser buttons
  useEffect(() => {
    const handlePopState = () => {
      const stepFromURL = parseInt(searchParams.get("step") || "1", 10);
      if (stepFromURL !== currentStep) {
        setSearchParams({ step: stepFromURL.toString() });
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [currentStep, searchParams, setSearchParams]);

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
    // Persist the selected card to localStorage
    localStorage.setItem("selectedCard", cardId);
  };

  // Handle next step
  const handleNextStep = () => {
    const typeFromCard = selectedCard === 2 ? "company" : "society";
    setSearchParams({ step: (currentStep + 1).toString(), type: typeFromCard });
  };

  const { fullLogo } = useSelector((state) => state.settings);

  return (
    <>
      <div className="container-fluid">
        <ToastContainer />
        <Row>
          <Col md={7} className="auth-col-1" style={{ zIndex: 0 }}>
            <div style={{ marginBottom: 20 }}>
              <div>
                <img
                  onClick={() => navigate("/register")}
                  src={fullLogo || logo}
                  alt="Logo"
                  style={{ width: 130 }}
                />
              </div>
            </div>

            {/* Step-wise rendering */}
            {currentStep === 1 && (
              <>
                <UserType
                  selectedCard={selectedCard}
                  handleCardClick={handleCardClick}
                />
                <AuthButton
                  label={"GO TO SIGN UP"}
                  onClick={handleNextStep}
                  disabled={selectedCard === null}
                />
                <Typography color="textSecondary" className="userTypeSubText">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="fw-medium"
                    style={{ textDecoration: "none" }}
                  >
                    Log in
                  </Link>
                </Typography>
              </>
            )}

            {currentStep === 2 && (
              <>
                {selectedCard === 2 ? (
                  <CompanyRegsiterForm
                    handleNextStep={handleNextStep}
                    registrationData={registrationData}
                  />
                ) : (
                  <SocietyRegisterForm
                    handleNextStep={handleNextStep}
                    registrationData={registrationData}
                  />
                )}
              </>
            )}

            {currentStep === 3 && (
              <OTPVerificationPage
                handleNextStep={handleNextStep}
                registrationData={registrationData}
              />
            )}

            {currentStep === 4 && (
              <>
                <ConfirmAccount />
              </>
            )}

            <p className="mt-5 pb-3 copyRight">
              © {new Date().getFullYear()} Adz10x.com. All rights reserved. A
              proprietary platform of Ananta Consultancy.
            </p>
          </Col>

          <Slider />
        </Row>
      </div>
    </>
  );
};

export default Register;
