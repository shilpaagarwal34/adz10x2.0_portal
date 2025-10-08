import React from "react";
import { Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PaginationSkeleton = () => {
  return (
    <Row className="align-items-center py-2">
      {/* Left Side: Showing Entries */}
      <Col md={6}>
        <Skeleton width={250} height={20} />
      </Col>

      {/* Right Side: Pagination Buttons */}
      <Col md={6} className="d-flex justify-content-end">
        <div className="pagination-container d-flex gap-2">
          {/* Simulate "Previous", Page Numbers, and "Next" buttons */}
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              width={40}
              height={32}
              borderRadius={4}
              style={{ marginRight: 8 }}
            />
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default PaginationSkeleton;
