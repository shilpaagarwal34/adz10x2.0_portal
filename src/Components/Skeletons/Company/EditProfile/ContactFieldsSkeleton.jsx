import React from "react";
import { Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ContactFieldsSkeleton() {
  return (
    <div>
      <h5 className="fw-bold">
        <Skeleton width={180} />
      </h5>
      <Row className="mb-4">
        {[1, 2, 3].map((_, index) => (
          <Col md={4} key={index}>
            <div className="mb-3">
              <Skeleton width={100} height={16} className="mb-1" />
              <Skeleton height={32} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
