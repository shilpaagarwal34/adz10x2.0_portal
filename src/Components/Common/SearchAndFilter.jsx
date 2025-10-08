import { divide } from "lodash";
import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { handleExportToExcel } from "../../helper/helper";

const SearchAndFilter = ({
  onSearchChange,
  onEntriesChange,
  isSearchAllowed = true,
  entries,
  searchQuery,
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300); // wait 300ms after user stops typing

    return () => {
      clearTimeout(handler); // cleanup if user types again before 300ms
    };
  }, [localSearch, onSearchChange]);

  return (
    <Row className="mb-1 mt-3 d-flex justify-content-between">
      <Col md={4} className="d-flex align-items-center custom-label fw-medium">
        <span className="me-2">Show</span>
        <Form.Select
          className="w-auto form-select-sm custom-label"
          onChange={(e) => onEntriesChange(e.target.value)}
          value={entries}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Form.Select>
        <span className="ms-2">Entries</span>
      </Col>

      {isSearchAllowed && (
        <Col
          md={3}
          className="text-end d-flex align-items-center gap-2 mt-2 mt-md-0"
        >
          <h6 className="custom-label m-0">Search:</h6>
          <Form.Control
            type="text"
            className="form-control-sm"
            onChange={(e) => setLocalSearch(e.target.value)}
            value={localSearch}
            placeholder="Search"
          />
        </Col>
      )}
    </Row>
  );
};

export default SearchAndFilter;
