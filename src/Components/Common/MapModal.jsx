import React from "react";
import { Modal, Button } from "react-bootstrap";
import { X } from "react-feather";

const MapModal = ({ show, handleClose, selectedLocation }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered style={{ zIndex: "99999999999" }}>
      <Modal.Body className="p-2">
        {/* Close Button */}
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
          }}
        >
          <X size={20} />
        </button>

        {/* Google Maps iframe */}
        <div style={{ width: "100%", height: "500px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15128.622780259744!2d73.9016704!3d18.567018150000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1742386573991!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Location Text & Select Button */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="d-flex">
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1468_137)">
                <path
                  d="M19.25 9.1665C19.25 15.5832 11 21.0832 11 21.0832C11 21.0832 2.75 15.5832 2.75 9.1665C2.75 6.97847 3.61919 4.88005 5.16637 3.33287C6.71354 1.7857 8.81196 0.916504 11 0.916504C13.188 0.916504 15.2865 1.7857 16.8336 3.33287C18.3808 4.88005 19.25 6.97847 19.25 9.1665Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 11.9165C12.5188 11.9165 13.75 10.6853 13.75 9.1665C13.75 7.64772 12.5188 6.4165 11 6.4165C9.48122 6.4165 8.25 7.64772 8.25 9.1665C8.25 10.6853 9.48122 11.9165 11 11.9165Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1468_137">
                  <rect width="22" height="22" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <p className="m-0 ps-2 fw-bold" style={{ fontSize: "12px" }}>
              {selectedLocation || "New airport road, Viman Nagar, Pune - 411014"}
            </p>
          </div>

          <Button
            style={{
              backgroundColor: "#00517F",
              color: "white",
              padding: "4px 8px",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              width: "100px",
              fontSize: "12px",
              display: "inline-block",
            }}
          >
            Select
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MapModal;