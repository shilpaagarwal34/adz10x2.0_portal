import React from "react";
import { Table, Row, Col, Form, Pagination } from "react-bootstrap";
import { Eye } from "react-feather";
import { useNavigate } from "react-router-dom";

const CompletedTable = ({ activeTab, data }) => {
  const navigate = useNavigate();

  return (
    <div className="card border-0 p-3 mx-4 my-3">
      {/* Search & Filter Section */}
      <Row className="d-flex justify-content-between">
        <Col md={4} className="d-flex align-items-center custom-label fw-medium">
          <span className="me-2">Show</span>
          <Form.Select className="w-auto form-select-sm custom-label">
            <option>10</option>
            <option>25</option>
          </Form.Select>
          <span className="ms-2">Entries</span>
        </Col>

        <Col md={3} className="text-end d-flex align-items-center gap-2 mt-2 mt-md-0">
          <h6 className="custom-label m-0">Search:</h6>
          <Form.Control type="text" className="form-control-sm" />
        </Col>
      </Row>

      {/* Table Section */}
      <div className="table-responsive">
      <Table bordered className="custom-label" style={{ minWidth: "1000px" }}>
        <thead>
          <tr className="striped-thead">
            <th>Sr No.</th>
            <th>Campaign ID</th>
            <th>Ads Date</th>
            <th>Company Name</th>
            <th>Company Type</th>
            <th>Type</th>
            <th>Creative Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((ad, index) => (
            <tr key={ad.id}>
              <td>{index + 1}</td>
              <td>{ad.campaignId}</td>
              <td>{ad.date}</td>
              <td>Mplussoft Technologies</td>
              <td>IT Company</td>
              <td>Brand Promotions</td>
              <td>{ad.type}</td>
              <td className="text-center">
                <img src="/view.svg" onClick={() => navigate("/society/advertisement/completed-view")} style={{ cursor: "pointer" }}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      {/* Pagination */}
      <Row className="align-items-center">
        {/* Left Side: Showing Entries */}
        <Col>
          <span className="fw-medium custom-label">Showing 1 to 10 of 10 Entries</span>
        </Col>

        {/* Right Side: Pagination */}
        <Col className="d-flex justify-content-end">
        <div className="pagination-container">
            <button className="pagination-btn">Previous</button>
            <span className="pagination-number">1</span>
            <button className="pagination-btn">Next</button>
        </div>
        </Col>
      </Row>
    </div>
  );
};

export default CompletedTable;
