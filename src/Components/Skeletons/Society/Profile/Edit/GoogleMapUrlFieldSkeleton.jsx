import React from "react";
import { Col, Form, Placeholder } from "react-bootstrap";

const GoogleMapUrlFieldSkeleton = () => {
  return (
    <Col md={12} className="my-3">
      <Form.Group>
        <Placeholder
          as={Form.Label}
          animation="wave"
          className="fw-bold custom-label"
        >
          <Placeholder xs={3} />
        </Placeholder>
        <Placeholder as="div" animation="wave">
          <div
            className="form-control form-control-sm disabled-placeholder bg-secondary bg-opacity-25 rounded"
            style={{ height: "32px" }}
          ></div>
        </Placeholder>
      </Form.Group>
    </Col>
  );
};

export default GoogleMapUrlFieldSkeleton;
