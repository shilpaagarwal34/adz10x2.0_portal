import React from "react";
import { Col, Card } from "react-bootstrap";

const grayBackground = {
  backgroundColor: "#e0e0e0",
};

const PdfUploadSkeleton = () => {
  return (
    <Col md={4} className="pe-2">
      <label className="fw-bold custom-label d-block mb-2">
        <div
          style={{
            ...grayBackground,
            height: "1.2rem",
            width: "60%",
            borderRadius: "4px",
          }}
        />
      </label>

      <Card
        className="py-1 text-center border-dashed border-2 rounded col-12 mb-3"
        style={{
          fontSize: "12px",
          position: "relative",
          padding: "4px",
        }}
      >
        <div className="inner-border d-flex flex-column align-items-center w-100 py-1">
          <div
            style={{
              ...grayBackground,
              width: 40,
              height: 40,
              borderRadius: "0.25rem",
              marginBottom: "0.5rem",
            }}
          />

          <div className="fw-bold mb-1" style={{ width: "80%" }}>
            <div
              style={{
                ...grayBackground,
                height: "1rem",
                width: "70%",
                borderRadius: "4px",
              }}
            />
          </div>

          <small className="text-muted" style={{ width: "60%" }}>
            <div
              style={{
                ...grayBackground,
                height: "0.8rem",
                width: "50%",
                borderRadius: "4px",
              }}
            />
          </small>
        </div>
      </Card>
    </Col>
  );
};

export default PdfUploadSkeleton;
