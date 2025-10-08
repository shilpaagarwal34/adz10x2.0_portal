// File: components/UserToolbar.jsx
import React from "react";
import { Col, Row, Form } from "react-bootstrap";
import { TextField } from "@mui/material";

const UserToolbar = ({ limit, setLimit, search, setSearch }) => {
  return (
    <Row className="d-flex justify-content-between mb-3">
      <Col md={4} className="d-flex align-items-center fw-medium mb-2 mb-md-0">
        <span className="me-2">Show</span>
        <Form.Select
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value))}
          className="w-auto form-select-sm"
        >
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </Form.Select>
        <span className="ms-2">Entries</span>
      </Col>
      <Col md={4} className="text-end d-flex align-items-center gap-2">
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search by User ID or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "100%" }}
        />
      </Col>
    </Row>
  );
};

export default UserToolbar;
