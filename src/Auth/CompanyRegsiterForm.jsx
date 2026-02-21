import React, { useEffect, useRef, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import AuthButton from "./Components/Button.jsx";
import {
  checkCompanyEmailExist,
  checkCompanyMobileExist,
  fetchCities,
} from "../store/Actions/Common/commonActions.js";
import { useDispatch, useSelector } from "react-redux";
import { postCompanyRegister } from "../store/Actions/Auth/authActions.js";

const initialValues = {
  name: "",
  email: "",
  mobile_number: "",
  is_agree_terms_condition: false,
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email Id is required"),
  mobile_number: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
  is_agree_terms_condition: Yup.boolean().oneOf([true]),
});

const CompanyRegsiterForm = ({ handleNextStep, registrationData }) => {
  const [emailError, setEmailError] = useState(null);
  const [mobileError, setMobileError] = useState(null);
  const debounceRef = useRef(null);
  const mobileDebounceRef = useRef(null);

  const dispatch = useDispatch();
  const { cities } = useSelector((state) => state.common);

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const handleFormSubmit = async (values) => {
    const defaultCityId = cities?.[0]?.id;
    if (!defaultCityId) {
      toast.error("Unable to load city data. Please try again.");
      return;
    }

    const payload = {
      name: values.name,
      email: values.email,
      mobile_number: values.mobile_number,
      company_name: `${values.name}'s Company`,
      company_brand_name: "",
      city_id: defaultCityId,
      area_name: "Other",
      pincode: "000000",
      address_line_1: "-",
      address_line_2: "",
      sector: "",
      is_agree_terms_condition: values.is_agree_terms_condition,
    };

    try {
      const res = await postCompanyRegister(payload);
      registrationData.current = res.data;
      localStorage.setItem("auth_token", res.data.token);
      toast.success(res?.message);
      handleNextStep();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleFormSubmit}
      >
        {({
          handleSubmit,
          setFieldValue,
          values,
          setFieldTouched,
          setFieldError,
          validateField,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <h4 className="authHeadings">
              Sign Up for{" "}
              <span className="society-highlight-color">Company Account</span>
            </h4>

            <Row className="mb-1 mt-4">
              <Col md={12}>
                <Form.Group className="mb-2" controlId="name">
                  <Form.Label className="custom-label">
                    Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Field
                    as={Form.Control}
                    size="sm"
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger formik-error"
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-2" controlId="mobile_number">
                  <Form.Label className="custom-label">
                    Mobile No.{" "}
                    <span className="text-muted fw-bold">(Whatsapp)</span>{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>

                  <Field
                    as={Form.Control}
                    size="sm"
                    type="tel"
                    name="mobile_number"
                    placeholder="Enter Mobile Number"
                    onFocus={() => setMobileError(null)}
                    autoComplete="off"
                    onChange={(e) => {
                      const mobile = e.target.value;

                      setFieldTouched("mobile_number", true);
                      setFieldValue("mobile_number", mobile);

                      if (mobileDebounceRef.current) {
                        clearTimeout(mobileDebounceRef.current);
                      }

                      mobileDebounceRef.current = setTimeout(async () => {
                        try {
                          if (!mobile) return;
                          const mobileExist = await checkCompanyMobileExist(mobile);

                          if (mobileExist) {
                            setFieldError(
                              "mobile_number",
                              "Mobile number already exists"
                            );
                            setMobileError("Mobile already exists");
                            validateField("mobile_number");
                          } else {
                            setMobileError(null);
                            setFieldError("mobile_number", "");
                          }
                        } catch (err) {
                          setFieldError(
                            "mobile_number",
                            "Something went wrong. Please try again."
                          );
                          validateField("mobile_number");
                        }
                      }, 500);
                    }}
                  />

                  <ErrorMessage
                    name="mobile_number"
                    component="div"
                    className="text-danger formik-error"
                  />
                  {mobileError && (
                    <p className="text-danger formik-error">{mobileError}</p>
                  )}
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-2" controlId="email">
                  <Form.Label className="custom-label">
                    Email <span className="text-danger">*</span>
                  </Form.Label>

                  <Field
                    as={Form.Control}
                    size="sm"
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    onFocus={() => setEmailError(null)}
                    onChange={(e) => {
                      const email = e.target.value.toLowerCase();

                      setFieldTouched("email", true);
                      setFieldValue("email", email);

                      if (debounceRef.current) clearTimeout(debounceRef.current);

                      debounceRef.current = setTimeout(async () => {
                        if (!email) return;
                        try {
                          const emailExists = await checkCompanyEmailExist(email);
                          if (emailExists) {
                            setFieldError("email", "Email already exists");
                            setEmailError("Email already exists");
                            validateField("email");
                          } else {
                            setFieldError("email", "");
                            setEmailError(null);
                          }
                        } catch (err) {
                          setFieldError(
                            "email",
                            "Something went wrong. Please try again."
                          );
                          validateField("email");
                        }
                      }, 500);
                    }}
                    autoComplete="off"
                  />

                  {emailError && (
                    <p className="text-danger formik-error">{emailError}</p>
                  )}
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger formik-error"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-0" controlId="is_agree_terms_condition">
              <Field
                as={Form.Check}
                type="checkbox"
                name="is_agree_terms_condition"
                checked={values.is_agree_terms_condition}
                className="custom-checkbox d-flex flex-nowrap"
                onChange={(e) =>
                  setFieldValue("is_agree_terms_condition", e.target.checked)
                }
                label={
                  <>
                    By signing up, you agree to our{" "}
                    <a
                      href="/privacy-policy"
                      className="fw-bold custom-label"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="/terms-condition"
                      className="fw-bold custom-label"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms & Conditions
                    </a>
                    .
                  </>
                }
                id="privacyPolicy"
              />
            </Form.Group>

            <AuthButton
              label={
                isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm"></span>{" "}
                    Submitting...
                  </>
                ) : (
                  "SIGN UP"
                )
              }
              type="submit"
              disabled={!values.is_agree_terms_condition || isSubmitting}
            />

            <p className="userTypeSubText mt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="fw-medium"
                style={{ textDecoration: "none" }}
              >
                Log in
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyRegsiterForm;
