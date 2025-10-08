import React from "react";
import { Col, Row } from "react-bootstrap";

export default function TableFooter({ page, limit, total, onPageChange }) {
  const startEntry = total === 0 ? 0 : (page - 1) * limit + 1;
  const endEntry = Math.min(page * limit, total);
  const totalPages = Math.ceil(total / limit);

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <Row className="align-items-center py-2">
      {/* Left Side: Showing Entries */}
      <Col md={6}>
        <span className="fw-medium custom-label">
          Showing {startEntry} to {endEntry} of {total} Entries
        </span>
      </Col>

      {/* Right Side: Pagination */}
      <Col md={6} className="d-flex justify-content-end">
        <div className="pagination-container custom-label">
          <button
            className="pagination-btn custom-label"
            onClick={handlePrev}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="pagination-number">{page}</span>
          <button
            className="pagination-btn"
            onClick={handleNext}
            disabled={page === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </Col>
    </Row>
  );
}
