
import { Modal } from "react-bootstrap";
import React from "react";

export default function AdPreviewModal({ show, setShow }) {
  const handleClose = () => setShow(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="  rounded-3"
      style={{ zIndex: "9999999999" }}
    >
      <Modal.Header className="border-0 bg-dark text-white w-100 d-flex justify-content-center align-items-center">
        <span className="fs-5 mb-3">Advertisement View</span>
        <button
          type="button"
          className="btn-close position-absolute end-0 me-3"
          aria-label="Close"
          onClick={handleClose}
          style={{ filter: "invert(1)" }}
        ></button>
      </Modal.Header>

      <Modal.Body
        className="text-center bg-dark d-flex justify-content-center align-items-center p-0 "
        style={{ borderRadius: "0 0 8px 8px" }}
      >
        <img
          src="/mobile.png"
          alt="Sample"
          className="img-fluid"
          style={{
            height: "510px",
            width: "500px",
            borderRadius: "5px",
          }}
        />
      </Modal.Body>
    </Modal>
  );
}
