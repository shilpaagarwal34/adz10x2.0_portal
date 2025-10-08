import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Plus } from "react-feather";
import Skeleton from "react-loading-skeleton";
import { formatNumberWithCommas } from "../../../helper/helper";

export default function BalanceAmout({ handleShow, amount, isLoading }) {
  return (
    <Col md="auto">
      <Row className="align-items-center justify-content-between">
        <Col md="auto">
          <p className="mb-2 fw-bold">Total Balance Amount</p>
          <h4 className="fw-bold m-0">
            {isLoading ? (
              <Skeleton width={120} height={24} />
            ) : (
              `₹ ${amount ? formatNumberWithCommas(amount) : 0}`
            )}
          </h4>
        </Col>
        <Col md="auto" className="mb-3 mb-md-0 mt-2 mt-md-0">
          {isLoading ? (
            <Skeleton width={180} height={38} />
          ) : (
            <Button
              className="d-flex align-items-center withdraw-btn"
              onClick={handleShow}
              disabled={amount <= 0}
            >
              <Plus size={14} className="me-2" /> WITHDRAW AMOUNT
            </Button>
          )}
        </Col>
      </Row>
    </Col>
  );
}
