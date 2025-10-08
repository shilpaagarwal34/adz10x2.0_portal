import React from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Row, Col, Form } from "react-bootstrap";


function CompanyDetailsSkeleton() {
  return (
    <div>
      <h5 className="mb-3 fw-bold">
        <Skeleton width={150} />
      </h5>
      <Row className="mb-3 d-flex align-items-center">
        <Col md={8}>
          <Row>
            <Col md={6} className="mb-2">
              <Form.Group controlId="company_name">
                <Form.Label className="fw-bold custom-label">
                  <Skeleton width={120} />
                </Form.Label>
                <Skeleton width={`100%`} height={40} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-2">
              <Form.Group controlId="company_brand_name">
                <Form.Label className="fw-bold custom-label">
                  <Skeleton width={120} />
                </Form.Label>
                <Skeleton width={`100%`} height={40} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-2">
              <Form.Group controlId="sector">
                <Form.Label className="fw-bold custom-label">
                  <Skeleton width={120} />
                </Form.Label>
                <Skeleton width={`100%`} height={40} />
              </Form.Group>
            </Col>

            <Col md={6} className="mb-2">
              <Form.Group controlId="company_mobile_number">
                <Form.Label className="fw-bold custom-label">
                  <Skeleton width={120} />
                </Form.Label>
                <Skeleton width={`100%`} height={40} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-2">
              <Form.Group controlId="company_email_id">
                <Form.Label className="fw-bold custom-label">
                  <Skeleton width={120} />
                </Form.Label>
                <Skeleton width={`100%`} height={40} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-2">
              <Form.Group controlId="website">
                <Form.Label className="fw-bold custom-label">
                  <Skeleton width={120} />
                </Form.Label>
                <Skeleton width={`100%`} height={40} />
              </Form.Group>
            </Col>
          </Row>
        </Col>

        <Col md={4} className="text-center">
          <div className="d-flex flex-column align-items-center mb-3">
            <Skeleton circle width={80} height={80} />
          </div>
          <Skeleton width={160} />
        </Col>
      </Row>
    </div>
  );
}

export default CompanyDetailsSkeleton;
