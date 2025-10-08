import React from "react";
import { Modal, Button } from "react-bootstrap";
import { X } from "lucide-react";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import MyMap from "../Components/Common/MyMap.jsx";

const LocationPickerModal = ({
  show,
  handleClose,
  handleSelectLocation,
  selectedCoordinates,
  setSelectedCoordinates,
  selectedLocation,
  setSelectedLocation,
  setFieldValue,
  apiKey,
}) => {
  return (
    <Modal
      style={{ zIndex: 1000 }}
      show={show}
      onHide={handleClose}
      size="lg"
      centered
    >
      <Modal.Body className="p-2" style={{ zIndex: "0 !important" }}>
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            right: "2px",
            top: "2px",
            background: "#fff",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            zIndex: "1",
            borderRadius: "50%"
          }}
        >
          <X size={20} />
        </button>

        <ReactGoogleAutocomplete
          apiKey={apiKey}
          onPlaceSelected={(place) =>
            handleSelectLocation(place, setFieldValue)
          }
          className="google-autocomplete"
          options={{
            types: ["establishment", "geocode"],
            componentRestrictions: { country: "in" },
          }}
        />

        <MyMap
          selectedCoordinates={selectedCoordinates}
          setSelectedCoordinates={setSelectedCoordinates}
          setSelectedLocation={setSelectedLocation}
        />

        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="d-flex">
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
              <g clipPath="url(#clip0)">
                <path
                  d="M19.25 9.1665C19.25 15.5832 11 21.0832 11 21.0832C11 21.0832 2.75 15.5832 2.75 9.1665C2.75 6.97847 3.61919 4.88005 5.16637 3.33287C6.71354 1.7857 8.81196 0.916504 11 0.916504C13.188 0.916504 15.2865 1.7857 16.8336 3.33287C18.3808 4.88005 19.25 6.97847 19.25 9.1665Z"
                  stroke="black"
                  strokeWidth="2"
                />
                <path
                  d="M11 11.9165C12.5188 11.9165 13.75 10.6853 13.75 9.1665C13.75 7.64772 12.5188 6.4165 11 6.4165C9.48122 6.4165 8.25 7.64772 8.25 9.1665C8.25 10.6853 9.48122 11.9165 11 11.9165Z"
                  stroke="black"
                  strokeWidth="2"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="22" height="22" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="m-0 ps-2 fw-bold" style={{ fontSize: "12px" }}>
              {selectedLocation || "No location selected"}
            </p>
          </div>
          <Button
            style={{
              backgroundColor: "#019F88",
              color: "white",
              padding: "4px 8px",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              width: "100px",
              fontSize: "12px",
              display: "inline-block",
            }}
            onClick={() => handleClose(setFieldValue)}
          >
            SELECT
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LocationPickerModal;
