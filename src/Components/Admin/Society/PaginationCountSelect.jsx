import { Col, Form } from "react-bootstrap";

export default function PaginationCountSelect({ limit, onLimitChange }) {
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    onLimitChange(newLimit); // Update the limit in the parent component
  };

  return (
    <Col
      md={4}
      className="d-flex align-items-center custom-label fw-medium pt-4"
    >
      <span className="me-2">Show</span>
      <Form.Select
        className="w-auto form-select-sm custom-label"
        value={limit}
        onChange={handleLimitChange}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
      </Form.Select>
      <span className="ms-2">Entries</span>
    </Col>
  );
}
