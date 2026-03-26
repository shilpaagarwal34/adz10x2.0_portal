import React, { useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Field, useFormikContext, ErrorMessage } from "formik";
import {
  fetchAreasByCity,
  fetchCities,
} from "../../../../store/Actions/Common/commonActions.js";
import { setAreaSuggestions } from "../../../../store/Slice/Common/commonSlice.js";
import { useDispatch, useSelector } from "react-redux";
import SuggestionsDropdown from "../../../../Auth/SuggestionsDropdown.jsx";

export default function AddressFields() {
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const { cities, areas, status, areaSuggestions } = useSelector(
    (state) => state.common
  );

  // useEffect(() => {
  //   if (values.area_id && areas.length > 0) {
  //     const area = areas.find((area) => area.id === values.area_id);
  //     if (area) {
  //       setFieldValue("area_name", area.area_name, false);
  //     }
  //   }
  // }, [areas, values.area_id, values.area_name, setFieldValue]);

  useEffect(() => {
  if (values.area_id && areas.length > 0) {
    const area = areas.find((area) => area.id === values.area_id);

    if (area && values.area_name !== area.area_name) {
      setFieldValue("area_name", area.area_name, false);
    }
  }
}, [areas, values.area_id, setFieldValue]);

  const handleCityChange = (e) => {
    dispatch(setAreaSuggestions([]));
    let cityId = e.target.value;
    if (cityId === "") return;
    setFieldValue("city_id", cityId);
    setFieldValue("area_name", "", false);
    dispatch(fetchAreasByCity(cityId));
  };

  const handleAreaInputChange = (e) => {
    const query = e.target.value.trim();
    setFieldValue("area_name", query);
    if (query === "") {
      dispatch(setAreaSuggestions([]));
      setFieldValue("area_id", "");
      return;
    }

    const filteredAreas = areas.filter((area) =>
      area.area_name.toLowerCase().includes(query.toLowerCase())
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

  const handleAreaSelect = (area) => {
    setFieldValue("area_name", area.area_name);
    setFieldValue("area_id", area.id);
    dispatch(setAreaSuggestions([]));
  };

  return (
    <div>
      <h5 className="fw-bold">Address Details</h5>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="city_id">
            <Form.Label className="fw-bold custom-label">City <span className="text-danger">*</span></Form.Label>
            <Field
              as={Form.Select}
              name="city_id"
              className="form-select-sm"
              onChange={handleCityChange}
            >
              <option value="">
                {status === "loading" ? "Loading Cities" : "Select City"}
              </option>
              {cities.length > 0 &&
                cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.city_name}
                  </option>
                ))}
            </Field>
            <ErrorMessage
              name="city_id"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="area_name">
            <Form.Label className="fw-bold custom-label">Area <span className="text-danger">*</span></Form.Label>
            <Field
              as={Form.Control}
              name="area_name"
              className="form-control-sm"
              type="text"
              placeholder="Enter"
              value={values.area_name}
              onChange={handleAreaInputChange}
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
          <Form.Group controlId="pincode">
            <Form.Label className="fw-bold custom-label">Pincode <span className="text-danger">*</span></Form.Label>
            <Field
              as={Form.Control}
              name="pincode"
              className="form-control-sm"
              type="number"
              placeholder="Enter Pincode"
            />
            <ErrorMessage
              name="pincode"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12} className="mb-2">
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              Address Line 1 <span className="text-danger">*</span>
            </Form.Label>
            <Field
              as={Form.Control}
              name="address_line_1"
              className="form-control-sm"
              type="text"
              placeholder="Enter Address "
            />
          </Form.Group>
        </Col>
        <Col md={12} className="mb-2">
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              Address Line 2
            </Form.Label>
            <Field
              as={Form.Control}
              name="address_line_2"
              className="form-control-sm"
              type="text"
              placeholder="Enter Address  "
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}
