import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ApprovedCardSkeleton = () => {
  return (
    <Row className="p-3">
      <Skeleton height={20} width={200} className="mb-3" />

      {/* No. of View & No. of Reactions */}
      <Row className="mb-3">
        <Col md={3}>
          <Form.Group>
            <Skeleton height={16} width={100} className="mb-2" />
            <Skeleton height={14} width={60} />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Skeleton height={16} width={120} className="mb-2" />
            <Skeleton height={14} width={60} />
          </Form.Group>
        </Col>
      </Row>

      {/* Screenshot Image Skeletons */}
      <Row>
        <Col md={3} className="pe-0">
          <Form.Group>
            <Skeleton height={16} width={120} className="mb-2" />
            <Skeleton height={80} width={120} />
          </Form.Group>
        </Col>

        <Col md={3} className="px-0">
          <Form.Group>
            <Skeleton height={16} width={140} className="mb-2" />
            <Skeleton height={80} width={120} />
          </Form.Group>
        </Col>

        <Col md={3} className="px-0">
          <Form.Group>
            <Skeleton height={16} width={160} className="mb-2" />
            <Skeleton height={80} width={120} />
          </Form.Group>
        </Col>
      </Row>
    </Row>
  );
};

export default ApprovedCardSkeleton;
