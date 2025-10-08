import React, { useState } from "react";
import { Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { Grid } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { submitWithdrawRequest } from "../../../store/Actions/Society/Payments/PaymentActions";
import { toast } from "react-toastify";

export default function WithDrawlModal({ show, walletAmount, setShow }) {
  const dispatch = useDispatch();

  const [applyGST, setApplyGST] = useState(false);
  const [amount, setAmount] = useState(walletAmount || 0);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [description, setDescription] = useState("");
  // const [files, setFiles] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "application/pdf": [],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFilePreview({
          file,
          preview: URL.createObjectURL(file),
        });
      }
    },
  });

  const resetForm = () => {
    setApplyGST(false);
    setAmount("");
    setInvoiceNumber("");
    setDescription("");
    // setFiles(null);
  };

  const handleClose = () => {
    setShow(false);
    setFilePreview(null);
    setDescription("");
    setAmount(walletAmount);
    setInvoiceNumber("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !invoiceNumber || !description || !filePreview?.file) {
      toast.error("Please fill all required fields and upload a file.");
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount must be a number greater than 0.");
      return;
    }

    if (Number(amount) > walletAmount) {
      toast.error("Please enter a valid amount within your wallet balance.");
      return;
    }

    const formData = new FormData();
    formData.append("withdraw_amount", amount);
    formData.append("invoice_id", invoiceNumber);
    formData.append("description", description);
    formData.append("with_gst", applyGST ? 1 : 0);
    // formData.append("upload_report_path", files);
    formData.append("upload_report_path", filePreview?.file);

    setIsSubmitting(true);
    try {
      await dispatch(submitWithdrawRequest(formData)).unwrap();
      toast.success("Withdrawal request submitted successfully");
      handleClose();
      resetForm();
    } catch (err) {
      toast.error(err?.message || "Failed to submit request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      className="mx-1"
      dialogClassName="custom-modal"
      style={{ zIndex: "99999999999999" }}
    >
      <Modal.Header closeButton className="py-3 ps-4">
        <Modal.Title className="fs-5 fw-bold">Add Withdrawl</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-3 px-4">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Grid>
              <Form.Check
                type="checkbox"
                label="Apply GST"
                checked={applyGST}
                onChange={(e) => setApplyGST(e.target.checked)}
                className="d-flex align-items-center custom-label custom-checkbox mb-1 fw-medium"
              />
            </Grid>
            <Col md={6}>
              <Form.Label className="custom-label fw-bold">
                Withdrawal Amount <span className="text-danger">*</span>
              </Form.Label>
              {/* <Form.Control
                type="text"
                className="form-control-sm"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              /> */}

              <Form.Control
                type="number"
                className="form-control-sm"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
              />
            </Col>
            <Col md={6}>
              <Form.Label className="custom-label fw-bold">
                Invoice Number <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                className="form-control-sm"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </Col>
          </Row>

          <Form.Group className="mb-3 custom-label fw-bold">
            <Form.Label>
              Descriptions <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <p className="mb-1 custom-label fw-bold">
            {/* Upload Report Screenshots <span className="text-danger">*</span> */}
            Upload Invoice <span className="text-danger">*</span>
          </p>
          <Card
            {...getRootProps()}
            className="py-2 text-center border-dashed border-2 rounded col-12 col-sm-8 col-md-6 mb-1"
            style={{
              fontSize: "12px",
              position: "relative",
              padding: "10px",
            }}
          >
            <input {...getInputProps()} />
            <div className="inner-border d-flex flex-column align-items-center w-100 p-3">
              {!filePreview && (
                <>
                  <img src="/imgicon.svg" alt="Upload" width={40} height={40} />
                  <p className="mt-2 mb-1 fw-bold">
                    Drag your images here or Browse
                  </p>
                  <small className="text-muted">Support PDF / Image</small>
                </>
              )}

              {filePreview && (
                <div className="mt-3">
                  {filePreview.file.type.includes("image") ? (
                    <img
                      src={filePreview.preview}
                      alt="preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "150px",
                        objectFit: "contain",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        marginTop: "10px",
                      }}
                    />
                  ) : (
                    <p className="text-muted mt-2">{filePreview.file.name}</p>
                  )}
                </div>
              )}
            </div>
          </Card>

          <Button
            type="submit"
            style={{
              backgroundColor: isSubmitting
                ? "rgba(183, 183, 183, 1)"
                : "#019F88",
              color: "white",
              padding: "4px 8px",
              border: "none",
              borderRadius: "25px",
              margin: "20px 0 10px",
              cursor: "pointer",
              width: "150px",
              fontSize: "14px",
              display: "inline-block",
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
