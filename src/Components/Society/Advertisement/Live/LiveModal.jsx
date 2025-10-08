import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function LiveModal({ showPreviewModal, setShowPreviewModal }) {
  const handlePreviewClose = () => setShowPreviewModal(false);

  return (
    <Modal
      show={showPreviewModal}
      onHide={handlePreviewClose}
      centered
      className="  rounded-3"
      style={{ zIndex: "9999999999" }}
    >
      <Modal.Header className="border-0 bg-dark text-white w-100 d-flex justify-content-center align-items-center">
        <span className="fs-5 mb-3">Advertisement View</span>
        <button
          type="button"
          className="btn-close position-absolute end-0 me-3"
          aria-label="Close"
          onClick={handlePreviewClose}
          style={{ filter: "invert(1)" }}
        ></button>
      </Modal.Header>

      <Modal.Body className="text-center bg-dark d-flex justify-content-center align-items-center p-0 ">
        <img
          src="/pendingmodalimg.svg"
          alt="Sample"
          className="img-fluid"
          style={{ maxHeight: "100vh" }}
        />
      </Modal.Body>
    </Modal>
  );
}
