import React from "react";
import { Col, Row, Placeholder, Card } from "react-bootstrap";

const skeletonStyle = {
  backgroundColor: "#e0e0e0", // normal gray
};

const SocietyLocationSkeleton = () => {
  return (
    <div className="p-3 bg-white rounded">
      {/* Section Title */}
      <Placeholder as="h5" animation="wave" className="fw-bold mb-3">
        <Placeholder xs={4} style={skeletonStyle} />
      </Placeholder>

      {/* Map Selector Field */}
      <Col md={12} className="mb-3">
        <Placeholder
          as="label"
          animation="wave"
          className="custom-label d-block mb-1"
        >
          <Placeholder xs={6} style={skeletonStyle} />
        </Placeholder>
        <Placeholder animation="wave">
          <Placeholder className="form-control-sm w-100" style={skeletonStyle} />
        </Placeholder>
      </Col>

      {/* Map Iframe Skeleton */}
      <div className="rounded overflow-hidden mb-3">
        <Card
          style={{ height: "150px", backgroundColor: "#e0e0e0" }}
          className="w-100"
        />
      </div>

      {/* Address Field */}
      <Col md={12} className="mb-3">
        <Placeholder
          as="label"
          animation="wave"
          className="fw-bold custom-label d-block mb-1"
        >
          <Placeholder xs={4} style={skeletonStyle} />
        </Placeholder>
        <Placeholder animation="wave">
          <Placeholder className="form-control-sm w-100" style={skeletonStyle} />
        </Placeholder>
      </Col>

      {/* City and Area Fields */}
      <Row className="mb-3">
        <Col md={6}>
          <Placeholder
            as="label"
            animation="wave"
            className="fw-bold custom-label d-block mb-1"
          >
            <Placeholder xs={3} style={skeletonStyle} />
          </Placeholder>
          <Placeholder animation="wave">
            <Placeholder className="form-select-sm w-100" style={skeletonStyle} />
          </Placeholder>
        </Col>
        <Col md={6}>
          <Placeholder
            as="label"
            animation="wave"
            className="fw-bold custom-label d-block mb-1"
          >
            <Placeholder xs={3} style={skeletonStyle} />
          </Placeholder>
          <Placeholder animation="wave">
            <Placeholder className="form-control-sm w-100" style={skeletonStyle} />
          </Placeholder>
        </Col>
      </Row>

      {/* Pincode Field */}
      <Col md={12} className="mb-3">
        <Placeholder
          as="label"
          animation="wave"
          className="fw-bold custom-label d-block mb-1"
        >
          <Placeholder xs={3} style={skeletonStyle} />
        </Placeholder>
        <Placeholder animation="wave">
          <Placeholder className="form-control-sm w-100" style={skeletonStyle} />
        </Placeholder>
      </Col>
    </div>
  );
};

export default SocietyLocationSkeleton;
