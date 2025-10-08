import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";

import "../../../../Pages/Styles/Society-Dashboard.css";
import {
  downloadFile,
  formatNumberWithCommas,
} from "../../../../helper/helper";
import axiosInstance from "../../../../utils/axiosInstance";
import api_routes, { base_url } from "../../../../config/api";
import { toast } from "react-toastify";

const traactionScrenshotCss = {
  width: "150px",
  height: "100px",
  background: "#f8f9fa",
  objectFit: "contain",
};

const PaidPayment = ({ data }) => {
  const [show, setShow] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Open and close modal functions
  const handleShow = async (invoiceId) => {
    setIsLoading(true);
    setShow(true);

    try {
      const response = await axiosInstance.get(
        `${api_routes.society.view_payment_detail}/${invoiceId}`
      );

      if (response.status === 200) {
        setSelectedPayment(response?.data?.data);
      } else {
        toast.error("Failed to fetch payment data");
      }
    } catch (error) {
      console.error("Error fetching payment data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <div className="table-responsive">
        <Table bordered className="custom-label" style={{ minWidth: "1000px" }}>
          <thead>
            <tr className="striped-thead">
              <th>Sr No.</th>
              <th>Date & Time</th>
              <th>Invoice No</th>
              <th>Transaction ID</th>
              <th>Description</th>
              <th>Paid Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((payment, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{payment?.created_date}</td>
                <td>{payment?.invoice_id}</td>
                <td>{payment?.transaction_id}</td>
                <td>{payment?.description}</td>
                <td>
                  ₹{" "}
                  {payment?.withdraw_amount
                    ? formatNumberWithCommas(payment.withdraw_amount)
                    : 0}
                </td>
                <td className="text-center">
                  <img
                    src="/view.svg"
                    onClick={() => handleShow(payment.id)}
                    style={{ cursor: "pointer" }}
                    alt="View"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Invoice Modal */}
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        className=" mx-1"
        centered
        dialogClassName="custom-modal"
        style={{ zIndex: "99999999999999" }}
      >
        <Modal.Header closeButton className="px-4 py-3">
          <Modal.Title className="fw-bold">
            Invoice - {selectedPayment?.invoice_id || "Loading..."}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="row">
                <div className="col-12 col-sm-6 d-flex flex-column justify-content-between">
                  <div>
                    <p className="m-0 fw-bold custom-label">
                      Invoice Date & Time:
                    </p>
                    <p className="custom-label">
                      {selectedPayment?.created_date || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="m-0 fw-bold custom-label">Description:</p>
                    <p className="custom-label">
                      {selectedPayment?.description || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="m-0 fw-bold custom-label">Submitted by:</p>
                    <p className="m-0  custom-label">
                      {selectedPayment?.submitted_by || "-"}
                    </p>
                  </div>
                </div>

                <div className="col-8 col-sm-6 d-flex flex-column align-items-start align-items-sm-end justify-content-between">
                  <div>
                    <p className="m-0 fw-bold custom-label">Invoice Amount:</p>
                    <p className="m-0 fs-3">
                      ₹{" "}
                      {formatNumberWithCommas(
                        selectedPayment?.withdraw_amount || 0
                      )}
                    </p>
                  </div>
                  {selectedPayment?.upload_report_path && (
                    <Button
                      className="invoice-btn d-flex align-items-center gap-2"
                      onClick={() =>
                        downloadFile(selectedPayment?.upload_report_path)
                      }
                    >
                      <svg
                        className="me-1"
                        width="15"
                        height="12"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 0H16C16.5304 0 17.0391 0.19715 17.4142 0.548079C17.7893 0.899009 18 1.37497 18 1.87126V14.9701C18 16.0086 17.11 16.8413 16 16.8413H2C1.46957 16.8413 0.960859 16.6442 0.585786 16.2933C0.210714 15.9423 0 15.4664 0 14.9701V1.87126C0 0.842067 0.9 0 2 0ZM5 13.0988H13V11.2276H5V13.0988ZM13 6.54941H10.5V2.80689H7.5V6.54941H5L9 10.2919L13 6.54941Z"
                          fill="#01a743"
                        />
                      </svg>
                      Download Invoice
                    </Button>
                  )}
                </div>
              </div>

              <hr />
              <h5 className="fw-bold mb-3">Paid Invoice Details</h5>
              <div className="row">
                <div className="col-md-8">
                  <div className="d-flex flex-wrap justify-content-between">
                    <div className="col-md-6">
                      <p className="m-0 fw-bold custom-label">
                        Paid Date & Time
                      </p>
                      <p className="custom-label m-0">
                        {selectedPayment?.updated_date}
                      </p>
                    </div>
                    <div className="col-md-6 ">
                      <p className="m-0 fw-bold custom-label ">
                        Transaction Id
                      </p>
                      <p className="custom-label m-0">{selectedPayment?.transaction_id}</p>
                    </div>
                  </div>
                  <div className="mt-3 col-md-9">
                    <p className="m-0 fw-bold custom-label">Remark</p>
                    <p className="custom-label m-0">
                      {selectedPayment?.remark || "-"}
                    </p>
                  </div>
                </div>
                <div className="col-md-4 ">
                  <p className="m-0 fw-bold custom-label">
                    Transaction Screenshot
                  </p>
                  <div
                    className="border rounded p-3 d-flex justify-content-center align-items-center"
                    style={traactionScrenshotCss}
                  >
                    <img
                      style={traactionScrenshotCss}
                      src={
                        selectedPayment?.transaction_path
                          ? `${base_url}/${selectedPayment?.transaction_path}`
                          : "/pdficon.svg"
                      }
                      alt="Transaction Screenshot"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PaidPayment;
