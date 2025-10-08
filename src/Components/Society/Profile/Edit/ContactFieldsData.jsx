import { useFormikContext, Field, ErrorMessage } from "formik";
import { Form, Row, Col } from "react-bootstrap";
import {
  checkIfEmailExists,
  checkIfMobileExists,
} from "../../../../store/Actions/Common/commonActions.js";
import { useDispatch, useSelector } from "react-redux";

const ContactFieldsData = () => {
  const { values } = useFormikContext();

  const { customError } = useSelector((state) => state.common);

  const dispatch = useDispatch();

  const handleMobileBlur = (e) => {
    const mobile_number = e.target.value;
    if (!mobile_number) return;
    dispatch(checkIfMobileExists(mobile_number));
  };

  const handleEmailBlur = (e) => {
    const email = e.target.value;
    if (!email) return;
    dispatch(checkIfEmailExists(email));
  };

  return (
    <>
      <h5 className=" fw-bold">Contact Information</h5>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group controlId="name">
            <Form.Label className="fw-bold custom-label">Name <span className="text-danger">*</span></Form.Label>
            <Field
              as={Form.Control}
              className="form-control-sm"
              name="name"
              value={values.name}
              type="text"
              placeholder="Enter Name"
            />
            <ErrorMessage name="name" component="div" className="text-danger formik-error" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="mobile_number">
            <Form.Label className="fw-bold custom-label">Mobile No. <span className="text-danger">*</span></Form.Label>
            <Field
              as={Form.Control}
              className="form-control-sm"
              name="mobile_number"
              value={values.mobile_number}
              type="text"
              placeholder="Enter Mobile Number"
              disabled
            />

            <ErrorMessage
              name="mobile_number"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="email">
            <Form.Label className="fw-bold custom-label">Email ID <span className="text-danger">*</span></Form.Label>
            <Field
              as={Form.Control}
              className="form-control-sm"
              name="email"
              value={values.email}
              type="email"
              placeholder="Enter Email ID"
              disabled
            />

            <ErrorMessage
              name="email"
              component="div"
              className="text-danger formik-error"
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default ContactFieldsData;
