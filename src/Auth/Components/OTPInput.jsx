import React, { useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import AuthButton from "./Button.jsx";
import api_routes from "../../config/api.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/Slice/Auth/authSlice.js";
import { toast } from "react-toastify";

const OTPInput = ({ handleNextStep = null, otp, setOtp }) => {
  const [error, setError] = useState([]);
  const [isValid, setIsValid] = useState(true); // For validation
  const inputRefs = useRef([]);
  const [otpState, setOtpState] = useState(Array(6).fill("")); // Initialize OTP state to empty fields
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Update OTP state if the prop otp changes (e.g., after resend)
  // useEffect(() => {
  //   if (Array.isArray(otp) && otp.length === 6) {
  //     setOtpState(otp); // Update OTP state when new OTP is received
  //   }
  // }, [otp]);

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otpState];
      newOtp[index] = value;
      setOtpState(newOtp);

      // Move to the next input field if a digit is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpState[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Validate OTP fields before submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError([]);

    // Check if otpState is an array and verify if all OTP fields are filled
    const isOtpComplete =
      Array.isArray(otpState) && otpState.every((digit) => digit !== "");
    setIsValid(isOtpComplete); // Set valid state based on OTP completeness
    if (isOtpComplete) {
      try {
        const token = localStorage.getItem("auth_token");
        const selectedCard = localStorage.getItem("selectedCard");

        let response;
        if (
          selectedCard == 1 ||
          selectedCard === "Society_Admin" ||
          selectedCard === "Society_User"
        )
          response = await axios.post(`${api_routes.common.otp_verify}`, {
            otp: otpState.join(""),
            token: token, // Send the token in the body
          });
        else if (
          selectedCard == 2 ||
          selectedCard === "Company_Admin" ||
          selectedCard === "Company_User"
        )
          response = await axios.post(`${api_routes.company.verify_otp}`, {
            otp: otpState.join(""),
            token: token,
          });

        // console.log("verify-otp", response);
        const userData = response.data.data;

        if (response.status === 200 && userData?.is_show_first_screen) {
          localStorage.setItem("user_data", JSON.stringify(userData));
          dispatch(setUser(userData));
          toast.success("OTP verified successfully!");
          if (typeof handleNextStep === "function") {
            handleNextStep();
          } else {
            navigate("/register?step=4");
          }
          // console.log()
        } else {
          toast.error("Verification failed. Redirecting to login...");
          navigate("/login");
        }
      } catch (err) {
        toast.error("Incorect OTP");
        setError((prevErr) => [...prevErr, err.message]);
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      console.log("Please complete all OTP fields");
    }
  };

  // Check if all OTP fields are empty
  const isOtpEmpty =
    Array.isArray(otpState) && otpState.every((digit) => digit === "");

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row mb-4">
        {otpState.map((digit, index) => (
          <div key={index} className="col">
            <Form.Control
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
              style={{
                textAlign: "center",
                borderRadius: "8px",
                borderColor: digit ? "#019F88" : "#ced4da",
                backgroundColor: isValid ? "transparent" : "#f8d7da",
              }}
              required
            />
          </div>
        ))}
      </div>

      <AuthButton
        label={loading ? "Verifying..." : "Verify"}
        type="submit"
        disabled={isOtpEmpty || loading}
        spinner={loading}
      />

      {/* {error.length > 0 && (
        <ul className="mt-4 text-red-500">
          {error.map((err, index) => (
            <li
              style={{ listStyle: "none" }}
              className="text-danger"
              key={index}
            >
              {err}
            </li>
          ))}
        </ul>
      )} */}
    </Form>
  );
};

export default OTPInput;
