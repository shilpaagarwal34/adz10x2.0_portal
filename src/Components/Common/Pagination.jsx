import { Row, Col } from "react-bootstrap";

const Pagination = ({
  currentPage,
  totalEntries,
  entriesPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  // Do not render pagination if only 1 page
  if (totalPages <= 1) return null;

  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 5;
    const halfVisible = Math.floor(visiblePages / 2);

    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, currentPage + halfVisible);

    if (currentPage <= halfVisible) {
      end = Math.min(visiblePages, totalPages);
    }

    if (currentPage + halfVisible > totalPages) {
      start = Math.max(1, totalPages - visiblePages + 1);
    }

    if (start > 1) {
      pageNumbers.push(
        <button
          key={1}
          className="pagination-number"
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      if (start > 2) pageNumbers.push(<span key="start-ellipsis">...</span>);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-number ${i === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1)
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      pageNumbers.push(
        <button
          key={totalPages}
          className="pagination-number"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <Row className="align-items-center d-flex flex-wrap">
      {/* Left Side: Showing Entries */}
      <Col>
        <span className="fw-medium custom-label">
          Showing {startEntry} to {endEntry} of {totalEntries} Entries
        </span>
      </Col>

      {/* Right Side: Pagination Buttons */}
      <Col className="d-flex justify-content-end">
        <div className="pagination-container d-flex gap-2">
          {currentPage > 1 && (
            <button
              className="pagination-btn custom-label"
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </button>
          )}

          {generatePageNumbers()}

          {currentPage < totalPages && (
            <button
              className="pagination-btn custom-label"
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Pagination;
