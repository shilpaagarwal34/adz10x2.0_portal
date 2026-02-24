import React from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * Reusable modal shown when user tries to perform an action but profile is incomplete.
 * Use for Society (profile edit) or Company (profile edit) - pass profileEditPath accordingly.
 */
const CompleteProfileModal = ({
  show,
  onHide,
  profileEditPath = "/society/profile/edit",
  message = "Your profile is incomplete. Please complete profile to 100% before taking this action. Do you want to go to Edit Profile now?",
}) => {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    onHide();
    navigate(profileEditPath);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #e8eef4",
        }}
      >
        <div
          style={{
            background: "linear-gradient(97.02deg, #01AA23 0%, #0193FF 100%)",
            padding: "14px 18px",
            color: "#fff",
          }}
          className="d-flex justify-content-between align-items-center"
        >
          <h5 className="mb-0 fw-bold">Complete Profile Required</h5>
          <button
            type="button"
            className="btn btn-sm btn-light"
            onClick={onHide}
          >
            X
          </button>
        </div>
        <Modal.Body>
          <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
            {message}
          </p>
          <div className="d-flex gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={onHide}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-sm text-white"
              style={{
                background:
                  "linear-gradient(97.02deg, #01AA23 0%, #0193FF 100%)",
                border: "none",
              }}
              onClick={handleGoToProfile}
            >
              Yes
            </button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default CompleteProfileModal;
