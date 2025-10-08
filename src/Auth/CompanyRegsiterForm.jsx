import React, { useEffect, useRef, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Select from "react-select";

import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

//components
import AuthButton from "./Components/Button.jsx";
import {
  checkCompanyEmailExist,
  checkCompanyMobileExist,
  fetchAreasByCity,
  fetchCities,
  fetchSectors,
} from "../store/Actions/Common/commonActions.js";
import { useDispatch, useSelector } from "react-redux";
import { setAreaSuggestions } from "../store/Slice/Common/commonSlice.js";
import SuggestionsDropdown from "./SuggestionsDropdown.jsx";
import { postCompanyRegister } from "../store/Actions/Auth/authActions.js";
import { selectCustomStyle } from "../helper/helper.js";

//formik initial Values
const initialValues = {
  company_name: "",
  company_brand_name: "",
  name: "",
  email: "",
  mobile_number: "",
  city_id: "",
  // area_id: "",
  area_name: "",
  pincode: "",
  address_line_1: "",
  address_line_2: "",
  sector: "dsa",
  is_agree_terms_condition: false,
};

const validationSchema = Yup.object({
  company_name: Yup.string().required("Company Name is required"),
  company_brand_name: Yup.string(),
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email Id is required"),
  mobile_number: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
  city_id: Yup.string().required("City is required"),
  // area_id: Yup.string().required("Area is required"),
  area_name: Yup.string().required("Area is required"),
  pincode: Yup.string()
    .matches(/^\d{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
  address_line_1: Yup.string().required("Address 1 is required"),
  address_line_2: Yup.string(),
  // sector: Yup.string().required("Sector is required"),
  is_agree_terms_condition: Yup.boolean().oneOf([true]),
});

const CompanyRegsiterForm = ({ handleNextStep, registrationData }) => {
  const [emailError, setEmailError] = useState(null);
  const [mobileError, setMobileError] = useState(null);
  const debounceRef = useRef(null);
  const mobileDebounceRef = useRef(null);

  const handleFormSubmit = async (values) => {
    // console.log(values);

    try {
      const res = await postCompanyRegister(values);
      // console.log("Response", res);
      // console.log(`OTP: ${res?.data?.otp}`);
      registrationData.current = res.data;
      localStorage.setItem("auth_token", res.data.token);
      toast.success(res?.message);
      handleNextStep();
    } catch (error) {
      // console.log(error);
      // console.error(error);
      toast.error(error);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchSectors());
  }, [dispatch]);

  const { cities, status, areas, areaSuggestions, sectors } = useSelector(
    (state) => state.common
  );

  // const handleCityChange = (e, setFieldValue) => {
  //   dispatch(setAreaSuggestions([]));
  //   const cityId = e.target.value;
  //   if (cityId === "") return;
  //   setFieldValue("city_id", cityId);
  //   setFieldValue("area_name", "", false);
  //   dispatch(fetchAreasByCity(cityId));
  // };

  const handleCityChange = (selectedOption, setFieldValue) => {
    dispatch(setAreaSuggestions([]));
    const cityId = selectedOption ? selectedOption.id : "";
    if (cityId === "") return;
    setFieldValue("city_id", cityId);
    setFieldValue("area_name", "", false);
    dispatch(fetchAreasByCity(cityId));
  };

  const handleAreaSelect = (area, setFieldValue) => {
    setFieldValue("area_name", area.area_name);
    setFieldValue("area_id", area.id);
    dispatch(setAreaSuggestions([]));
  };

  const handleAreaInputChange = (e, setFieldValue) => {
    const query = e.target.value.trim();
    setFieldValue("area_name", query);
    if (query === "") {
      dispatch(setAreaSuggestions([]));
      setFieldValue("area_id", "");
      return;
    }

    const filteredAreas = areas.filter((area) =>
      area.area_name.toLowerCase().startsWith(query.toLowerCase())
    );

    dispatch(setAreaSuggestions(filteredAreas));

    if (filteredAreas.length === 0) {
      setFieldValue("area_id", "", false); // No matching area, set area_id to empty
    } else {
      // ✅ If there's an exact match, set area_id automatically
      const exactMatch = filteredAreas.find(
        (area) => area.area_name.toLowerCase() === query.toLowerCase()
      );

      if (exactMatch) {
        setFieldValue("area_id", `${exactMatch.id}`);
      } else {
        setFieldValue("area_id", "", false); // Reset if no exact match
      }
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
            {/* Row 1: Society Name, Contact Person Name, Contact Person Number */}
            <Row className="mb-1 mt-0">
              <Col md={8}>
                <Form.Group className="mb-0" controlId="company_name">
                  <Form.Label className="custom-label mb-0">
                    Company Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Field
                    as={Form.Control}
                    size="sm"
                    type="text"
                    name="company_name"
                    placeholder="Enter Company name"
                  />
                  <ErrorMessage
                    name="company_name"
                    component="div"
                    className="text-danger formik-error"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-0" controlId="company_brand_name">
                  <Form.Label className="custom-label mb-0">
                    Company Brand Name
                  </Form.Label>
                  <Field
                    as={Form.Control}
                    size="sm"
                    type="text"
                    name="company_brand_name"
                    placeholder="Enter Company Brand Name"
                    autocomplete="off"
                  />
                  <ErrorMessage
                    name="company_brand_name"
                    component="div"
                    className="text-danger formik-error"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Row 2: Society Email, WhatsApp Group Name, Number of Flats */}
            <Row className="mb-1">
              <Col md={4}>
                <Form.Group className="mb-0" controlId="name">
                  <Form.Label className="custom-label mb-0">
                    Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Field
                    as={Form.Control}
                    size="sm"
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    autocomplete="off"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger formik-error"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-0" controlId="email">
                  <Form.Label className="custom-label mb-0">
                    Email Id <span className="text-danger">*</span>
                  </Form.Label>

                  <Field
                    as={Form.Control}
                    size="sm"
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    onFocus={() => setEmailError(null)}
                    autocomplete="off"
                    onChange={(e) => {
                      const email = e.target.value.toLowerCase();

                      setFieldTouched("email", true);
                      setFieldValue("email", email);

                      if (debounceRef.current)
                        clearTimeout(debounceRef.current);

                      debounceRef.current = setTimeout(async () => {
                        if (email) {
                          try {
                            const emailExists = await checkCompanyEmailExist(
                              email
                            );

                            if (emailExists) {
                              setFieldError("email", "Email already exists");
                              setEmailError("Email already exists");
                              validateField("email");
                            } else {
                              setFieldError("email", "");
                              setEmailError(null);
                            }
                          } catch (err) {
                            console.error(err);

                            if (err.message === "Network error") {
                              setFieldError(
                                "email",
                                "Network error. Please check your connection."
                              );
                            } else if (
                              err.message ===
                              "Internal server error. Please try again later."
                            ) {
                              setFieldError("email", err.message);
                            } else if (
                              err.message === "Unexpected server response"
                            ) {
                              setFieldError(
                                "email",
                                "Unexpected response from server."
                              );
                            } else {
                              setFieldError(
                                "email",
                                "Something went wrong. Please try again."
                              );
                            }

                            validateField("email");
                          }
                        }
                      }, 500); // 500ms debounce
                    }}
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
              <Col md={4}>
                <Form.Group className="mb-0" controlId="mobile_number">
                  <Form.Label className="custom-label mb-0">
                    Phone Number{" "}
                    <span className="text-muted fw-bold">(Whatsapp)</span>{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>

                  <Field
                    as={Form.Control}
                    size="sm"
                    type="number"
                    name="mobile_number"
                    placeholder="Enter Phone Number"
                    onChange={(e) => {
                      const mobile = e.target.value;

                      setFieldTouched("mobile_number", true);
                      setFieldValue("mobile_number", mobile);

                      if (mobileDebounceRef.current) {
                        clearTimeout(mobileDebounceRef.current);
                      }

                      mobileDebounceRef.current = setTimeout(async () => {
                        try {
                          if (mobile) {
                            const mobileExist = await checkCompanyMobileExist(
                              mobile
                            );

                            if (mobileExist) {
                              // ❌ Mobile number already exists
                              setFieldError(
                                "mobile_number",
                                "Mobile number already exists"
                              );
                              setMobileError("Mobile Already Exist");
                              validateField("mobile_number");
                            } else {
                              // ✅ Mobile number is available
                              setMobileError(null);
                              setFieldError("mobile_number", ""); // Clear previous error if any
                            }
                          }
                        } catch (err) {
                          if (err.message === "Network error") {
                            setFieldError(
                              "mobile_number",
                              "Network error. Please check your connection."
                            );
                          } else {
                            setFieldError(
                              "mobile_number",
                              "Something went wrong. Please try again."
                            );
                          }

                          validateField("mobile_number");
                        }
                      }, 500); // 500ms debounce
                    }}
                    autocomplete="off"
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
            </Row>

            {/* Row 3: City, Area, Pincode */}
            <Row className="mb-1">
              <Col md={4}>
                <Form.Group className="mb-0" controlId="city_id">
                  <Form.Label className="custom-label mb-0">
                    City <span className="text-danger">*</span>
                  </Form.Label>

                  <Select
                    classNamePrefix="react-select"
                    styles={selectCustomStyle}
                    name="city_id"
                    options={cities}
                    getOptionLabel={(option) => option.city_name}
                    getOptionValue={(option) => option.id}
                    value={
                      cities.find((city) => city.id === values.city_id) || null
                    }
                    onChange={(selectedOption) =>
                      handleCityChange(selectedOption, setFieldValue)
                    }
                    isClearable
                  />

                  <ErrorMessage
                    name="city_id"
                    component="div"
                    className="text-danger formik-error"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-0" controlId="area_name">
                  <Form.Label className="custom-label mb-0">
                    Area <span className="text-danger">*</span>
                  </Form.Label>
                  <Field
                    as={Form.Control}
                    size="sm"
                    type="text"
                    placeholder="Enter area"
                    name="area_name"
                    onChange={(e) => handleAreaInputChange(e, setFieldValue)}
                    autocomplete="off"
                  />

                  <SuggestionsDropdown
                    areaSuggestions={areaSuggestions}
                    handleAreaSelect={handleAreaSelect}
                    setFieldValue={setFieldValue}
                  />

                  <ErrorMessage
                    name="area_name"
                    component="div"
                    className="text-danger formik-error"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-0" controlId="pincode">
                  <Form.Label className="custom-label mb-0">
                    Pincode <span className="text-danger">*</span>
                  </Form.Label>
                  <Field
                    as={Form.Control}
                    size="sm"
                    type="number"
                    placeholder="Enter pincode"
                    name="pincode"
                    autocomplete="off"
                  />
                  <ErrorMessage
                    name="pincode"
                    component="div"
                    className="text-danger formik-error"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Row 4: Address */}
            <Form.Group className="mb-1" controlId="address_line_1">
              <Form.Label className="custom-label mb-0">
                Address Line 1 <span className="text-danger">*</span>
              </Form.Label>
              <br />
              <Field
                className="form-control w-100"
                as="textarea"
                size="sm"
                rows={1}
                name="address_line_1"
                placeholder="Address Line 1"
              />
              <ErrorMessage
                name="address_line_1"
                component="div"
                className="text-danger formik-error"
              />
            </Form.Group>

            {/* Row 5: Address */}
            <Form.Group className="mb-1" controlId="address_line_2">
              <Form.Label className="custom-label mb-0">
                Address Line 2
              </Form.Label>
              <br />
              <Field
                className="form-control w-100"
                as="textarea"
                size="sm"
                rows={1}
                name="address_line_2"
                placeholder="Address Line 2"
              />
              <ErrorMessage
                name="address_line_2"
                component="div"
                className="text-danger formik-error"
              />
            </Form.Group>

            {/* Row 6 */}

            <Row>
              <Col md={5}>
                <Form.Group className="mb-1" controlId="sector">
                  <Form.Label className="custom-label mb-0">Sector</Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    styles={selectCustomStyle}
                    name="sector"
                    options={sectors}
                    getOptionLabel={(option) => option.sector_name}
                    getOptionValue={(option) => option.id}
                    value={
                      sectors.find((sector) => sector.id === values.sector) ||
                      null
                    }
                    onChange={(selectedOption) =>
                      setFieldValue(
                        "sector",
                        selectedOption ? selectedOption.id : ""
                      )
                    }
                    menuPlacement="auto"
                    isClearable
                  />
                  <ErrorMessage
                    name="sector"
                    component="div"
                    className="text-danger formik-error"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Privacy and Policy Checkbox */}
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
                      // href="https://adz10x.com/privacy-policy"
                      href="/privacy-policy"
                      className="fw-bold custom-label"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      // href="https://adz10x.com/terms-conditions"
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
              disabled={!values.is_agree_terms_condition || isSubmitting} // Prevent multiple clicks
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyRegsiterForm;
