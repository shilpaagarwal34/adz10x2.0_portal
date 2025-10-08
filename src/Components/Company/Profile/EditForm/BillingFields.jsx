import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { ErrorMessage, Field, useFormikContext } from "formik";

export default function BillingFields() {
  const [isPartyNameChecked, setIsPartyNameChecked] = useState(false);
  const [isBillingCheck, setIsBillingCheck] = useState(false);
  const { setFieldValue, values } = useFormikContext();

  const handleBillingCheck = (e) => {
    const isChecked = e.target.checked;
    setIsBillingCheck(isChecked);

    if (isChecked) {
      // Copy address fields to billing fields
      setFieldValue("billing_address_line_1", values.address_line_1 || "");
      setFieldValue("billing_address_line_2", values.address_line_2 || "");
    } else {
      // Optionally clear billing fields
      setFieldValue("billing_address_line_1", "");
      setFieldValue("billing_address_line_2", "");
    }
  };

  const handlePartyCheck = (e) => {
    const isChecked = e.target.checked;
    setIsPartyNameChecked(isChecked);

    if (isChecked) {
      // Copy address fields to billing fields
      setFieldValue("party_name", values.company_name || "");
    } else {
      // Optionally clear billing fields
      setFieldValue("party_name", "");
    }
  };

  return (
    <div>
      <h5 className="fw-bold">Billing Details</h5>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              Billing Company Name <span className="text-danger">*</span>
            </Form.Label>
            <Field
              as={Form.Control}
              name="party_name"
              className="form-control-sm"
              type="text"
              placeholder="Enter Name"
            />
            <ErrorMessage
              name="party_name"
              component="div"
              className="text-danger formik-error"
            />
            <div className="form-check mt-2">
              <input
                type="checkbox"
                id="partyName"
                name="partyName"
                className="form-check-input"
                checked={isPartyNameChecked}
                onChange={handlePartyCheck}
              />
              <label htmlFor="partyName" className="form-check-label">
                Same as Company Name
              </label>
            </div>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              GST Number <span className="text-danger">*</span>
            </Form.Label>
            <Field
              as={Form.Control}
              name="gst_number"
              className="form-control-sm"
              type="text"
              placeholder="Enter GST Number"
            />
            <ErrorMessage
              name="gst_number"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col>
        {/* <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              Account No. <span className="text-danger">*</span>
            </Form.Label>
            <Field
              as={Form.Control}
              name="account_no"
              className="form-control-sm"
              type="number"
              placeholder="Enter Account No."
            />
             <ErrorMessage
              name="account_no"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col> */}
      </Row>

      <Row className="mb-3">
        {/* <Col md={4} className="mb-2">
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              Branch Name <span className="text-danger">*</span>
            </Form.Label>
            <Field
              as={Form.Control}
              name="branch_name"
              className="form-control-sm"
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
              Bank IFSC Code <span className="text-danger">*</span>
            </Form.Label>
            <Field
              as={Form.Control}
              name="bank_ifsc_code"
              className="form-control-sm"
              type="text"
              placeholder="Enter IFSC Code"
            />
             <ErrorMessage
              name="bank_ifsc_code"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col> */}
        <Col md={12} className="mb-2">
          <Form.Group>
           
            <Form.Label className="fw-bold custom-label">
              Billing Address Line 1 <span className="text-danger">*</span>
            </Form.Label>
            <Field
              as={Form.Control}
              name="billing_address_line_1"
              className="form-control-sm"
              type="text"
              placeholder="Enter Address "
            />
            <ErrorMessage
              name="billing_address_line_1"
              component="div"
              className="text-danger formik-error"
            />
             <div className="form-check mt-2">
              <input
                type="checkbox"
                id="address"
                name="address"
                className="form-check-input"
                checked={isBillingCheck}
                onChange={handleBillingCheck}
              />
              <label htmlFor="address" className="form-check-label">
                Same as Address
              </label>
            </div>
          </Form.Group>
        </Col>
        <Col md={12} className="mb-2">
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              Billing Address Line 2
            </Form.Label>
            <Field
              as={Form.Control}
              name="billing_address_line_2"
              className="form-control-sm"
              type="text"
              placeholder="Enter Address  "
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}
