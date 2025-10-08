import { useState, useEffect } from "react";
import Select from "react-select";
import { Form, Row, Col } from "react-bootstrap";
import { Formik, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;
import axios from "axios";
import { toast } from "react-toastify";
import LocationPickerModal from "../utils/LocationPickerModal.jsx";

// API
import api_routes from "../config/api.js";

//Components
import AuthButton from "./Components/Button.jsx";
import SuggestionsDropdown from "./SuggestionsDropdown.jsx";

// Action

import {
  fetchCities,
  fetchAreasByCity,
  checkIfEmailExists,
  checkIfMobileExists,
} from "../store/Actions/Common/commonActions.js";

import { setAreaSuggestions } from "../store/Slice/Common/commonSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { selectCustomStyle } from "../helper/helper.js";
import _ from "lodash";

const SocietyRegisterForm = ({ handleNextStep, registrationData }) => {
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [formData, setformData] = useState({}); //used to get data from localstorage
  const [emailValue, setEmailValue] = useState("");
  const [mobileValue, setMobileValue] = useState("");

  const dispatch = useDispatch();
  const { cities, areas, areaSuggestions, customError } = useSelector(
    (state) => state.common
  );

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("registerformdata"));
    setformData({ ...data });

    if (showMap) {
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) backdrop.style.zIndex = "1";
    }
  }, [showMap]);

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const initialValues = {
    society_name: formData.society_name ? formData.society_name : "",
    name: formData.name ? formData.name : "",
    mobile_number: formData.mobile_number ? formData.mobile_number : "",
    email: formData.email ? formData.email : "",
    city_id: formData.city ? formData.name : "",
    area_name: formData.area ? formData.area : "",
    pincode: formData.pincode ? formData.pincode : "",
    address: formData.location ? formData.location : "",
    isAgreed: formData.isAgreed ? formData.isAgreed : false,
  };

  const validationSchema = Yup.object({
    society_name: Yup.string().required("Society Name is required"),
    name: Yup.string().required("Contact Person Name is required"),
    mobile_number: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    city_id: Yup.string().required("City is required"),
    area_name: Yup.string().required("Area is required"),
    pincode: Yup.string()
      .matches(/^\d{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    // address: Yup.string().test(
    //   "location-selected",
    //   "Please select a location from the map",
    //   () => selectedLocation !== "" && selectedCoordinates !== null
    // ),
    isAgreed: Yup.boolean().oneOf([true]),
  });

  const handleShow = () => setShowMap(true);

  const handleClose = (setFieldValue) => {
    setShowMap(false);
    if (selectedLocation) {
      setFieldValue("address", selectedLocation); // Only update if a location is selected
    }
  };

  const handleSelectLocation = (place, setFieldValue) => {
    if (!place || !place.geometry || !place.geometry.location) {
      console.error("Invalid place data:", place);
      return;
    }

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    if (isNaN(lat) || isNaN(lng)) {
      console.error("Invalid latitude or longitude:", lat, lng);
      return;
    }

    setFieldValue("address", place.formatted_address);
    setSelectedCoordinates({ lat, lng });
    setSelectedLocation(place.formatted_address);
  };

  const handleCityChange = (selectedOption, setFieldValue) => {
    dispatch(setAreaSuggestions([]));
    const cityId = selectedOption ? selectedOption.id : "";
    if (cityId === "") return;
    setFieldValue("city_id", cityId);
    setFieldValue("area_name", "", false);
    dispatch(fetchAreasByCity(cityId));
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

  const handleAreaSelect = (area, setFieldValue) => {
    setFieldValue("area_name", area.area_name);
    setFieldValue("area_id", area.id);
    dispatch(setAreaSuggestions([]));
  };

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
    if (values?.address) {
      values = {
        ...values,
        latitude: selectedCoordinates?.lat || "", // Use `lat`
        longitude: selectedCoordinates?.lng || "", // Use `lng`
        is_agree_terms_condition: values.isAgreed,
      };
    } else {
      values = {
        ...values,
        is_agree_terms_condition: values.isAgreed,
      };
    }

    // values = {
    //   ...values,
    //   latitude: selectedCoordinates?.lat || "", // Use `lat`
    //   longitude: selectedCoordinates?.lng || "", // Use `lng`
    //   is_agree_terms_condition: values.isAgreed,
    // };

    delete values.isAgreed;

    if (customError.email || customError.mobile_number) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        `${api_routes.society.post_register}`,
        values,
        { headers: { "Content-Type": "application/json" } }
      );

      // console.log("OTP:", response?.data?.data?.otp);
      registrationData.current = response.data.data;
      localStorage.setItem("auth_token", response.data.data.token);
      toast.success(response?.data?.message);

      handleNextStep();
    } catch (error) {
      const errorMsg = `Error: ${
        error.response ? error.response.data.message : error.message
      }`;
      // console.error(errorMsg);
      toast.error(errorMsg);
      setErrors(error.response?.data?.errors || {}); // Ensure setErrors is used safely
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

            {/* Row 1: Society Name */}
            <Row className="mb-1 mt-4">
              <Col md={12}>
                <Form.Group className="mb-2" controlId="society_name">
                  <Form.Label className="custom-label">
                    Society Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Field
                    as={Form.Control}
                    autoComplete="off"
                    name="society_name"
                    size="sm"
                    type="text"
                  />
                  <ErrorMessage
                    name="society_name"
                    component="div"
                    className="text-danger formik-error"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Row 2: Name, Mobile No., Email */}
            <Row className="mb-1">
              <Col md={4}>
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
              <Col md={4}>
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
                        type="number"
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

              <Col md={4}>
                <Form.Group className="mb-2" controlId="email">
                  <Form.Label className="custom-label">
                    Email <span className="text-danger">*</span>
                  </Form.Label>
                  {/* <Field
                    as={Form.Control}
                    autoComplete="off"
                    name="email"
                    size="sm"
                    type="email"
                    onBlur={handleEmailBlur}
                    onFocus={() => dispatch(clearErrors())}
                  /> */}
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
            </Row>

            {/* Row 3: City, Area, Pincode */}
            <Row className="mb-1">
              <Col md={4}>
                <Form.Group className="mb-2" controlId="city_id">
                  <Form.Label className="custom-label">
                    City <span className="text-danger">*</span>
                  </Form.Label>
                  {/* <Field
                    as={Form.Select}
                    name="city_id"
                    size="sm"
                    onChange={(e) => handleCityChange(e, setFieldValue)}
                  >
                    <option value="">Select city</option>
                    {cities.length > 0 &&
                      cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.city_name}
                        </option>
                      ))}
                  </Field> */}

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
                <Form.Group className="mb-2" controlId="area_name">
                  <Form.Label className="custom-label">
                    Area <span className="text-danger">*</span>
                  </Form.Label>
                  <Field
                    as={Form.Control}
                    name="area_name"
                    size="sm"
                    type="text"
                    onChange={(e) => handleAreaInputChange(e, setFieldValue)}
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="area_name"
                    component="div"
                    className="text-danger formik-error"
                  />

                  <SuggestionsDropdown
                    areaSuggestions={areaSuggestions}
                    handleAreaSelect={handleAreaSelect}
                    setFieldValue={setFieldValue}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-2" controlId="pincode">
                  <Form.Label className="custom-label">
                    Pincode <span className="text-danger">*</span>
                  </Form.Label>
                  <Field
                    as={Form.Control}
                    name="pincode"
                    size="sm"
                    type="number"
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
            <Form.Group className="mb-2" controlId="address">
              <Form.Label className="custom-label">
                Society Location On Google Map{" "}
                {/* <span className="text-danger">*</span> */}
              </Form.Label>
              <Field
                as={Form.Control}
                className="form-control-sm"
                type="text"
                placeholder="Click to select location"
                onClick={() => handleShow(setFieldValue)}
                readOnly
                name="address"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-danger formik-error"
              />
            </Form.Group>

            <LocationPickerModal
              show={showMap}
              handleClose={handleClose}
              handleSelectLocation={handleSelectLocation}
              selectedCoordinates={selectedCoordinates}
              setSelectedCoordinates={setSelectedCoordinates}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              setFieldValue={setFieldValue}
              apiKey={MAP_API_KEY}
            />

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
              disabled={!values.isAgreed || isSubmitting} // Prevent multiple clicks
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SocietyRegisterForm;
