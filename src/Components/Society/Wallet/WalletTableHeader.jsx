// WalletTableHeader.js
import React from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function WalletTableHeader({
  pageSize,
  onPageSizeChange,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <Row className="mb-1 d-flex justify-content-between">
      <Col md={4} className="d-flex align-items-center custom-label fw-medium">
        <span className="me-2">Show</span>
        <Form.Select
          value={pageSize}
          onChange={(e) => onPageSizeChange(e.target.value)}
          className="w-auto form-select-sm custom-label"
        >
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </Form.Select>
        <span className="ms-2">Entries</span>
      </Col>

      <Col md={3} className="text-end d-flex align-items-center gap-2">
        <h6 className="custom-label m-0">Search:</h6>
        <Form.Control
          type="text"
          className="form-control-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Col>
    </Row>
  );
}
