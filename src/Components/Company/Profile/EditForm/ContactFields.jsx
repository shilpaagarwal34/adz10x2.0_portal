import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";

export default function ContactFields() {
  return (
    <div>
      {/* Contact Information */}
      <h5 className=" fw-bold">Contact Information</h5>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group controlId="name">
            <Form.Label className="fw-bold custom-label">Name <span className="text-danger">*</span></Form.Label>
            <Field
              as={Form.Control}
              name="name"
              className="form-control-sm"
              type="text"
              placeholder="Enter Name"
            />
            <ErrorMessage name="name" component="div" className="text-danger formik-error" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="mobile_number">
            <Form.Label className="fw-bold custom-label">Mobile No. <span className="text-danger">*</span></Form.Label>
            <Field
              as={Form.Control}
              name="mobile_number"
              className="form-control-sm"
              type="text"
              placeholder="Enter Mobile Number"
            />
            <ErrorMessage
              name="mobile_number"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="email">
            <Form.Label className="fw-bold custom-label">Email ID <span className="text-danger">*</span></Form.Label>
            <Field
              as={Form.Control}
              name="email"
              className="form-control-sm"
              type="email"
              placeholder="Enter Email ID"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}
