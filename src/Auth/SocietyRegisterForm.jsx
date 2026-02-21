import { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import api_routes from "../config/api.js";
import AuthButton from "./Components/Button.jsx";

import {
  fetchCities,
  checkIfEmailExists,
  checkIfMobileExists,
} from "../store/Actions/Common/commonActions.js";

import { useDispatch, useSelector } from "react-redux";

const SocietyRegisterForm = ({ handleNextStep, registrationData }) => {
  const [formData, setformData] = useState({});
  const [emailValue, setEmailValue] = useState("");
  const [mobileValue, setMobileValue] = useState("");

  const dispatch = useDispatch();
  const { cities, customError } = useSelector((state) => state.common);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("registerformdata"));
    setformData({ ...data });
  }, []);

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const initialValues = {
    name: formData.name ? formData.name : "",
    mobile_number: formData.mobile_number ? formData.mobile_number : "",
    email: formData.email ? formData.email : "",
    society_name: formData.society_name ? formData.society_name : "",
    isAgreed: formData.isAgreed ? formData.isAgreed : false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Contact Person Name is required"),
    mobile_number: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    society_name: Yup.string().required("Society Name is required"),
    isAgreed: Yup.boolean().oneOf([true]),
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      if (emailValue) {
        dispatch(checkIfEmailExists(emailValue));
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [emailValue, dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (mobileValue) {
        dispatch(checkIfMobileExists(mobileValue));
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [mobileValue, dispatch]);

  const handleFormSubmit = async (values, { setErrors }) => {
    const defaultCityId = cities?.[0]?.id;
    if (!defaultCityId) {
      toast.error("Unable to load city data. Please try again.");
      return;
    }

    const payload = {
      name: values.name,
      mobile_number: values.mobile_number,
      email: values.email,
      society_name: values.society_name,
      city_id: defaultCityId,
      area_name: "Other",
      pincode: "000000",
      is_agree_terms_condition: values.isAgreed,
    };

    if (customError.email || customError.mobile_number) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        `${api_routes.society.post_register}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      registrationData.current = response.data.data;
      localStorage.setItem("auth_token", response.data.data.token);
      toast.success(response?.data?.message);

      handleNextStep();
    } catch (error) {
      const errorMsg = `Error: ${error.response ? error.response.data.message : error.message}`;
      toast.error(errorMsg);
      setErrors(error.response?.data?.errors || {});
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers) =>
          handleFormSubmit(values, formikHelpers)
        }
        enableReinitialize={true}
        validateOnBlur={true}
      >
        {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <h4 className="authHeadings">
              Sign Up for{" "}
              <span className="society-highlight-color">Society Account</span>
            </h4>

            {/* Name, Mobile, Email only */}
            <Row className="mb-1 mt-4">
              <Col md={12}>
                <Form.Group className="mb-2" controlId="name">
                  <Form.Label className="custom-label">
                    Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Field
                    as={Form.Control}
                    name="name"
                    size="sm"
                    type="text"
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
                  <Field name="mobile_number">
                    {({ field, form }) => (
                      <Form.Control
                        {...field}
                        type="tel"
                        size="sm"
                        autoComplete="off"
                        onChange={(e) => {
                          const value = e.target.value;
                          form.setFieldValue("mobile_number", value); // update Formik state
                          setMobileValue(value); // update local debounce value
                        }}
                        // onFocus={() => dispatch(clearErrors())}
                      />
                    )}
                  </Field>
                  {customError.mobile_number && mobileValue && (
                    <div className="text-danger" style={{ fontSize: "12px" }}>
                      {customError.mobile_number}
                    </div>
                  )}
                  <ErrorMessage
                    name="mobile_number"
                    component="div"
                    className="text-danger formik-error"
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-2" controlId="email">
                  <Form.Label className="custom-label">
                    Email <span className="text-danger">*</span>
                  </Form.Label>
                  <Field name="email">
                    {({ field, form }) => (
                      <Form.Control
                        {...field}
                        type="email"
                        size="sm"
                        autoComplete="off"
                        onChange={(e) => {
                          const value = e.target.value.toLowerCase();
                          form.setFieldValue("email", value); // update Formik state
                          setEmailValue(value); // update local debounce value
                        }}
                      />
                    )}
                  </Field>
                  {customError.email && (
                    <div className="text-danger" style={{ fontSize: "12px" }}>
                      {customError.email}
                    </div>
                  )}
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger formik-error"
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-2" controlId="society_name">
                  <Form.Label className="custom-label">
                    Society Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Field
                    as={Form.Control}
                    name="society_name"
                    size="sm"
                    type="text"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="society_name"
                    component="div"
                    className="text-danger formik-error"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-2 mt-3" controlId="privacyPolicy">
              <Field
                as={Form.Check}
                type="checkbox"
                checked={values.isAgreed}
                className="custom-checkbox d-flex flex-nowrap"
                onChange={(e) => setFieldValue("isAgreed", e.target.checked)}
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
              disabled={!values.isAgreed || isSubmitting}
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

export default SocietyRegisterForm;
