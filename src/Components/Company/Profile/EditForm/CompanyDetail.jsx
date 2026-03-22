import React, { useState, useEffect } from "react";
import { Form, Row, Col, Image } from "react-bootstrap";
import { Field, useFormikContext, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchSectors } from "../../../../store/Actions/Common/commonActions.js";
import { base_url } from "../../../../config/api.js";
import { Avatar } from "@mui/material";

export default function CompanyDetail({ profileData }) {
  const { values, setFieldValue } = useFormikContext();

  const initialCompanyPhoto = `${base_url}/${profileData?.company_profile_photo_path}`;
  const [companyProfilePath, setCompanyProfilePath] = useState(
    initialCompanyPhoto || null
  );
  const dispatch = useDispatch();

  const handleCompanyImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyProfilePath(URL.createObjectURL(file));
      setFieldValue("company_profile_photo_path", file);
    }
  };

  const { sectors } = useSelector((state) => state.common);

  useEffect(() => {
    dispatch(fetchSectors());
  }, [dispatch]);

  return (
    <div>
      <h5 className="mb-3 fw-bold">Company Details</h5>
      <Row className="mb-3 d-flex align-items-center">
        <Col md={8}>
          <Row>
            <Col md={6} className="mb-2">
              <Form.Group controlId="company_name">
                <Form.Label className="fw-bold custom-label">
                  Company Name  <span className="text-danger">*</span>
                </Form.Label>
                <Field
                  as={Form.Control}
                  className="form-control-sm"
                  name="company_name"
                  type="text"
                  placeholder="Enter Company Name Name"
                />
                <ErrorMessage
                  name="company_name"
                  component="div"
                  className="text-danger formik-error"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-2">
              <Form.Group controlId="company_brand_name">
                <Form.Label className="fw-bold custom-label">
                  Brand Name <span className="text-danger">*</span>
                </Form.Label>
                <Field
                  as={Form.Control}
                  name="company_brand_name"
                  className="form-control-sm"
                  type="text"
                  placeholder="Enter Brand Name"
                />
                <ErrorMessage
                  name="company_brand_name"
                  component="div"
                  className="text-danger formik-error"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-2">
              <Form.Group controlId="sector">
                <Form.Label className="fw-bold custom-label">Sector <span className="text-danger">*</span></Form.Label>
                <Field
                  as={Form.Select}
                  name="sector"
                  className="form-select-sm"
                >
                  <option value="">Select Sector</option>
                  {sectors?.length > 0 &&
                    sectors.map((sector) => (
                      <option key={sector.id} value={sector.id}>
                        {sector.sector_name}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  name="sector"
                  component="div"
                  className="text-danger formik-error"
                />
              </Form.Group>
            </Col>

            <Col md={6} className="mb-2">
              <Form.Group controlId="company_mobile_number">
                <Form.Label className="fw-bold custom-label">
                  Mobile No. <span className="text-danger">*</span>
                </Form.Label>
                <Field
                  as={Form.Control}
                  name="company_mobile_number"
                  className="form-control-sm"
                  type="number"
                  placeholder="Enter Mobile Number "
                />
                <ErrorMessage
                  name="company_mobile_number"
                  component="div"
                  className="text-danger formik-error"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-2">
              <Form.Group controlId="company_email_id">
                <Form.Label className="fw-bold custom-label">
                  Email id <span className="text-danger">*</span>
                </Form.Label>
                <Field
                  as={Form.Control}
                  name="company_email_id"
                  className="form-control-sm"
                  type="email"
                  placeholder="Enter Email id"
                />
                <ErrorMessage
                  name="company_email_id"
                  component="div"
                  className="text-danger formik-error"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-2">
              <Form.Group controlId="website">
                <Form.Label className="fw-bold custom-label">
                  Website
                </Form.Label>
                <Field
                  as={Form.Control}
                  name="website"
                  className="form-control-sm"
                  type="text"
                  placeholder="Enter Website URL"
                />
                <ErrorMessage
                  name="website"
                  component="div"
                  className="text-danger formik-error"
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>

        <Col md={4} className="text-md-center ">
          <div className="d-flex flex-column align-items-start align-items-md-center mb-3">
            <input
              type="file"
              accept="image/*"
              className="d-none"
              id="profile-upload"
              onChange={handleCompanyImage}
            />
            <label
              htmlFor="profile-upload"
              className="cursor-pointer"
              style={{ cursor: "pointer" }}
            >
              {companyProfilePath ? (
                <Avatar
                  className="me-3"
                  alt="Company Profile"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  src={companyProfilePath}
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
          </div>
          <Form.Label className="custom-label" style={{ cursor: "pointer" }}>
            Upload Company Profile Photo
          </Form.Label>
        </Col>
      </Row>
    </div>
  );
}
