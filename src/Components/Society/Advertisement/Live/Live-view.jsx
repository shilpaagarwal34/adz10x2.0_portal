import React from "react";
import { useState } from "react";
import { Row, Col, Card, Form, Button, Badge, Modal } from "react-bootstrap";
import Details from "../Adv-details.jsx";

const LiveView = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <div className="row g-0">
        <div className="col-12 col-lg-8  p-3">
          <div className="card border-0">
            <Row className=" px-3 pt-3 pb-2">
              <Col>
                <h6 className="fw-bold">Advertisement Details</h6>
              </Col>
              <Col className="text-end">
                <span className="fw-bold custom-label">ID #30334950</span>{" "}
                <Badge
                  bg="warning"
                  className="ms-4 rounded-4"
                  style={{ fontSize: "10px", padding: "5px 12px" }}
                >
                  STATUS - PENDING
                </Badge>
              </Col>
            </Row>
            <hr className="m-0" style={{ color: "gray" }} />
            <Row className="p-3 ">
              <Col md={6} className="p-0">
                <Card className="px-2 py-1 border-0 position-relative">
                  <div className="position-relative">
                    <Card.Img src="/pendingimg.svg" alt="Advertisement" />

                    <Button
                      variant="dark"
                      className="position-absolute bottom-0 end-0 m-2"
                      style={{
                        zIndex: 2,
                        fontSize: "12px",
                        padding: "2px 13px",
                      }}
                      onClick={handleShow}
                    >
                      <img src="/eye.svg" className="me-1" /> Preview Ads
                    </Button>
                  </div>
                </Card>
              </Col>

              <Modal
                show={show}
                onHide={handleClose}
                centered
                className="  rounded-3"
                style={{ zIndex: "9999999999" }}
              >
                <Modal.Header className="border-0 bg-dark text-white w-100 d-flex justify-content-center align-items-center">
                  <span className="fs-5 mb-3">Advertisement View</span>
                  <button
                    type="button"
                    className="btn-close position-absolute end-0 me-3"
                    aria-label="Close"
                    onClick={handleClose}
                    style={{ filter: "invert(1)" }}
                  ></button>
                </Modal.Header>

                <Modal.Body className="text-center bg-dark d-flex justify-content-center align-items-center p-0 ">
                  <img
                    src="/pendingmodalimg.svg"
                    alt="Sample"
                    className="img-fluid"
                    style={{ maxHeight: "100vh" }}
                  />
                </Modal.Body>
              </Modal>

              <Col md={6} className="p-0">
                <Card className="py-1 px-3 border-0">
                  <h6 className="fw-bold">Advertisement Action</h6>
                  <Form>
                    <Form.Group className="mb-2">
                      <Form.Label className="custom-label fw-bold mb-1">
                        Status
                      </Form.Label>
                      <Form.Select className="form-select-sm">
                        <option>Select Status</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label className="custom-label fw-bold mb-1">
                        Select Time Slot
                      </Form.Label>
                      <Form.Select className="form-select-sm">
                        <option>Select Time</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="custom-label fw-bold mb-1">
                        Cancellation Reason
                      </Form.Label>
                      <Form.Select className="form-select-sm">
                        <option>Select Reason</option>
                      </Form.Select>
                    </Form.Group>

                    <Button
                      style={{
                        backgroundColor: "#019F88",
                        color: "white",
                        padding: "4px 8px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        width: "120px",
                        fontSize: "12px",
                        display: "inline-block",
                      }}
                    >
                      SUBMIT
                    </Button>
                  </Form>
                  <Card className="border-0 mt-3">
                    <h6 className="fw-bold m-0 custom-label">Note:</h6>
                    <p className="custom-label custom-label">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text.
                    </p>
                  </Card>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        <Details />
      </div>
    </>
  );
};

export default LiveView;
