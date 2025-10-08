import React from "react";
import { Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BillingDetailsSkeleton() {
  return (
    <div>
      <h5 className="fw-bold">
        <Skeleton width={140} />
      </h5>

      <Row className="mb-3">
        {[1, 2, 3].map((_, index) => (
          <Col md={4} key={index}>
            <div className="mb-3">
              <Skeleton width={150} height={16} className="mb-1" />
              <Skeleton height={32} />
            </div>
          </Col>
        ))}
      </Row>

      <Row className="mb-3">
        {[1, 2].map((_, index) => (
          <Col md={4} className="mb-2" key={index}>
            <div className="mb-2">
              <Skeleton width={150} height={16} className="mb-1" />
              <Skeleton height={32} />
            </div>
          </Col>
        ))}
        {[1, 2].map((_, index) => (
          <Col md={12} className="mb-2" key={index}>
            <div className="mb-2">
              <Skeleton width={180} height={16} className="mb-1" />
              <Skeleton height={32} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
