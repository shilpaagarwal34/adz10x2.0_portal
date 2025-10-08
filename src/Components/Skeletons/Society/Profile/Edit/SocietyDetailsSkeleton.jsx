import React from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SocietyDetailsSkeleton = () => {
  return (
    <>
      <h5 className="mb-3 fw-bold">
        <Skeleton width={180} />
      </h5>
      <Row className="mb-3 d-flex align-items-center">
        <Col md={8}>
          <Row>
            <Col md={12} className="mb-2">
              <Skeleton height={24} width={120} className="mb-1" />
              <Skeleton height={35} />
            </Col>
            <Col md={6} className="mb-2">
              <Skeleton height={24} width={120} className="mb-1" />
              <Skeleton height={35} />
            </Col>
            <Col md={6} className="mb-2">
              <Skeleton height={24} width={120} className="mb-1" />
              <Skeleton height={35} />
            </Col>
            <Col md={6} className="mb-2">
              <Skeleton height={24} width={150} className="mb-1" />
              <Skeleton height={35} />
            </Col>
            <Col md={6} className="mb-2">
              <Skeleton height={24} width={150} className="mb-1" />
              <Skeleton height={35} />
            </Col>
          </Row>
        </Col>
        <Col md={4} className="text-center">
          <div className="d-flex flex-column align-items-center mb-3">
            <Skeleton circle height={80} width={80} />
          </div>
          <Skeleton height={18} width={160} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4} className="mb-2">
          <Skeleton height={24} width={150} className="mb-1" />
          <Card className="p-1 text-center border-dashed border-2 rounded col-12 mb-1">
            <div className="d-flex flex-column align-items-center w-100 py-2 px-1">
              <Skeleton height={100} width="100%" />
            </div>
          </Card>
          <div className="d-flex align-items-center mb-2 gap-2">
            <Skeleton circle height={24} width={24} />
            <Skeleton width={120} height={20} />
          </div>
        </Col>
        <Col md={8} className="mb-2">
          <Skeleton height={24} width={150} className="mb-1" />
          <Skeleton height={35} className="mb-3" />
          <Skeleton height={24} width={150} className="mb-1" />
          <Skeleton height={35} />
        </Col>
      </Row>
    </>
  );
};

export default SocietyDetailsSkeleton;
