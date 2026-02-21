import { useFormikContext, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { base_url } from "../../../../config/api.js";

const BillingFieldsData = () => {
  const { values, setFieldValue } = useFormikContext();
  const [checked, setIsChecked] = useState(false);

  const handleInputCheck = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    if (isChecked) {
      setFieldValue("billing_address_line_1", values.address_line_1 || "");
      setFieldValue("billing_address_line_2", values.address_line_2 || "");
    } else {
      // Optionally clear billing fields
      setFieldValue("billing_address_line_1", "");
      setFieldValue("billing_address_line_2", "");
    }
  };

  return (
    <>
      {/* Billing Details */}
      <h5 className="fw-bold">Billing Details</h5>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              Account Holder Name
            </Form.Label>
            <Field
              as={Form.Control}
              className="form-control-sm"
              name="account_holder_name"
              value={values.account_holder_name}
              type="text"
              placeholder="Enter Name"
            />
            <ErrorMessage
              name="account_holder_name"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              Bank Name
            </Form.Label>
            <Field
              as={Form.Control}
              className="form-control-sm"
              name="bank_name"
              value={values.bank_name}
              type="text"
              placeholder="Enter Bank Name"
            />
            <ErrorMessage
              name="bank_name"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              Account No.
            </Form.Label>
            <Field
              as={Form.Control}
              className="form-control-sm"
              name="account_no"
              value={values.account_no}
              type="number"
              placeholder="Enter Account No."
            />
            <ErrorMessage
              name="account_no"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={4} className="mb-2">
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              Branch Name
            </Form.Label>
            <Field
              as={Form.Control}
              className="form-control-sm"
              name="branch_name"
              value={values.branch_name}
              type="text"
              placeholder="Enter Branch Name"
            />
            <ErrorMessage
              name="branch_name"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col>
        <Col md={4} className="mb-2">
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              Bank IFSC Code
            </Form.Label>
            <Field
              as={Form.Control}
              className="form-control-sm"
              name="bank_ifsc_code"
              value={values.bank_ifsc_code}
              type="text"
              placeholder="Enter IFSC Code"
            />
            <ErrorMessage
              name="bank_ifsc_code"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col>
        <Col md={12}>
          <div className="form-check mt-3">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              className="form-check-input"
              checked={checked}
              onChange={handleInputCheck}
            />
            <label htmlFor="acceptTerms" className="form-check-label">
              Same as Address
            </label>
          </div>
        </Col>

        <Col md={12} className="mb-2">
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              Billing Address Line 1
            </Form.Label>
            <Field
              as={Form.Control}
              className="form-control-sm"
              name="billing_address_line_1"
              // value={values.billing_address_line_1}
              type="text"
              placeholder="Enter Address "
            />
            <ErrorMessage
              name="billing_address_line_1"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col>
        <Col md={12} className="mb-2">
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              Billing Address Line 2
            </Form.Label>
            <Field
              as={Form.Control}
              className="form-control-sm"
              name="billing_address_line_2"
              // value={values.billing_address_line_2}
              type="text"
              placeholder="Enter Address"
            />
          </Form.Group>
        </Col>
        <Col md={12} className="mb-2">
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              Billing QR Code (Optional)
            </Form.Label>
            <Form.Control
              className="form-control-sm"
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setFieldValue("billing_qr_code_path", file || "");
              }}
            />
            {typeof values.billing_qr_code_path === "string" &&
              values.billing_qr_code_path && (
                <a
                  href={`${base_url}/${values.billing_qr_code_path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="d-inline-block mt-1"
                >
                  View current QR code
                </a>
              )}
            {values.billing_qr_code_path instanceof File && (
              <p className="mb-0 mt-1 text-muted">
                Selected: {values.billing_qr_code_path.name}
              </p>
            )}
            <ErrorMessage
              name="billing_qr_code_path"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default BillingFieldsData;
