import { useState } from "react";
import { Form, Modal, Card } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import {
  adminHasPrivilege,
  downloadFile,
  formatNumberWithCommas,
} from "../../../../helper/helper";
import { base_url } from "../../../../config/api";
import { updateTransactionDetails } from "../../../../store/Actions/Admin/Payments/PaymentAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function PendingPaymentModal({
  activeTab,
  setActiveTab,
  show,
  setShow,
  selectedPayment,
}) {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    transaction_id: null,
    remark: "Payment Done",
    transaction_path: null,
    id: null,
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "application/pdf": [],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);

        setFormData((prev) => ({
          ...prev,
          transaction_path: file,
        }));
        setImagePreview(imageUrl);
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setShow(false);
    setFormData({
      transaction_id: null,
      remark: null,
      transaction_path: null,
      id: null,
    });
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    const { transaction_id, remark, transaction_path } = formData;

    if (!transaction_id || !remark || !transaction_path) {
      toast.error("Please fill the requird fields");
      return;
    }

    try {
      await dispatch(
        updateTransactionDetails({ ...formData, id: selectedPayment?.id })
      );
      handleClose();
      setActiveTab(1);
      setFormData({
        transaction_id: null,
        remark: null,
        transaction_path: null,
        id: null,
      });
      toast.success("Transaction Details Updated Successfully.");
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <Modal
      show={show}
      size="lg"
      onHide={handleClose}
      centered
      dialogClassName="custom-modal"
      style={{ zIndex: "99999999999999" }}
    >
      <Modal.Header closeButton className="py-3 ps-4">
        <Modal.Title className="fs-6 fw-bold">
          Invoice Date & Time: {selectedPayment?.created_date}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="row">
          <div className="col-2 d-flex flex-column justify-content-between">
            <div>
              <img
                className="rounded-1"
                src={`${base_url}/${selectedPayment?.society_profile_img_path}`}
                alt="society img"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-8 d-flex flex-column  justify-content-between">
            <div>
              <p className="m-0 fw-bold  fs-5">
                {selectedPayment?.society_name}
              </p>
              <small className="m-0 ">{selectedPayment?.address}</small>
            </div>
          </div>

          <div className="col-6 d-flex flex-column mt-4 justify-content-between">
            <div>
              <p className="m-0 fw-bold custom-label">Invoice No:</p>
              <p className="custom-label">{selectedPayment?.invoice_id}</p>
            </div>
            <div>
              <p className="m-0 fw-bold custom-label">Description:</p>
              <p className="m-0 custom-label">{selectedPayment?.description}</p>
            </div>
          </div>
          <div className="col-6 d-flex flex-column mt-4 justify-content-between ">
            <div>
              <p className="m-0 fw-bold custom-label">
                {" "}
                Amount:{" "}
                {selectedPayment?.with_gst && (
                  <span className="text-warning">(With GST)</span>
                )}{" "}
              </p>
              <p className="m-0 custom-label">
                ₹{" "}
                {formatNumberWithCommas(selectedPayment?.withdraw_amount || 0)}
              </p>
            </div>
            <div className="text-end">
              <button
                className="cp-invoice-btn"
                onClick={() =>
                  downloadFile(
                    `${base_url}/${selectedPayment?.upload_report_path}`
                  )
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
              </button>
            </div>
          </div>
        </div>

        <hr />

        {activeTab === 0 ? ( // Pending Tab
          <>
            <div>
              <div className="col-md-12">
                <div className="row d-flex justify-content-between">
                  <div className="col-md-4 ">
                    <p className="m-0 fw-bold custom-label ">
                      Transaction ID :
                    </p>
                    <Form.Control
                      type="text"
                      name="transaction_id"
                      className="form-control-sm"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-8">
                    <p className="m-0 fw-bold custom-label">Remark :</p>
                    <Form.Control
                      as="textarea"
                      name="remark"
                      className="form-control-sm"
                      rows={1}
                      value={formData?.remark}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12 ">
                <p className="m-0 fw-bold custom-label my-2">
                  Upload Transaction Screenshot :
                </p>
                <Card
                  {...getRootProps()}
                  className="p-1 text-center border-dashed border-2 rounded mb-3 col-6 mb-1"
                  style={{
                    fontSize: "12px",
                    position: "relative",
                    padding: "4px",
                  }}
                >
                  <input {...getInputProps()} />
                  {/* {console.log(formData?.transaction_path?.name)} */}
                  {imagePreview ? (
                    // Show the uploaded imagePreview
                    <div className="inner-border d-flex flex-column align-items-center w-100 py-2 px-1">
                      {formData?.transaction_path?.type.startsWith("image") ? (
                        <img
                          src={imagePreview}
                          alt="Uploaded"
                          width="100%"
                          height="auto"
                          style={{
                            maxHeight: "auto",
                            objectFit: "contain",
                            borderRadius: "5px",
                            width: "150px",
                            height: "150px",
                          }}
                        />
                      ) : (
                        <p className="text-muted mt-2">
                          {formData?.transaction_path?.name}
                        </p>
                      )}
                    </div>
                  ) : (
                    // Show upload prompt if no image uploaded
                    <div className="inner-border d-flex flex-column align-items-center w-100 py-2 px-1">
                      <img
                        src="/imgicon.svg"
                        alt="Upload"
                        width={40}
                        height={40}
                      />
                      <p className="mt-2 mb-1 fw-bold">
                        Drag your images here or Browse
                      </p>
                      <small className="text-muted">
                        Supports JPEG, JPG, PNG
                      </small>
                    </div>
                  )}
                </Card>
                {adminHasPrivilege("society_payments_edit") && (
                  <button
                    style={{
                      backgroundColor: "#019F88",
                      color: "white",
                      padding: "4px 8px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "120px", // Prevent full width
                      fontSize: "14px",
                      display: "inline-block", // Ensures it only takes the needed width
                    }}
                    onClick={handleSubmit}
                  >
                    SUBMIT
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          // Paid Tab
          <>
            <div>
              <div className="col-md-12">
                <div className=" d-flex justify-content-between">
                  <div className="col-md-3 ">
                    <p className="m-0 fw-bold custom-label ">
                      Transaction ID :
                    </p>
                    <p className="m-0 custom-label ">
                      {selectedPayment?.transaction_id}
                    </p>
                  </div>
                  <div className="col-md-9">
                    <p className="m-0 fw-bold custom-label">Remark :</p>
                    <p className="m-0 custom-label ">
                      {selectedPayment?.remark}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 ">
                <p className="m-0 fw-bold custom-label mt-2 mb-1">
                  Transaction Screenshot :
                </p>
                <img
                  src={`${base_url}/${selectedPayment?.transaction_path}`}
                  alt=""
                  style={{ width: "100px" }}
                />
                <div className="text-end"></div>
              </div>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
