import React from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AuthPromptModal = ({
  show,
  onHide,
  title = "Create your Adz10x account",
  description = "Sign up to unlock campaigns, profile editing, and media-slot management.",
}) => {
  const navigate = useNavigate();

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
        >
          <h5 className="mb-0 fw-bold">{title}</h5>
        </div>
        <Modal.Body>
          <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
            {description}
          </p>
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              type="button"
              className="btn btn-sm text-white"
              style={{
                background:
                  "linear-gradient(97.02deg, #01AA23 0%, #0193FF 100%)",
                border: "none",
              }}
              onClick={() => navigate("/register?step=1")}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="btn btn-light btn-sm ms-auto"
              onClick={onHide}
            >
              Continue Browsing
            </button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default AuthPromptModal;
