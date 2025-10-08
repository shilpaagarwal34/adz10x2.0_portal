import { useFormikContext, Field, ErrorMessage } from "formik";
import { Form, Row, Col, Image, Card } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import PreviewImageModal from "./WhatsappGrpImagePreviewModal.jsx";
import { useState } from "react";
import { base_url } from "../../../../config/api.js";
import { Avatar } from "@mui/material";
import { useAdsModal } from "../../../../Context/AdsModalContext.jsx";

const SocietyFormData = () => {
  const { values, setFieldValue } = useFormikContext();

  const initialSocietyPhoto = `${base_url}/${values.society_profile_img_path}`;
  const intialWhatasppImage = `${base_url}/${values.society_whatsapp_img_path}`;

  const { openSampleModal } = useAdsModal();

  const [showModal, setShowModal] = useState(false);
  const [societyProfilePath, setSocietyProfilePath] = useState(
    initialSocietyPhoto || null
  );
  const [whatappgrpImage, setWhatappgrpImage] = useState(
    intialWhatasppImage || null
  );

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles) => {
      setFieldValue("society_whatsapp_img_path", acceptedFiles[0]);
      setWhatappgrpImage(URL.createObjectURL(acceptedFiles[0]));
    },
  });

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
            <Col md={6} className="mb-2">
              <Form.Group>
                <Form.Label className="fw-bold custom-label">
                  WhatsApp Group Name <span className="text-danger">*</span>
                </Form.Label>
                <Field
                  as={Form.Control}
                  className="form-control-sm"
                  name="whatsapp_group_name"
                  value={values.whatsapp_group_name}
                  type="text"
                  placeholder="Enter Name"
                />
                <ErrorMessage
                  name="whatsapp_group_name"
                  component="div"
                  className="text-danger formik-error"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-2">
              <Form.Group>
                <Form.Label className="fw-bold custom-label">
                  Number of Members <span className="text-danger">*</span>
                </Form.Label>
                <Field
                  as={Form.Control}
                  className="form-control-sm"
                  name="number_of_members"
                  value={values.number_of_members}
                  type="number"
                  placeholder="Enter Number of Members"
                />
                <ErrorMessage
                  name="number_of_members"
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
        <Col md={4} className="mb-2">
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              WhatsApp Group Image <span className="text-danger">*</span>
            </Form.Label>
            <Card
              {...getRootProps()}
              className="p-1 text-center border-dashed border-2 rounded col-12 mb-1"
              style={{
                fontSize: "12px",
                position: "relative",
                padding: "4px",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} style={{ display: "none" }} />

              <div className="inner-border d-flex flex-column align-items-center w-100 py-2 px-1">
                {values.society_whatsapp_img_path ? (
                  <>
                    <img
                      src={whatappgrpImage}
                      alt="Upload"
                      width="100%"
                      height="100px"
                      style={{ objectFit: "contain", objectPosition: "top" }}
                    />
                  </>
                ) : (
                  <div>
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
              </div>
            </Card>
            <ErrorMessage
              name="society_whatsapp_img_path"
              component="div"
              className="text-danger formik-error"
            />
            <div className="d-flex align-items-center mb-2 gap-2">
              <img
                src="/info1.svg"
                alt="Sample"
                style={{ cursor: "pointer" }} // Adjust width as needed
                onClick={() =>
                  openSampleModal("/sample_images/society_group.png")
                }
              />

              <h6 className="fw-bold mt-2 custom-label">Sample Image</h6>
            </div>
          </Form.Group>
        </Col>
        <Col md={8} className="mb-2">
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
      <PreviewImageModal
        show={showModal}
        handleClose={handleClose}
        img={"/modalimg.svg"}
      />
    </>
  );
};

export default SocietyFormData;
