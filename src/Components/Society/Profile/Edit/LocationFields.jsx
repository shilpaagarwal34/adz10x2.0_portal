import { Row, Col, Form } from "react-bootstrap";
import Select from "react-select";

import { ErrorMessage, Field, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;
import {
  fetchCities,
  fetchAreasByCity,
} from "../../../../store/Actions/Common/commonActions.js";
import { useEffect } from "react";
import { setAreaSuggestions } from "../../../../store/Slice/Common/commonSlice.js";
import SuggestionsDropdown from "../../../../Auth/SuggestionsDropdown.jsx";
import LocationPickerModal from "../../../../utils/LocationPickerModal.jsx";
import { selectCustomStyle } from "../../../../helper/helper.js";

const LoctionFieldsData = ({
  showMap,
  setShowMap,
  selectedLocation,
  setSelectedLocation,
  setSelectedCoordinates,
  selectedCoordinates,
}) => {
  const { values, setFieldValue } = useFormikContext();
  const dispatch = useDispatch();
  const buildGoogleMapPreviewSrc = (googlePageUrl, coordinates, formValues) => {
    const rawUrl = String(googlePageUrl || "").trim();
    const addressFallback = [
      formValues?.address,
      formValues?.area_name,
      safeCities.find((city) => city.id === formValues?.city_id)?.city_name,
      formValues?.pincode,
    ]
      .filter(Boolean)
      .join(", ");

    const buildEmbedByQuery = (queryText) =>
      `https://www.google.com/maps?q=${encodeURIComponent(queryText)}&z=15&output=embed`;

    // If user entered Google page URL, always prioritize it for live preview.
    if (rawUrl) {
      if (rawUrl.includes("/maps/embed")) {
        return rawUrl;
      }

      try {
        const parsed = new URL(rawUrl);
        const host = parsed.hostname.toLowerCase();
        const path = decodeURIComponent(parsed.pathname || "");
        const qParam = parsed.searchParams.get("q");

        // Some short/share pages can't be embedded directly. Use address fallback instead.
        if (host.includes("share.google")) {
          if (addressFallback) return buildEmbedByQuery(addressFallback);
          return buildEmbedByQuery(rawUrl);
        }

        if (qParam) {
          return buildEmbedByQuery(qParam);
        }

        const atMatch = path.match(/@(-?\d+(\.\d+)?),(-?\d+(\.\d+)?)/);
        if (atMatch) {
          return `https://www.google.com/maps?q=${atMatch[1]},${atMatch[3]}&z=15&output=embed`;
        }

        const placeMatch = path.match(/\/place\/([^/]+)/);
        if (placeMatch?.[1]) {
          return buildEmbedByQuery(placeMatch[1].replace(/\+/g, " "));
        }
      } catch {
        // Not a valid URL; treat as plain query text.
      }

      return buildEmbedByQuery(rawUrl);
    }

    if (coordinates?.lat && coordinates?.lng) {
      return `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`;
    }

    if (addressFallback) {
      return buildEmbedByQuery(addressFallback);
    }

    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.284749831874!2d73.85625557505002!3d18.520430376270936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c068f3f53b91%3A0x3b4c08f37e6c5a3c!2sNexus%20Gulmohar!5e0!3m2!1sen!2sin!4v1648899238475";
  };

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  useEffect(() => {
    if (showMap) {
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) backdrop.style.zIndex = "1";
    }
  }, [showMap]);

  const { cities, areas, status, areaSuggestions } = useSelector(
    (state) => state.common
  );
  const safeCities = Array.isArray(cities) ? cities : [];
  const safeAreas = Array.isArray(areas) ? areas : [];
  const safeAreaSuggestions = Array.isArray(areaSuggestions)
    ? areaSuggestions
    : [];

  useEffect(() => {
    if (values.area_id && safeAreas.length > 0 && !values.area_name) {
      const area = safeAreas.find((area) => area.id === values.area_id);
      if (area) {
        setFieldValue("area_name", area.area_name, false);
      }
    }
  }, [safeAreas, values.area_id, values.area_name, setFieldValue]);

  const handleCityChange = (selectedOption) => {
    dispatch(setAreaSuggestions([]));
    const cityId = selectedOption ? selectedOption.id : "";
    if (cityId === "") return;
    setFieldValue("city_id", cityId);
    setFieldValue("area_name", "", "");
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

    const filteredAreas = safeAreas.filter((area) =>
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

  const handleAreaSelect = (area) => {
    setFieldValue("area_name", area.area_name);
    setFieldValue("area_id", area.id);
    dispatch(setAreaSuggestions([]));
  };

  // Location Picker Data
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

  return (
    <div className="p-2 p-sm-3 bg-white rounded">
      {/* Society Location Section */}
      <h5 className="fw-bold mb-3">Society Location</h5>
      <Col md={12} className="mb-3">
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
            style={{ cursor: "pointer" }}
          />
        </Form.Group>
      </Col>

      {/* <MapModal /> */}
      <div className="rounded overflow-hidden">
        <iframe
          title="Society Location"
          src={buildGoogleMapPreviewSrc(
            values.google_page_url,
            selectedCoordinates,
            values
          )}
          width="100%"
          height="150"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
        />
      </div>

      <Col md={12} className="mb-3">
        <Form.Group>
          <Form.Label className="fw-bold custom-label">
            Address<span className="text-danger">*</span>
          </Form.Label>
          <Field
            as={Form.Control}
            className="form-control-sm"
            name="address"
            type="text"
            rows={3}
            placeholder="Enter Address"
          />
        </Form.Group>
        <ErrorMessage
          name="address"
          component="div"
          className="text-danger formik-error"
        />
      </Col>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="city_id">
            <Form.Label className="fw-bold custom-label">
              City <span className="text-danger">*</span>
            </Form.Label>

            <Select
              classNamePrefix="react-select"
              styles={selectCustomStyle}
              name="city_id"
              options={safeCities}
              getOptionLabel={(option) => option.city_name}
              getOptionValue={(option) => option.id}
              isLoading={status === "loading"}
              placeholder={
                status === "loading" ? "Loading Cities..." : "Select City"
              }
              value={safeCities.find((city) => city.id === values.city_id) || null}
              onChange={handleCityChange}
              isClearable
            />

            <ErrorMessage
              name="city_id"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="area_name">
            <Form.Label className="fw-bold custom-label">
              Area <span className="text-danger">*</span>
            </Form.Label>
            <Field
              as={Form.Control}
              name="area_name"
              className="form-control-sm"
              type="text"
              placeholder="Enter"
              value={values.area_name}
              onChange={handleAreaInputChange}
              autoComplete="off"
            />
            <SuggestionsDropdown
              areaSuggestions={safeAreaSuggestions}
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
      </Row>

      <Col md={12} className="mb-3">
        <Form.Group controlId="pincode">
          <Form.Label className="fw-bold custom-label">
            Pincode <span className="text-danger">*</span>
          </Form.Label>
          <Field
            as={Form.Control}
            className="form-control-sm"
            type="number"
            name="pincode"
            value={values.pincode}
            placeholder="Enter Pincode"
          />
          <ErrorMessage
            name="pincode"
            component="div"
            className="text-danger formik-error"
          />
        </Form.Group>
      </Col>

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
    </div>
  );
};

export default LoctionFieldsData;
