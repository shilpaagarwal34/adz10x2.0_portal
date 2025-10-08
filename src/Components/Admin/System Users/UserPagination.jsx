// File: components/UserPagination.jsx
import React from "react";
import { Row, Col } from "react-bootstrap";

const UserPagination = ({ page, setPage, limit, total }) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <Row className="align-items-center py-2">
      <Col md={6}>
        <span className="custom-label">
          {total === 0
            ? "No entries found"
            : `Showing ${(page - 1) * limit + 1} to ${Math.min(
                page * limit,
                total
              )} of ${total} Entries`}
        </span>
      </Col>

      <Col md={6} className="d-flex justify-content-end">
        <div className="pagination-container">
          <button
            className="pagination-btn"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="pagination-number">{page}</span>
          <button
            className="pagination-btn"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default UserPagination;
