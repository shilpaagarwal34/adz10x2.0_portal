import { Form, Col } from "react-bootstrap";
import { Field, useFormikContext } from "formik";
import PreviewImageModal from "./WhatsappGrpImagePreviewModal";
import { useState } from "react";
const GoogleMapUrlField = () => {
  const { values } = useFormikContext();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Col md={12} className="my-3">
      <Form.Group>
        <Form.Label className="fw-bold custom-label d-flex align-items-center">
          Google Page URL 
          <img
            src="/info1.svg"
            alt="Sample"
            style={{
              cursor: "pointer",
              width: "15px",
              height: "15px",
              marginLeft: "10px",
            }} // Adjust width as needed
            onClick={handleShow}
          />
        </Form.Label>
        <Field
          as={Form.Control}
          className="form-control-sm"
          name="google_page_url"
          value={values.google_page_url}
          type="text"
          placeholder="Enter URL"
        />
      </Form.Group>
      <PreviewImageModal
        show={showModal}
        handleClose={handleClose}
        img="/google_business_sample.jpg"
      />
    </Col>
  );
};

export default GoogleMapUrlField;
