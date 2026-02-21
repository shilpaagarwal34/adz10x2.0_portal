import { useFormikContext, Field, ErrorMessage } from "formik";
import { Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { base_url } from "../../../../config/api.js";
import { Avatar } from "@mui/material";

const SocietyFormData = () => {
  const { values, setFieldValue } = useFormikContext();

  const initialSocietyPhoto = `${base_url}/${values.society_profile_img_path}`;
  const [societyProfilePath, setSocietyProfilePath] = useState(
    initialSocietyPhoto || null
  );

  const handleSocietyImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSocietyProfilePath(URL.createObjectURL(file)); // Store preview URL for UI
      setFieldValue("society_profile_img_path", file); // Store file object in Formik (not just the name)
    }
  };

  return (
    <>
      <h5 className="mb-3 fw-bold">Society Details</h5>
      <Row className="mb-3 d-flex align-items-center">
        <Col md={8}>
          <Row>
            <Col md={12} className="mb-2">
              <Form.Group controlId="society_name">
                <Form.Label className="fw-bold custom-label">
                  Society Name <span className="text-danger">*</span>
                </Form.Label>
                <Field
                  as={Form.Control}
                  className="form-control-sm"
                  name="society_name"
                  type="text"
                  placeholder="Enter Society Name"
                  value={values.society_name}
                />
                <ErrorMessage
                  name="society_name"
                  component="div"
                  className="text-danger formik-error"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-2">
              <Form.Group>
                <Form.Label className="fw-bold custom-label">
                  Number of Flats <span className="text-danger">*</span>
                </Form.Label>
                <Field
                  as={Form.Control}
                  className="form-control-sm"
                  name="number_of_flat"
                  value={values.number_of_flat}
                  type="number"
                  placeholder="Enter Number of Flats"
                />
                <ErrorMessage
                  name="number_of_flat"
                  component="div"
                  className="text-danger formik-error"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-2">
              <Form.Group controlId="society_email">
                <Form.Label className="fw-bold custom-label">
                  Society Email id <span className="text-danger">*</span>
                </Form.Label>
                <Field
                  as={Form.Control}
                  className="form-control-sm"
                  name="society_email"
                  value={values.society_email}
                  type="email"
                  placeholder="Enter Email id"
                />
                <ErrorMessage
                  name="society_email"
                  component="div"
                  className="text-danger formik-error"
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>

        <Col md={4} className="text-md-center">
          <Form.Group controlId="society_profile_img_path">
            <div className="d-flex flex-column align-items-start align-items-md-center mb-3">
              {/* File Input (Uncontrolled) */}
              <input
                type="file"
                accept="image/*"
                id="society_profile_img_path"
                className="d-none"
                onChange={handleSocietyImage} // Handle file selection
              />

              {/* Image Preview */}
              <label
                htmlFor="society_profile_img_path"
                className="cursor-pointer"
                style={{ cursor: "pointer" }}
              >
                {societyProfilePath ? (
                  <Avatar
                    className="me-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                    src={societyProfilePath}
                  />
                ) : (
                  <div
                    className="border rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 80, height: 80, background: "#f8f9fa" }}
                  >
                    <span>+</span>
                  </div>
                )}
              </label>
              <ErrorMessage
                name="society_profile_img_path"
                component="div"
                className="text-danger formik-error"
              />
            </div>

            <Form.Label className="custom-label" style={{ cursor: "pointer" }}>
              Upload Society Profile Photo{" "}
              <span className="text-danger">*</span>
            </Form.Label>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={12} className="mb-2">
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              Address Line 1 <span className="text-danger">*</span>
            </Form.Label>
            <Field
              as={Form.Control}
              className="form-control-sm mb-1"
              type="text"
              name="address_line_1"
              value={values.address_line_1}
              placeholder="Enter Address "
            />
            <ErrorMessage
              name="address_line_1"
              component="div"
              className="text-danger formik-error"
            />
            <Form.Label className="fw-bold custom-label mt-2">
              Address Line 2
            </Form.Label>
            <Field
              as={Form.Control}
              className="form-control-sm"
              name="address_line_2"
              type="text"
              value={values.address_line_2}
              placeholder="Enter Address  "
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default SocietyFormData;
